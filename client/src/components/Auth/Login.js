import React, { useContext } from "react";
// import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';  // Allows to execute a query/mutation; Alternative to Apollo? 
// import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
// import { BASE_URL } from '../../client';

import './Login.css'


const Login = () => {
    const { dispatch } = useContext(Context);
    const [state, setState] = React.useState({
        email: '',
        password: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const idToken = 'test-id-token';
            const client = new GraphQLClient('http://localhost:4000/graphql', {
                headers: { authorization: idToken }
            });
            const { me } = await client.request(ME_QUERY);
            dispatch({ type: "LOGIN_USER", payload: me });
            dispatch({ type: "IS_LOGGED_IN", payload: !!me })
        } catch (error) {
            console.log("An error occured logging in:", error);
        }


        ////////////////////////////////////////////////////////////////////////////
        // console.log('id-token', "state", state, "client", client, "data:", data)
    }

    return (
        <div className="login">
            <h2>LOGIN PAGE...</h2>
            <form className="login-form">
                <p>
                    <input type="text" id="email" placeholder="email/Email..." value={state.email} onChange={(e) => setState({ ...state, email: e.target.value})} />
                </p>
                <p>
                    <input type="password" id="password" placeholder="Pwd..." value={state.password} onChange={(e) => setState({ ...state, password: e.target.value })} />
                </p>

                <button type="submit" onClick={onSubmit}>Login</button>
            </form>
        </div>
    );
}


// --------GEO-PINS SECTION--------

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


// --------THIS-PART SECTION--------

// const clientId = "";  // REMOVE BEFORE PUSHING TO GITHUB!!!!

// const Login = () => {
//     // const { dispatch } = useContext(Context);

//     const onSuccess = async googleUser => {
//         // console.log('google user', googleUser)

//         try {
//             const idToken = googleUser.getAuthResponse().id_token;
//             console.log(idToken)
//             // const client = new GraphQLClient(BASE_URL, {
//             //     headers: { authorization: idToken }
//             // });
//             // const { me } = await client.request(ME_QUERY);
//             // console.log(me)
//             // dispatch({ type: "LOGIN_USER", payload: me });
//             // dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });
//         } catch (err) {
//             onFailure(err);
//         }
//     }

//     const onFailure = err => {
//         console.error("Error logging in", err);
//         // dispatch({ type: "IS_LOGGED_IN", payload: false });
//     }

//     return (
//         <div>
//             <GoogleLogin 
//                 clientId={clientId}
//                 onSuccess={onSuccess} 
//                 onFailure={onFailure} 
//                 isSignedIn={true}
//                 buttonText="Login with Google"
//                 theme="dark" 
//             />
//         </div>
//     )
// }

export default Login;
