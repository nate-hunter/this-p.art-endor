const User = require('../models/User');
// onst { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)




exports.findOrCreateUser = async token => {
    let testPandaUser = {
        _id: "1",
        username: "testPanda",
        email: "testPanda@panda.com",
        img: "https://endor-tree-storage.nyc3.digitaloceanspaces.com/makapuu-01.jpg"
    }

    // 1: verify auth token
    // 2: check if the user exist with provide google info
    // 3: if user exists, return user; else create new user in db

    // 1:
    // const googleUser = await verifyAuthToken(token);
    // console.log('test token', token)
    const testUser = token === 'test-id-token' ? testPandaUser : null; 
    if (testUser) testUser.email = 'testPandaUser@panda.com'

    // 2:
    // const user = await checkIfUserExists(googleUser.email);  // Either undef or a google user returned;
    const user = await checkIfUserExists(testUser.email);  // Either undef or a google user returned;

    // 3:
    // return user ? user : createNewUser(googleUser);
    return user ? user : createNewUser(testUser);
}


/*  // User `OAuth2Client` to verify Google auth token -- not needed for this round of testing
const verifyAuthToken = async token => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        })
        return ticket.getPayload()
    } catch {
        console.error("Error verifying auth token", err)
    }
}
*/

// Finds user from MongoDB;  `exec()` returns a promise
const checkIfUserExists = async email => await User.findOne({ email }).exec()

const createNewUser = testUser => {
    // const { name, email, picture } = googleUser;
    const { username, email, img } = testUser;
    const user = { username, email, img };
    return new User(user).save();
}