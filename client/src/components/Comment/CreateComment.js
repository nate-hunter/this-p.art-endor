import React, { useState, useContext } from "react";
import { withStyles } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import Divider from "@material-ui/core/Divider";

import { CREATE_COMMENT_MUTATION } from '../../graphql/mutations';
import { useClient } from '../../client';
import Context from '../../context';


const CreateComment = ({ classes }) => {
  const client = useClient();
  const { state, dispatch } = useContext(Context);
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = async () => {
    const variables = { postId: state.currentPost._id, text: commentText };
    console.log('variables:', variables)

    await client.request(CREATE_COMMENT_MUTATION, variables);

    // The below is not needed after adding Subscriptions:
    // const { createComment } = await client.request(CREATE_COMMENT_MUTATION, variables);
    // dispatch({ type: "CREATE_COMMENT", payload: createComment});

    setCommentText("");
  }

  return (
    <>
      <form className={classes.form}>
        <IconButton 
          className={classes.clearButton}
          onClick={() => setCommentText("")}
          disabled={!commentText.trim()} 
        >
          <ClearIcon />
        </IconButton>

        <InputBase 
          className={classes.input} 
          placeholder="Add Comment..." 
          multiline={true} 
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
        {/* <input type="text" placeholder="Add a comment..." /> */}

        <IconButton 
          onClick={handleSubmitComment}
          className={classes.sendButton}
          disabled={!commentText.trim()} 
        >
          <SendIcon />
        </IconButton>
      </form>
      <Divider />
    </>
  );
};

const styles = theme => ({
  form: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  clearButton: {
    padding: 0,
    color: "red"
  },
  sendButton: {
    padding: 0,
    color: theme.palette.secondary.dark
  }
});

export default withStyles(styles)(CreateComment);
