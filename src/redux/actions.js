import types from "./types.js";

export const createNote = (note) => ({ 
    type: types.CREATE_NOTE, 
    payload: note, 
});

export const editNote = (noteToEdit) => ({
    type: types.EDIT_NOTE,
    payload: noteToEdit,
});

export const deleteNote = (noteToDelete) => ({
    type: types.DELETE_NOTE,
    payload: noteToDelete,
});

export const loadNotes = () => {
    return {
        type: types.LOAD_NOTES,
    }
};

export const storeNotes = (notesToStore) => {
    return {
        type: types.STORE_NOTES,
        payload: notesToStore,
    }
};
