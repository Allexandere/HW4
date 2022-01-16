import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { connect } from "react-redux";
import { editNote } from "../redux/actions";

import NoteOverview from "../components/NoteOverview";
import NoteEdit from "../components/NoteEdit";

const NoteScreen = ({ editNote, route, navigation }) => {
    const { note } = route.params;
    const [isEditMode, setIsEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(note.title);
    const [newContent, setNewContent] = useState(note.content);
    const [newUriImage, setNewUriImage] = useState(note.imageUri);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setNewUriImage(result.uri);
        }
    };

    const toggleEditMode = () => {
        isEditMode && editNote({
            id: note.id,
            imageUri: newUriImage,
            title: newTitle,
            content: newContent,
        });

        setIsEditMode(!isEditMode);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => { toggleEditMode() }} title={!isEditMode ? "Изменить" : "Сохранить"} />
            ),
        });
    }, [isEditMode, newTitle, newContent, newUriImage]);

    return (
        <View style={styles.container}>
            {!isEditMode ? (
                <NoteOverview title={newTitle} content={newContent} uriImage={newUriImage} />
            ) : (
                <NoteEdit title={newTitle} setTitle={setNewTitle} content={newContent} setContent={setNewContent} uriImage={newUriImage} pickImage={pickImage} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        paddingHorizontal: 8,
        backgroundColor: "#f1f1f1",
    },
});

const mapDispatchToProps = {
    editNote,
};

export default connect(null, mapDispatchToProps)(NoteScreen);