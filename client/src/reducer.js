export default function reducer(state, { type, payload }) {
    switch(type) {
        case "LOGIN_USER":
            return {
                ...state,
                currentUser: payload
            }
        case "IS_LOGGED_IN":  // "Will update a new piece of state that will be added to Context"
            return {
                ...state,
                isAuth: payload
            }
        case "SIGNOUT_USER":
            return {
                ...state,
                isAuth: false,
                currentUser: null
            }
        case "CREATE_DRAFT": 
            return {
                ...state,
                currentPost: null,
                draft: {
                    latitude: 0,
                    longitude: 0
                }
            }
        case "UPDATE_DRAFT_LOCATION":
            return {
                ...state,
                draft: payload
            }
        case "DELETE_DRAFT":
            return {
                ...state,
                draft: null
            }
        case "GET_POSTS":
            return {
                ...state,
                posts: payload
            }
        case "CREATE_POST":
            console.log('CREATE_POST payload:', payload);
            const newPost = payload 
            const prevPosts = state.posts.filter(post => post._id !== newPost._id)
            return {
                ...state,
                posts: [...prevPosts, newPost]

            }
        case "SET_POST":
            return {
                ...state,
                currentPost: payload,
                draft: null
            }
        case "DELETE_POST":
            const deletedPost = payload; 
            const filteredPosts = state.posts.filter(post => post._id !== deletedPost._id);
            if (state.currentPost) {
                const isCurrentPost = deletedPost._id === state.currentPost._id 
                if (isCurrentPost) {
                    return {
                        ...state,
                        posts: filteredPosts,
                        currentPost: null
                    };
                }
            }
            return {
                ...state,
                posts: filteredPosts
            }
        case "CREATE_COMMENT": 
            const updatedCurrentPost = payload;
            console.log('payload:', payload)
            console.log('state:', state)
            let count = 1;
            const updatedPosts = state.posts.map(post => 
                {console.log(`post (${count++})`, post)
                return post._id === updatedCurrentPost._id ? updatedCurrentPost : post}
            )
            return { 
                ...state,
                posts: updatedPosts,
                currentPost: updatedCurrentPost
            };
        default:
            return state;

    }
}