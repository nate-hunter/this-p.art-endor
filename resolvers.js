const { gql } = require('apollo-server');

const user = {
    _id: "1",
    username: "Panda",
    email: "panda@panda.com",
    img: "https://endor-tree-storage.nyc3.digitaloceanspaces.com/makapuu-01.jpg"
}

module.exports = {
    Query: {
        me: () => user
    }
}