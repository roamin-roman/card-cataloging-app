import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CreateCard = ({ navigation, route }) => {
    const getDetails = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name;
                case "year":
                    return route.params.year;
                case "brand":
                    return route.params.brand;
                case "price":
                    return route.params.price;
                case "picture":
                    return route.params.picture;
                case "condition":
                    return route.params.condition;
            }
        }
        return "";
    };

    const [name, setName] = useState(getDetails("name"));
    const [year, setYear] = useState(getDetails("year"));
    const [brand, setBrand] = useState(getDetails("brand"));
    const [price, setPrice] = useState(getDetails("price"));
    const [picture, setPicture] = useState(getDetails("picture"));
    const [condition, setCondition] = useState(getDetails("condition"));
    const [modal, setModal] = useState(false);
    const [enableshift, setenableShift] = useState(false);

    const submitData = () => {
        fetch("http://2b221f42c5f7.ngrok.io/send-data", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                brand,
                year,
                price,
                picture,
                condition,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                Alert.alert(`${data.name} is saved successfuly`);
                navigation.navigate("Home");
            })
            .catch((err) => {
                Alert.alert("Someting went wrong");
            });
    };

    const updateDetails = () => {
        fetch("http://2b221f42c5f7.ngrok.io/update", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: route.params._id,
                name,
                brand,
                year,
                price,
                picture,
                condition,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                Alert.alert(`${data.name} is updated successfuly`);
                navigation.navigate("Home");
            })
            .catch((err) => {
                Alert.alert("someting went wrong");
            });
    };

    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1.5],
                quality: 0.5,
            });
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `CardCatalog/${data.uri.split(".")[1]}`,
                    name: `CardCatalog.${data.uri.split(".")[1]}`,
                };
                handleUpload(newfile);
            }
        } else {
            Alert.alert("You need to give camera roll permissions.");
        }
    };
    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA);
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1.5],
                quality: 0.5,
            });
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `CardCatalog/${data.uri.split(".")[1]}`,
                    name: `CardCatalog.${data.uri.split(".")[1]}`,
                };
                handleUpload(newfile);
            }
        } else {
            Alert.alert("You need to give camera permissions.");
        }
    };

    const handleUpload = (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "cardCatalog");
        data.append("cloud_name", "llwlwww");

        fetch("https://api.cloudinary.com/v1_1/llwlwww/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setPicture(data.url);
                setModal(false);
            })
            .catch((err) => {
                Alert.alert("Error while uploading");
            });
    };

    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: "#ffffff" }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
        >
            <TextInput
                label="Name"
                style={styles.inputStyle}
                value={name}
                onFocus={() => setenableShift(false)}
                theme={theme}
                mode="outlined"
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                label="Brand"
                style={styles.inputStyle}
                value={brand}
                theme={theme}
                onFocus={() => setenableShift(false)}
                mode="outlined"
                onChangeText={(text) => setBrand(text)}
            />
            <TextInput
                label="Year"
                style={styles.inputStyle}
                value={year}
                theme={theme}
                onFocus={() => setenableShift(false)}
                keyboardType="number-pad"
                mode="outlined"
                onChangeText={(text) => setYear(text)}
            />

            <TextInput
                label="Price"
                style={styles.inputStyle}
                value={price}
                theme={theme}
                onFocus={() => setenableShift(true)}
                keyboardType="number-pad"
                mode="outlined"
                onChangeText={(text) => setPrice(text)}
            />
            <TextInput
                label="Condition"
                style={styles.inputStyle}
                value={condition}
                theme={theme}
                onFocus={() => setenableShift(true)}
                mode="outlined"
                onChangeText={(text) => setCondition(text)}
            />
            <Button
                style={styles.inputStyle}
                icon={picture == "" ? "upload" : "check"}
                mode="contained"
                theme={theme}
                onPress={() => setModal(true)}
            >
                Upload Image
            </Button>
            {route.params ? (
                <Button
                    style={styles.inputStyle}
                    icon="content-save"
                    mode="contained"
                    theme={theme}
                    onPress={() => updateDetails()}
                >
                    Update details
                </Button>
            ) : (
                <Button
                    style={styles.inputStyle}
                    icon="content-save"
                    mode="contained"
                    theme={theme}
                    onPress={() => submitData()}
                >
                    save
                </Button>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(false);
                }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                        <Button
                            icon="camera"
                            theme={theme}
                            mode="contained"
                            onPress={() => pickFromCamera()}
                        >
                            camera
                        </Button>
                        <Button
                            icon="image-area"
                            mode="contained"
                            theme={theme}
                            onPress={() => pickFromGallery()}
                        >
                            gallery
                        </Button>
                    </View>
                    <Button theme={theme} onPress={() => setModal(false)}>
                        cancel
                    </Button>
                </View>
            </Modal>
        </KeyboardAwareScrollView>
    );
};

const theme = {
    colors: {
        primary: "#339100",
    },
};
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputStyle: {
        margin: 5,
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white",
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});

export default CreateCard;
