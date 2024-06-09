// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { v4 } from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvOWnj9GSgPTwiZSE3LNdiZ-GrlsTQhf0",
    authDomain: "cdajcofradiaapi.firebaseapp.com",
    databaseURL: "https://cdajcofradiaapi-default-rtdb.firebaseio.com",
    projectId: "cdajcofradiaapi",
    storageBucket: "cdajcofradiaapi.appspot.com",
    messagingSenderId: "830827324999",
    appId: "1:830827324999:web:3621724cb6943ec2e5f362",
    measurementId: "G-MJFJ2DBRJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app)
export const db = getFirestore(app);
const storage = getStorage(app);

//Function
/**
 * Upload a file to firebase storage
 * @param {File} file The file to upload
 * @returns {Promise<string>} url of the uploaded file
 */
export async function uploadfile(file) {
    const storageRef = ref(storage, `Eventos/${v4()}`);
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}

const analytics = getAnalytics(app);