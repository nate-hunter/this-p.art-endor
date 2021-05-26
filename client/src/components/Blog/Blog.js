import React, { useContext } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import  './Blog.css';

import Context from '../../context';
import NoPostContent from '../Posts/NoPostContent';
import CreatePost from '../Posts/CreatePost';
import PostContent from '../Posts/PostContent';


const Blog = ({ classes }) => {
  // const mobileSize = useMediaQuery('(max-width: 650px)');
  const { state } = useContext(Context);
  const { draft, currentPost } = state;

  let BlogContent;

  if (!draft && !currentPost) {
    BlogContent = NoPostContent;
  } else if (draft && !currentPost) {
    BlogContent = CreatePost;
  } else if (!draft && currentPost) {
    console.log('Post content');
    BlogContent = PostContent; 
  }

  return (
    // <Paper className={mobileSize ? classes.rootMobile : classes.root}>
    // <div className="blog-area">
    <Paper className={classes.root}>
      <BlogContent />
    </Paper>
  );
};

const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    // backgroundColor: "lightgrey",
    backgroundColor: "#008E7C",
    justifyContent: "center"
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
};

export default withStyles(styles)(Blog);
