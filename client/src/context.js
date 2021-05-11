import { createContext } from 'react';


const Context = createContext({
    currentUser: null,
    isAuth: false,
    draft: null
    // pins: [],
    // currentPost: null
})


export default Context;