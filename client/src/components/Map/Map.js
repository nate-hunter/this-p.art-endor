import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
// import differenceInMinutes from 'date-fns/difference_in_minutes';

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import PinIcon from './PinIcon';
import Context from '../../context';
// import Blog from './Blog';
// import { useClient } from '../client';
// import { GET_PINS_QUERY } from '../graphql/queries';
// import { DELETE_PIN_MUTATION } from '../graphql/mutations';
// import { Subscription } from "react-apollo";
// import { 
//   PIN_ADDED_SUBSCRIPTION, 
//   PIN_UPDATED_SUBSCRIPTION, 
//   PIN_DELETED_SUBSCRIPTION } from '../graphql/subscriptions';


const API_TOKEN = ""; 

const INITIAL_VIEWPORT = {  
    // NYC:
    latitude: 40.730824,
    longitude: -73.997330,
    zoom: 12
}

// const INITIAL_VIEWPORT = {
//   latitude: 21.315603,
//   longitude: -157.858093,
//   zoom: 15
// }

const Map = ({ classes }) => {
    // const client = useClient();
    // const mobileSize = useMediaQuery('(max-width: 650px)');
    const { state, dispatch} = useContext(Context);

    
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    const [userPosition, setUserPosition] = useState(null);
    
    useEffect(() => {
        getUserPosition()
    }, []);

    const getUserPosition = () => {
    // console.log('navigator:', navigator)  
      if ("geolocation" in navigator) {  // Take a look at this 'navigator' - it's pretty interesting;
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          setViewport({ ...viewport, latitude, longitude });
          setUserPosition({ latitude, longitude });
        });
      }
    }

      const handleMapClick = ({ lngLat, leftButton }) => {  // LngLat + LeftButton from 'event'
        if (!leftButton) return;
        if (!state.draft) {
          dispatch({ type: "CREATE_DRAFT" })
        }
        const [longitude, latitude] = lngLat;
        dispatch({
          type: "UPDATE_DRAFT_LOCATION",
          payload: { longitude, latitude }
        });
      }


    return (
        <div className={classes.root}>
            <ReactMapGL
                width="100vw"
                height="calc(100vh - 64px)"  
                mapStyle="mapbox://styles/mapbox/light-v10"
                mapboxApiAccessToken={API_TOKEN}
                onViewportChange={newViewport => setViewport(newViewport)}
                onClick={handleMapClick}
                // scrollZoom={!mobileSize}
                {...viewport}
            >
                {/* Zoom Map */}
                <div className={classes.navigationControl}>
                    <NavigationControl
                        onViewportChange={newViewport => setViewport(newViewport)}
                    />
                </div>

                {/* User Pin */}
                {userPosition && (
                    <Marker
                        latitude={userPosition.latitude}
                        longitude={userPosition.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <PinIcon size={50} color="#008E7C" />
                    </Marker>
                )}

                {/* Draft Pin  */}
                {state.draft && (
                  <Marker
                    latitude={state.draft.latitude}
                    longitude={state.draft.longitude}
                    offsetLeft={-19}
                    offsetTop={-37}
                  >
                    <PinIcon size={50} color="grey" />
                  </Marker>

                )}
            </ReactMapGL>
        </div>
    );
}

const styles = {
    root: {
      display: "flex"
    },
    rootMobile: {
      display: "flex",
      flexDirection: "column-reverse"
    },
    navigationControl: {
      position: "absolute",
      top: 0,
      left: 0,
      margin: "1em"
    },
    deleteIcon: {
      color: "red"
    },
    popupImage: {
      padding: "0.4em",
      height: 200,
      width: 200,
      objectFit: "cover"
    },
    popupTab: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }
  };

// export default Map;
export default withStyles(styles)(Map);

