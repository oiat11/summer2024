import { addDoc, collection, doc, deleteDoc, updateDoc, getDocs, query, where, setDoc} from "firebase/firestore";
import { database, auth } from "./FirebaseSetup";


export async function writeToDB(data, collectionPath) {
    try {
      const collectionRef = collection(database, collectionPath);
      const docRef = await addDoc(collectionRef, data);
      console.log('Document written with ID: ', docRef.id);
    } catch (err) {
      console.error('write to db ', err);
    }
  }

export async function deleteFromDB(id, collectionName = 'goals') {
    try { 
        await deleteDoc(doc(database, collectionName, id));
        console.log('Document deleted with ID: ', id);
    }
    catch (err) {
      console.log(err)
    }
  }

  export async function updateWarningStatus(id, collectionName = 'goals', warningStatus) {
    try {
        const docRef = doc(database, collectionName, id);
        await updateDoc(docRef, { warning: warningStatus });
        console.log('Warning status:', warningStatus);
    } catch (err) {
        console.error('Error updating document', err);
    }
}

export async function readAllDocs(collectionName) {
    try {
        const querySnapshot = await getDocs(query(collection(database, collectionName), 
        where("owner", "==", auth.currentUser.uid)));
        let newArray = [];

        querySnapshot.forEach((docSnapshot) => {
            newArray.push(docSnapshot.data());
            console.log('Document data:', newArray);
           
        } )

        return newArray;
    } catch (err) {
        console.error('Error reading documents: ', err);
    }
}

export async function writeWithId(data, collectionName, id) {
  try {
    const docRef = doc(database, collectionName, id);
    await setDoc(docRef, data, { merge: true });
    console.log('Document successfully written!');
  } catch (err) {
    console.error('Error writing document: ', err);
  }
}