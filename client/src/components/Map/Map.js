import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import differenceInMinutes from 'date-fns/difference_in_minutes';

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Baloon from './BaloonIcon';
import Context from '../../context';
import Blog from '../Blog/Blog';
import { useClient } from '../../client';
import { GET_POSTS_QUERY } from '../../graphql/queries';
import { DELETE_POST_MUTATION } from '../../graphql/mutations';

import { Subscription } from "react-apollo";
import { POST_CREATED_SUBSCRIPTION, POST_UPDATED_SUBSCRIPTION, POST_DELETED_SUBSCRIPTION } from '../../graphql/subscriptions';


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
  // const mobileSize = useMediaQuery('(max-width: 650px)');
  const client = useClient();
  const { state, dispatch} = useContext(Context);

  useEffect(() => {
    getPosts();
  }, []);

  const [popup, setPopup] = useState(null);

  // Remove popup for all when pin deleted by user:
  useEffect(() => {
    // const postExists = popup && state.posts.findIndex(post => post._id === popup._id) > -1
    console.log('post exists')
    
    const postExists = popup && state.posts.findIndex(post => console.log('popup post? -', post))
    console.log('popup:', postExists)
    if (!postExists) {
      setPopup(null);
    }
  }, [state.posts.length])

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
  
  const getPosts = async () => {
    console.log('endor')
    const { getPosts } = await client.request(GET_POSTS_QUERY)
    console.log('ewok', getPosts)
    dispatch({ type: "GET_POSTS", payload: getPosts });
    console.log('wahu')
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

  const highlightNewPost = post => {
    const isNewPost = differenceInMinutes(Date.now(), Number(post.createdAt)) <= 10
    return isNewPost ? "#192734" : "violet";
  }

  const handleSelectPost = post => {
    setPopup(post);
    dispatch({ type: "SET_POST", payload: post });
  }

  const isAuthUser = () => state.currentUser._id === popup.poster._id

  const handleDeletePost = async post => {
    const variables = { postId: post._id };
    await client.request(DELETE_POST_MUTATION, variables);

    // The below is not need w/subscriptions:
    // const { deletePost } = await client.request(DELETE_POST_MUTATION, variables);
    // dispatch({ type: "DELETE_POST", payload: deletePost })

    setPopup(null);
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

              {/* User Baloon */}
              {userPosition && (
                  <Marker
                      latitude={userPosition.latitude}
                      longitude={userPosition.longitude}
                      offsetLeft={-19}
                      offsetTop={-37}
                  >
                      <Baloon size={50} color="#008E7C" />
                  </Marker>
              )}

              {/* Draft Baloon  */}
              {state.draft && (
                <Marker
                  latitude={state.draft.latitude}
                  longitude={state.draft.longitude}
                  offsetLeft={-19}
                  offsetTop={-37}
                >
                  <Baloon size={50} color="grey" />
                </Marker>

              )}

              {/* Previously added Posts  */}
              {state.posts.map(post => (
                <Marker
                  key={post._id}
                  latitude={post.lat}
                  longitude={post.lon}
                  offsetLeft={-19}
                  offsetTop={-37}
                >
                  <Baloon
                    onClick={() => handleSelectPost(post)} 
                    size={50} 
                    color={highlightNewPost(post)} 
                  />
                </Marker>
              ))}

              {/* Popup  */}
              {popup && (
                <Popup
                  anchor="top"
                  latitude={popup.lat}
                  longitude={popup.lon}
                  closeOnClick={false}
                  onClose={() => setPopup(null)}
                >
                  <img 
                    className={classes.popupImage}
                    src={popup.img}
                    alt={popup.title}
                  />
                  <div className={classes.popupTab}>
                    <Typography>
                      {/* {popup.title} */}
                      {popup.lat.toFixed(6)}, {popup.lon.toFixed(6)}
                    </Typography>
                    {isAuthUser() && (
                      <Button onClick={() => handleDeletePost(popup)}>
                        <DeleteIcon className={classes.deleteIcon} />
                      </Button>
                    )}
                  </div>
                </Popup>
              )}
          </ReactMapGL>

          {/* Subscriptions for CREATING / UPDATING / DELETING Posts */}
          <Subscription 
            subscription={POST_CREATED_SUBSCRIPTION}
            onSubscriptionData={({ subscriptionData }) => {
              console.log('subscription data:', subscriptionData);
              const { postCreated } = subscriptionData.data;
              console.log("Post created (subscription):", postCreated)
              dispatch({ type: "CREATE_POST", payload: postCreated })
            }}
          />

          <Subscription 
            subscription={POST_UPDATED_SUBSCRIPTION}
            onSubscriptionData={({ subscriptionData }) => {
              console.log('subscription data:', subscriptionData);
              const { postUpdated } = subscriptionData.data;
              console.log("Post updated (subscription):", postUpdated)
              dispatch({ type: "CREATE_COMMENT", payload: postUpdated }) 
            }}
          />

          <Subscription 
            subscription={POST_DELETED_SUBSCRIPTION}
            onSubscriptionData={({ subscriptionData }) => {
              const { postDeleted } = subscriptionData.data;
              console.log("Post deleted (subscription):", postDeleted)
              dispatch({ type: "DELETE_POST", payload: postDeleted })
            }}
          />          

          {/* Blog Area to add Post content + comments */}
          <Blog />
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

