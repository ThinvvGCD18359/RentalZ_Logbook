import React, { useState } from "react";
import { Modal, StyleSheet, Text, Alert, TouchableOpacity, View } from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import moment from "moment";
import axios from "axios";


export default function FormCard(props) {
    const { item, handleDelete } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState([]);

    const showConfirm = () => {
        Alert.alert("Confirmation", 
        "Are you sure to delete this form?",
        [
            {
                text: "Cancel",
                onPress: () => {setModalVisible(false)}
            },
            {
                text: "Okay",
                onPress: () => {handleDelete(item.id)}
            }
        ],
        )
    };

    const getOneNote = async (formId) => {
        try {
            const response = await axios.get(
                'http://26.225.11.197:3000/form/get/note',
                {
                    params: { formId: formId },
                },
            );
            console.log(response.data);
            setNote(response.data);
            setModalVisible(true)
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitPress = async () => {
        try {
            const response = await axios.post(
                'http://26.225.11.197:3000/form/upsert/note',
                note,
            );
            console.log("note:", note);
            setModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditChange = (key, value) => {
        setNote({ ...note, [key]: value });
    };

    return (
        <View>
            <Card>
                <Card.Title>Form</Card.Title>
                <Card.Divider />
                <TouchableOpacity onPress={() => getOneNote(item.id)}>
                    <Text>{item.address}</Text>
                    <Text>{item.propertyType}</Text>
                    <Text>{item.bedroom}</Text>
                    <Text>{moment(item.myDate).format('YYYY-MM-DD')}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.furniture}</Text>
                    <Text>{item.note}</Text>
                    <Text>{item.reporter}</Text>
                </TouchableOpacity>
                <Button
                    title="Delete"
                    icon={<Icon type="entypo" size={20} name="trash" color="white" />}
                    onPress={showConfirm}
                />
            </Card>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.titleText}>Note Detail</Text>
                        <Input
                            onChangeText={(value) => handleEditChange("typeNote", value)}
                            placeholder="Type: "
                        >
                            {note?.typeNote}
                        </Input>
                        <Input
                            onChangeText={(value) => handleEditChange("roomNote", value)}
                            placeholder="Room: "
                        >
                            {note?.roomNote}
                        </Input>
                        <Input
                            onChangeText={(value) => handleEditChange("dateNote", value)}
                            placeholder="Date: "
                        >
                            {note?.dateNote}
                        </Input>
                        <Input
                            onChangeText={(value) => handleEditChange("priceNote", value)}
                            placeholder="Price: "
                        >
                            {note?.priceNote}
                        </Input>
                        <Input
                            onChangeText={(value) => handleEditChange("furnitureNote", value)}
                            placeholder="Furniture: "
                        >
                            {note?.furnitureNote}
                        </Input>
                        <Button title="Submit" onPress={handleSubmitPress} />
                    </View>
                </Modal>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'left',
    },
    titleText: {
        marginBottom: 30,
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 25,
    },
});