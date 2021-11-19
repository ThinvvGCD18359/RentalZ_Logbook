import React, { useEffect, useState } from "react";
import axios from "axios";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import FormCard from "../components/formCard";
import { Icon, Input } from "react-native-elements";


export default function ListForm() {
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getAllForm = async () => {
                try {
                    const response = await axios.get(
                        'http://26.225.11.197:3000/form/get',
                    );
                    setData(response.data.reverse());
                } catch (error) {
                    console.log(error);
                }
            }
            getAllForm();
        })
        return unsubscribe;
    }, []);

    const handleDelete = async (formId) => {
        try {
            const response = await axios.post(
                'http://26.225.11.197:3000/form/delete',
                { formId },
            );
            setData(data.filter((d) => d.id !== response.data.id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                'http://26.225.11.197:3000/form/get/search',
                {
                    params: { keyword: keyword },
                },
            );
            setKeyword(response.data);
            setData(response.data);
            console.log('search', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Input
                    placeholder="Search Here..."
                    value={keyword}
                    onChangeText={(value) => setKeyword(value)}
                    rightIcon={
                        <Icon
                            name='search1'
                            type="antdesign"
                            size={20}
                            onPress={handleSearch}
                        />
                    }
                />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <FormCard
                            item={item}
                            handleDelete={handleDelete}
                        />
                    )
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
})