const admin = require('firebase-admin');

const serviceAccount = require("../db/firebasekey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const dbInstance = admin.firestore();

module.exports = dbInstance;
