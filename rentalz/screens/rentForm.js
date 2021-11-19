import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Modal, View, TouchableHighlight, Alert } from 'react-native';
import { Icon, Input, Text, ThemeProvider } from "react-native-elements";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/core';

const rentSchema = yup.object({
    address: yup.string().required(),
    propertyType: yup.string().required(),
    bedroom: yup.string().required(),
    myDate: yup.date().required(),
    price: yup.number().integer().moreThan(0, 'Price cannot be 0').required(),
    furniture: yup.string(),
    note: yup.string().max(255, "Notes can only be up to 255 characters"),
    reporter: yup.string().min(4, "Name must be at least 4 characters long").max(50, "Name can only be up to 50 characters").required(),
});

export default function RentForm() {
    const navigation = useNavigation();
    const [data, setData] = useState({})
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showConfirmDialog = (data) => {
        setModalVisible(true)
        setData(data)
    };

    const onSubmitPress = async (resetForm) => {
        try {
            const response = await axios.post(
                'http://26.225.11.197:3000/form/create',
                data,
            );
            console.log("data:", data);
            if (response.data.message === "Address already exists") {
                Alert.alert(
                    "Warning!!!",
                    "The address is existed",
                    [
                        {
                            text: "Understand",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                setModalVisible(false);
                resetForm();
                navigation.navigate("ListForm")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ThemeProvider >
            <ScrollView style={styles.scrollviewStyle}>
                <View style={styles.container}>
                    <Formik
                        initialValues={{ address: "", propertyType: "", bedroom: "", myDate: new Date(), price: "", furniture: "", note: "", reporter: "" }}
                        validationSchema={rentSchema}
                        onSubmit={showConfirmDialog}
                    >
                        {({ handleSubmit, values, setFieldValue, errors, handleChange, resetForm }) => (
                            <View style={styles.safeContainerStyle}>
                                <Input
                                    placeholder="Address (*)"
                                    value={values.address}
                                    onChangeText={handleChange("address")}
                                />
                                <Text style={styles.errorText}>{errors.address}</Text>
                                <Picker
                                    style={{ height: 50 }}
                                    mode="dropdown"
                                    selectedValue={values.propertyType}
                                    onValueChange={handleChange("propertyType")}
                                >
                                    <Picker.Item label="Property Type (*)" value="" enabled={false} />
                                    <Picker.Item label="Flat" value="Flat" />
                                    <Picker.Item label="House" value="House" />
                                    <Picker.Item label="Bungalow" value="Bungalow" />
                                </Picker>
                                <Text style={styles.errorText}>{errors.propertyType}</Text>

                                <Picker
                                    style={{ height: 50 }}
                                    mode="dropdown"
                                    selectedValue={values.bedroom}
                                    onValueChange={handleChange("bedroom")}
                                >
                                    <Picker.Item label="Bedroom (*)" value="" enabled={false} />
                                    <Picker.Item label="Studio" value="Studio" />
                                    <Picker.Item label="One" value="One" />
                                    <Picker.Item label="Two" value="Two" />
                                </Picker>
                                <Text style={styles.errorText}>{errors.bedroom}</Text>

                                <Input
                                    disabled
                                    title="Show Date Picker"
                                    rightIcon={
                                        <Icon
                                            name='calendar'
                                            type="antdesign"
                                            size={20}
                                            onPress={showDatePicker}
                                        />
                                    }
                                >{moment(values.myDate).format('YYYY-MM-DD')}</Input>

                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    maximumDate={new Date()}
                                    onConfirm={date => {
                                        setFieldValue('myDate', date)
                                        setDatePickerVisibility(false)
                                    }}
                                    onCancel={hideDatePicker}
                                />
                                <Text style={styles.errorText}>{errors.myDate}</Text>
                                <Input
                                    placeholder="Monthly price (*)"
                                    value={values.price}
                                    rightIcon={
                                        <Icon
                                            name='dollar'
                                            type="font-awesome"
                                            size={20}
                                        />
                                    }
                                    onChangeText={handleChange("price")}
                                />
                                <Text style={styles.errorText}>{errors.price}</Text>
                                <Picker
                                    style={{ height: 50 }}
                                    mode="dropdown"
                                    selectedValue={values.furniture}
                                    onValueChange={handleChange("furniture")}
                                >
                                    <Picker.Item label="Funiture Type" value="" enabled={false} />
                                    <Picker.Item label="Furnished" value="Furnished" />
                                    <Picker.Item label="Unfurnished" value="Unfurnished" />
                                    <Picker.Item label="Part Furnished" value="Part Furnished" />
                                </Picker>
                                <Text style={styles.errorText}>{errors.furniture}</Text>
                                <Input
                                    placeholder="Notes"
                                    value={values.note}
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={handleChange("note")}
                                />
                                <Text style={styles.errorText}>{errors.note}</Text>
                                <Input
                                    placeholder="Reporter (*)"
                                    value={values.reporter}
                                    rightIcon={
                                        <Icon
                                            name='user'
                                            type="font-awesome"
                                            size={20}
                                        />
                                    }
                                    onChangeText={handleChange("reporter")}
                                />
                                <Text style={styles.errorText}>{errors.reporter}</Text>
                                <Button title="Submit" onPress={handleSubmit} />
                                <View style={styles.centeredView}>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={modalVisible}
                                        onRequestClose={() => setModalVisible(!modalVisible)}
                                    >
                                        <View style={styles.modalView}>
                                            <Text style={styles.titleText}>Confirm your information</Text>

                                            <Text style={styles.modalText}>Address: {values.address}</Text>
                                            <Text style={styles.modalText}>Type: {values.propertyType}</Text>
                                            <Text style={styles.modalText}>Room: {values.bedroom}</Text>
                                            <Text style={styles.modalText}>Date: {moment(values.myDate).format('YYYY-MM-DD')}</Text>
                                            <Text style={styles.modalText}>Price: {values.price}</Text>
                                            <Text style={styles.modalText}>Furniture: {values.furniture}</Text>
                                            <Text style={styles.modalText}>Notes: {values.note}</Text>
                                            <Text style={styles.modalText}>Reporter: {values.reporter}</Text>

                                            <TouchableHighlight
                                                style={styles.openButton}
                                                onPress={() => onSubmitPress(resetForm)}>
                                                <Text style={styles.textStyle}>Okay</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                                                onPress={() => {
                                                    setModalVisible(!modalVisible);
                                                }}>
                                                <Text style={styles.textStyle}>Cancel</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </ThemeProvider>
    );
}


const styles = StyleSheet.create({
    safeContainerStyle: {
        flex: 1,
        margin: 10,
        justifyContent: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    errorText: {
        color: "red"
    },
    scrollviewStyle: {
        width: "100%",
    },
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
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
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