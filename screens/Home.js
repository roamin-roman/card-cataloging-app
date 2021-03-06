import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { Card, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

const Home = ({ navigation, route }) => {
    //  const [data,setData] = useState([])
    //  const [loading,setLoading]= useState(true)
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => {
        return state;
    });

    console.log(data, loading);

    const fetchData = () => {
        fetch("http://2b221f42c5f7.ngrok.io")
            .then((res) => res.json())
            .then((results) => {
                // setData(results)
                // setLoading(false)
                dispatch({ type: "ADD_DATA", payload: results });
                dispatch({ type: "SET_LOADING", payload: false });
            })
            .catch((err) => {
                Alert.alert("Failed to fetch data");
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderList = (item) => {
        return (
            <Card
                style={styles.mycard}
                onPress={() => navigation.navigate("Card Info", { item })}
            >
                <View style={styles.cardView}>
                    <Image
                        style={{ width: 60, height: 90 }}
                        source={{ uri: item.picture }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.year}</Text>
                        <Text style={styles.text}>{item.brand}</Text>
                    </View>
                </View>
            </Card>
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item);
                }}
                keyExtractor={(item) => item._id}
                onRefresh={() => fetchData()}
                refreshing={loading}
            />

            <FAB
                onPress={() => navigation.navigate("Create")}
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: "#1ab844" } }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mycard: {
        margin: 5,
    },
    cardView: {
        flexDirection: "row",
        padding: 6,
    },
    text: {
        fontSize: 18,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default Home;
