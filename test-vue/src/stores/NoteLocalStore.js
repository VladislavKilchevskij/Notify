import { ref, computed } from 'vue';
import idb from '../../dbApi/idb';

const state = ref({ notes: [] });

function setNotes(notes) {
    state.value.notes = Array.from(notes);
};

const getNotes = computed(() => state.value.notes);

async function loadState() {
    const notes = Array.from(await idb.getNotes());
    setNotes(notes);
};

async function saveOrUpdate(note) {
    let proxy = {};
    if (isEmpty(note)) {
        proxy.target = Object.assign({}, note);
        proxy.msg = "Введите заголовок и/или описание!";
        return proxy;
    }
    if (!isNew(note)) {
        proxy.target = Object.assign({}, note);
        proxy.msg = "Заметка с таким зоголовком и описанием уже существует!";
        return proxy;
    }
    if (note.id) {
        idb.replaceNote(note);
        proxy.target = Object.assign({}, note);
        proxy.msg = `Заметка обновлена!`;
        await loadState();
        return proxy;
    }

    const serializableNote = {
        title: note.title, body: note.body, timestamp: new Date().toLocaleString("ru", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    };
    idb.saveNote(serializableNote);
    console.log(`Note ${note.title} saved`);
    proxy.target = Object.assign({}, await getNote(serializableNote.title));
    proxy.msg = `Заметка сохранена!`;
    return proxy;
};

function deleteNote(note) {
    idb.deleteNote(note);
    loadState();
};

function isEmpty(note) {
    if (!note.title || !note.body) {
        return true;
    }
}

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
}

async function getNote(title) {
    await loadState();
    const notes = state.value.notes;
    let findedNote = {};
    notes.forEach(item => {
        if (item.title === title) {
            findedNote = Object.assign({}, item);
        }
    })
    return findedNote;
}

export {
    getNotes,
    saveOrUpdate,
    loadState,
    deleteNote,
};
