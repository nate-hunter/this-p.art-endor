export const ME_QUERY = `
    {
        me {
            _id
            username
            email 
            img
        }
    }
`

export const GET_POSTS_QUERY = `
  {
    getPosts {
      _id
      createdAt
      title
      img
      content
      lat
      lon
      poster {
        _id
        username
        email
        img
      }
      comments {
        text
        createdAt
        poster {
          _id 
          username
          img
        }
      }
    }
  }
`;