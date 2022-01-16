import React, { useEffect, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, View, Button, Text, } from 'react-native';

import { connect } from 'react-redux';
import { loadNotes, storeNotes } from '../redux/actions.js';

import NotePreview from "../components/NotePreview";

const ListScreen = ({ loadNotes, storeNotes, notesStore, navigation }) => {
  // Загрузить заметки при входе в приложение.
  useEffect(() => { loadNotes(); }, []);

  // Сохранить заметки в локальное хранилище при добавлении/изменении/удалении.
  useEffect(() => { storeNotes(notesStore.notes); }, [notesStore]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Создать Заметку")} title="Добавить" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {notesStore.notes.length ? (
        <FlatList
          contentContainerStyle={styles.list}
          data={notesStore.notes}
          renderItem={({ item }) => <NotePreview note={item} navigation={navigation} />} // Хорошая ли практика явно передавать navigation как атрибут?
          keyExtractor={item => item.id.toString()}
          overflow="visible"
        />
      ) : (
        <Text style={styles.hint}>
          Добавьте новую заметку!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#f1f1f1",
  },
  list: {
    paddingHorizontal: 8,
  },
  hint: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 16,
  },
});

const mapStateToProps = state => {
  return {
    notesStore: state.notes,
  }
};

const mapDispatchToProps = {
  loadNotes,
  storeNotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
