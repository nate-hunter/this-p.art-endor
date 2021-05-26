import React, { useContext } from "react";
import format from 'date-fns/format';

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FaceIcon from "@material-ui/icons/Face";

import Context from '../../context';

import CreateComment from '../Comment/CreateComment';
import Comments from '../Comment/Comments';


const PostContent = ({ classes }) => {
  const { state } = useContext(Context);
  const { title, content, poster, createdAt, comments } = state.currentPost;

  return (
      <div className={classes.root}>
        <Typography
          component="h2"
          variant="h4"
          // color="primary"
          style={{ color: "#C2FEF7" }}
          gutterBottom
          >
          {title}
        </Typography>
        <Typography
          className={classes.text}
          component="h3" 
          variant="h6"
          // color="inherit"
          style={{ color: "#C2FEF7" }}
          gutterBottom
          >
          <FaceIcon className={classes.icon} /> {poster.username}
        </Typography>
        <Typography
          className={classes.text}
          variant="subtitle2"
          // color="inherit"
          style={{ color: "#C2FEF7" }}
          gutterBottom
          >
          <AccessTimeIcon className={classes.icon} />
          {format(Number(createdAt), "MMM Do, YYYY")}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ color: "white" }}
        >
          {content}
        </Typography>

        {/* Post comments: */}
        <CreateComment />
        <Comments comments={comments} />          
      </div>
  );
}

const styles = theme => ({
  root: {
    padding: "1em 0.5em",
    textAlign: "center",
    width: "100%"
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "violet"
  }
});

export default withStyles(styles)(PostContent);