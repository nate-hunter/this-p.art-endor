import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import ExploreIcon from "@material-ui/icons/Explore";
import Typography from "@material-ui/core/Typography";


const NoPostContent = ({ classes }) => (
    <div className={classes.root}>
      {/* <ExploreIcon className={classes.icon} /> */}
      (Click icon here?)
      <Typography
        // noWrap
        component="h2"
        variant="h6"
        align="center"
        style={{color: "#C2FEF7"}}
        gutterBottom
      >
        Click on the map to post a piece of public art. 
      </Typography>
    </div>
  );
  
  const styles = theme => ({
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center"
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: "80px",
      color: "#C2FEF7"
    }
  });
  
  export default withStyles(styles)(NoPostContent);