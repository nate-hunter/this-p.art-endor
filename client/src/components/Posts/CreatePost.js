import React, { useState, useContext } from "react";
import axios from 'axios';

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Context from '../../context';
import { useClient } from '../../client';
import { CREATE_POST_MUTATION } from '../../graphql/mutations';



const CreatePost = ({ classes }) => {
    const mobileSize = useMediaQuery('(max-width: 650px)');
    
    const client = useClient();

    const { state, dispatch } = useContext(Context);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
  
    const handleImageUpload = async () => {
        const digitalOceanUrl = "https://endor-tree-storage.nyc3.digitaloceanspaces.com";
        const digiOcean = "nyc3.digitaloceanspaces.com";
        const cloudinaryUrl = "https://api.cloudinary.com/v1_1/pandaboogie/image/upload";

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "this-part");
        data.append("cloud_name", "pandaboogie");
        const resp = await axios.post(
            cloudinaryUrl, 
            data
        )
        console.log('resp:', resp)
        return resp.data.url;
    }
  
    const handleSubmit = async e => {
        try {
            e.preventDefault()
            setSubmitting(true);
  
            const url = await handleImageUpload();

            const { latitude, longitude } = state.draft;
            const variables = {
                title,
                img: url,
                content,
                lat: latitude,
                lon: longitude
            }
            await client.request(CREATE_POST_MUTATION, variables);

            // The below are not needed w/the implementation of subscriptions in the Map component.
            // const { createPost } = await client.request(CREATE_POST_MUTATION, variables);
            // dispatch({ type: "CREATE_POST", payload: createPost })

            handleDeleteDraft();
        } catch (err) {
            setSubmitting(false);
            console.error("Error creating a post", err)
        }
    }
  
    const handleDeleteDraft = () => {
      setTitle("");
      setImage("");
      setContent("");
      dispatch({ type: "DELETE_DRAFT" })
    }
  
    return (
      <form className={classes.form}>
        <Typography 
          className={classes.alignCenter}
          component="h2"
          variant="h4"
        //   color="secondary"
          style={{ color: "#C2FEF7" }}
        >
            Create a post
        </Typography>

        <div>
          <TextField
            name="title"
            label="Title"
            placeholder="Insert post title"
            onChange={e => setTitle(e.target.value)}
          />
          <input 
            accept="image/*"
            id="image"
            type="file"
            className={classes.input}
            onChange={e => setImage(e.target.files[0])}
          />
          <label htmlFor="image">
            <Button
              style={{ color: image && "#F99595" }}
              component="span"
              size="small"
              className={classes.button}
            >
              <AddAPhotoIcon />
            </Button>
          </label>
        </div>

        <div className={classes.contentField}>
          <TextField 
            name="content"
            label="Content"
            multiline
            rows={mobileSize ? "3" : "6"}
            rows={"6"}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <div> 
            {/* Discard Button */}
            <Button
                onClick={handleDeleteDraft}
                className={classes.button}
                variant="contained"
                // style={{ color: "#E0245E" }}
                color="primary"
            >
                <ClearIcon className={classes.leftIcon} />
                Discard
            </Button>

            {/* Submit Button */}
            <Button
                type="submit"
                className={classes.button}
                variant="contained"
                color="secondary"
                disabled={!title.trim() || !content.trim() || !image || submitting}
                onClick={handleSubmit}
            >
                Submit
                <SaveIcon className={classes.rightIcon} />
            </Button>
        </div>
      </form>
    );
  };
  
  const styles = theme => ({
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      paddingBottom: theme.spacing.unit
    },
    contentField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: "95%"
    },
    input: {
      display: "none"
    },
    alignCenter: {
      display: "flex",
      alignItems: "center"
    },
    iconLarge: {
      fontSize: 40,
      marginRight: theme.spacing.unit
    },
    leftIcon: {
      fontSize: 20,
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      fontSize: 20,
      marginLeft: theme.spacing.unit
    },
    button: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit,
      marginLeft: 0
    }
  });
  
  export default withStyles(styles)(CreatePost);