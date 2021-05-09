import React from "react";
import { GoogleLogin } from 'react-google-login';

// import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

// const Login = ({ classes }) => {
//   return <div>Login</div>;
// };

// const styles = {
//   root: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "column",
//     alignItems: "center"
//   }
// };

// export default withStyles(styles)(Login);

const clientId = "";  // REMOVE BEFORE PUSHING TO GITHUB!!!!

const Login = () => {
    // const { dispatch } = useContext(Context);

    const onSuccess = async googleUser => {
        // console.log('google user', googleUser)

        try {
            const idToken = googleUser.getAuthResponse().id_token;
            console.log(idToken)
            // const client = new GraphQLClient(BASE_URL, {
            //     headers: { authorization: idToken }
            // });
            // const { me } = await client.request(ME_QUERY);
            // console.log(me)
            // dispatch({ type: "LOGIN_USER", payload: me });
            // dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });
        } catch (err) {
            onFailure(err);
        }
    }

    const onFailure = err => {
        console.error("Error logging in", err);
        // dispatch({ type: "IS_LOGGED_IN", payload: false });
    }

    return (
        <div>
            <GoogleLogin 
                clientId={clientId}
                onSuccess={onSuccess} 
                onFailure={onFailure} 
                isSignedIn={true}
                buttonText="Login with Google"
                theme="dark" 
            />
        </div>
    )
}

export default Login;
