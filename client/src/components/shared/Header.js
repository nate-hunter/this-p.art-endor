import React, { useContext } from 'react';
import Context from '../../context';
// import Signout from '../components/Auth/Signout';

import './shared.css';


const Header = () => {
    const { state, dispatch } = useContext(Context);
    const { currentUser } = state;

    const handleLogout = () => {
        console.log('Logout...')
        dispatch({ type: "SIGNOUT_USER" })
    }

    const handleLogin = () => {
        console.log('Login...')
    }

    return (
        <div className="topnav">
            <a href="#">this p.Art</a>
            <a className="active" href="#">Home</a>
            <a href="#">About</a>
            {currentUser 
                ? <a className="user-status" onClick={handleLogout} href="#">{currentUser.username}</a>
                : <a className="user-status active" onClick={handleLogin} href="#">Login</a>
            }       
        </div>
    );
}

export default Header;