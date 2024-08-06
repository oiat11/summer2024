import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { readAllDocs, writeToDB } from "../Firebase/firestoreHelper";


const GoalUsers = ({ id }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const dataFromFirestore = await readAllDocs(`goals/${id}/users`);
        console.log("data from firestore ",dataFromFirestore);
        if (dataFromFirestore.length) {
            setUsers(dataFromFirestore);
            return;
            }
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("The request was not successful");
        }
        const userData = await response.json();
        console.log('Fetched User Data:', userData);
        setUsers(userData);
        userData.forEach(async (user) => {
          await writeToDB(user, `goals/${id}/users`);
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    }
    fetchUserData();
  }, [id]);

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};


export default GoalUsers;