import { ref, computed } from 'vue';
import idb from '../../dbApi/idb';
import { cloneNote } from '../utils/clone.js'

const state = ref({ notes: [] });

function setNotes(notes) {
    state.value.notes = Array.from(notes);
};

async function loadState() {
    const notes = Array.from(await idb.getNotes());
    setNotes(notes);
};

const getNotes = computed(() => state.value.notes);
const getNotesCounter = computed(() => state.value.notes.length);
const getCategories = computed(() => {
    let categories = [];
    state.value.notes.forEach(note => {
        if (!categories.filter(item => item.name === note.category.name).length > 0) {
            note.category.count = state.value.notes.filter(elem => elem.category.name === note.category.name).length;
            categories.push(note.category);
        }
    })
    return categories;
});


/*---------------- CRUD functions ----------------*/

async function getNote(title) {
    await loadState();
    const notes = state.value.notes;
    let findedNote = {};
    notes.forEach(item => {
        if (item.title === title) {
            findedNote = cloneNote(item);
        }
    })
    return findedNote;
}

async function saveOrUpdate(note) {
    let proxy = {};
    if (isEmpty(note)) {
        proxy.target = cloneNote(note);
        proxy.msg = 'Проверьте, все ли поля заполнены!';
        return proxy;
    }
    if (!isNew(note)) {
        proxy.target = cloneNote(note);
        proxy.msg = "Заметка с таким зоголовком и описанием уже существует!";
        return proxy;
    }
    if (note.id) {
        idb.replaceNote(note);
        proxy.target = cloneNote(note);
        proxy.msg = `Заметка обновлена!`;
        await loadState();
        return proxy;
    }

    note.timestamp = new Date().toLocaleString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
    const serializableNote = cloneNote(note);
    idb.saveNote(serializableNote);
    proxy.target = cloneNote(await getNote(serializableNote.title));
    proxy.msg = `Заметка сохранена!`;
    return proxy;
};

function deleteNote(note) {
    idb.deleteNote(note);
    loadState();
};

/*---------------- Util store functions ----------------*/

function isEmpty(note) {
    if (!note.title?.trim() || !note.body?.trim() || !note.category.name?.trim()) {
        return true;
    }
};

function isNew(note) {
    const notes = state.value.notes;
    let isNewNote = true;
    notes.forEach(item => {
        if (item.title === note.title && item.body === note.body) {
            if (item.id === note.id) {
                isNewNote = true;
            } else {
                isNewNote = false;
            }
        }
    })
    return isNewNote;
};

function changeCategoryColor(item) {
    const filteredArray = state.value.notes.filter(elem => elem.category.name === item.category.name);
    filteredArray.forEach(async elem => {
        elem.category.color = item.category.color;
        await idb.replaceNote(elem);
    });
}

export {
    getNotes,
    getNotesCounter,
    getCategories,
    saveOrUpdate,
    loadState,
    deleteNote,
    changeCategoryColor
};
