
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore} from 'firebase/firestore/lite';
import { v4 } from 'uuid';

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


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const storage = getStorage(app);
export const auth=getAuth();

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

