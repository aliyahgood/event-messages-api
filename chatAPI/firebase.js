const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

// initialize firebase instance 

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = { db };