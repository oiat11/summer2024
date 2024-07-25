import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

const GoalUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("The request was not successful");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    }

    fetchUserData();
  }, []);

  return (
    <View>
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


export default GoalUsers;
