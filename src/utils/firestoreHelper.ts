const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../../roomatefinder-483b3-firebase-adminsdk-c6aty-b59d86d999.json");
initializeApp({
  credential: cert(serviceAccount),
});

function getDbObject() {
  return getFirestore();
}

module.exports = { getDbObject };
