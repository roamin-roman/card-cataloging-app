import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    Platform,
    Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const CardInfo = (props) => {
    const { _id, name, picture, year, price, brand, condition } =
        props.route.params.item;
    const deleteCard = () => {
        fetch("http://2b221f42c5f7.ngrok.io/delete", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: _id,
            }),
        })
            .then((res) => res.json())
            .then((deletedEmp) => {
                Alert.alert(`${deletedEmp.name} deleted`);
                props.navigation.navigate("Home");
            })
            .catch((err) => {
                Alert.alert("Someting went wrong");
            });
    };
    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#0033ff", "#6bc1ff"]}
                style={{ height: "20%" }}
            />
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{
                        width: 140,
                        height: 210,
                        marginTop: -100,
                    }}
                    source={{ uri: picture }}
                />
            </View>
            <View style={{ alignItems: "center", margin: 15 }}>
                <Title>{name}</Title>
                <Text style={{ fontSize: 15 }}>
                    {year} {brand}
                </Text>
            </View>
            <Card style={styles.mycard}>
                <View style={styles.cardContent}>
                    <MaterialIcons
                        name="attach-money"
                        size={32}
                        color="#339100"
                    />
                    <Text style={styles.mytext}>{price}</Text>
                </View>
            </Card>
            <Card style={styles.mycard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="flare" size={32} color="#339100" />
                    <Text style={styles.mytext}>{condition}</Text>
                </View>
            </Card>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    padding: 10,
                }}
            >
                <Button
                    icon="account-edit"
                    mode="contained"
                    theme={theme}
                    onPress={() => {
                        props.navigation.navigate("Create", {
                            _id,
                            name,
                            picture,
                            year,
                            price,
                            brand,
                            condition,
                        });
                    }}
                >
                    Edit
                </Button>
                <Button
                    icon="delete"
                    mode="contained"
                    theme={theme}
                    onPress={() => deleteCard()}
                >
                    Delete Card
                </Button>
            </View>
        </View>
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
    mycard: {
        margin: 3,
    },
    cardContent: {
        flexDirection: "row",
        padding: 8,
    },
    mytext: {
        fontSize: 18,
        marginTop: 3,
        marginLeft: 5,
        marginBottom: 3,
    },
});
export default CardInfo;
