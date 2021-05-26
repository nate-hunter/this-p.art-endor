import { createContext } from 'react';


const Context = createContext({ 
    currentUser: null,
    isAuth: false,
    draft: null,
    posts: [],
    currentPost: null
})


export default Context;