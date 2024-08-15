import { View, Button, Alert } from 'react-native';
import React from 'react';
import * as Notifications from "expo-notifications";

export const verifyPermissions = async () => {
    const permissionResponse = await Notifications.getPermissionsAsync();
    if (permissionResponse.granted) {
        return true;
    }
    const requestResponse = await Notifications.requestPermissionsAsync();
    return requestResponse.granted;
};

const NotificationManager = () => {

    const scheduleNotificationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            Alert.alert("You need to grant notification permissions to use this feature.");
            return;
        }
        try {
            const data = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "This is your reminder",
                    body: "Reminder of the goal",
                    data: { url: 'https://www.google.com' },
                },
                trigger: {
                    seconds: 5, 
                },
            });
            console.log(data);
        } catch (err) {
            console.error("Error scheduling notification:", err);
        }
    };

    return (
        <View>
            <Button title="Remind me to add a goal" onPress={scheduleNotificationHandler} />
        </View>
    );
}

export default NotificationManager;
