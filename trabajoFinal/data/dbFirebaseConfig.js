
let admin = require("firebase-admin");

let serviceAccount = require("../ecommercetf-95f5f-firebase-adminsdk-cgizk-ced73149d3.json");
//conecto a firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const dbFirebase = admin.firestore()
module.exports= dbFirebase