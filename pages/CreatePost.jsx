import { Platform, Alert, View, Text, Button } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import React, { useEffect } from 'react';


const requestStoragePermission = async () => {
    let readPermission, writePermission, managePermission;

    if (Platform.OS === 'android') {
        if (Platform.Version >= 30) {
            readPermission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
            writePermission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
            managePermission = PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE;
        } else {
            readPermission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
            writePermission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
        }
    } else {
        return;
    }

    const checkPermissionStatus = async (permission) => {
        const result = await check(permission);
        if (result === RESULTS.GRANTED) {
            return true;
        } else if (result === RESULTS.DENIED) {
            const requestResult = await request(permission);
            return requestResult === RESULTS.GRANTED;
        } else if (result === RESULTS.BLOCKED) {
            Alert.alert(
                "Permission Blocked",
                "Please enable storage access in the settings",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Open Settings", onPress: () => openSettings() }
                ]
            );
            return false;
        } else {
            return false;
        }
    };

    const readGranted = await checkPermissionStatus(readPermission);
    const writeGranted = await checkPermissionStatus(writePermission);

    if (Platform.Version >= 30) {
        const manageGranted = await checkPermissionStatus(managePermission);
        if (!manageGranted) {
            Alert.alert(
                "Permission Required",
                "Please grant manage storage permission in the settings",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Open Settings", onPress: () => openSettings() }
                ]
            );
            return false;
        }
    }

    return readGranted && writeGranted;
};










const CreatePost = () => {

    useEffect(() => {
        requestStoragePermission().then(granted => {
            if (granted) {
                console.log("Permissions granted");
            } else {
                console.log("Permissions denied");
            }
        });
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello, world!</Text>
            <Button title="Request Storage Permission" onPress={requestStoragePermission} />
        </View>
    )
}

export default CreatePost;