import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { database } from "./FirebaseSetup";

export async function writeToDB(data, collectionName = 'goals') {
    try{
    await addDoc(collection(database, collectionName), data);
    } catch(err) {
        console.error('write to db ', err);
    }
}