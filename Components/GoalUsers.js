import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { writeToDB } from "../Firebase/firestoreHelper";

const GoalUsers = ({ id }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("The request was not successful");
        }
        const userData = await response.json();
        setUsers(userData);
        userData.forEach(async (user) => {
          await writeToDB(user, 'goals', id, 'users');
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    }

    fetchUserData();
  }, [id]);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default GoalUsers;
