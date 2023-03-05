import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.react_app_api_Key,
    authDomain: process.env.react_app_auth_Domain,
    projectId: process.env.react_app_project_Id,
    storageBucket: process.env.react_app_storage_Bucket,
    messagingSenderId: process.env.react_app_messaging_Sender_Id,
    appId: process.env.react_app_app_Id,
    measurementId: process.env.react_app_measurement_Id
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const dataBase = getFirestore(app)
const storage = getStorage(app)

export {auth,  dataBase, storage}
