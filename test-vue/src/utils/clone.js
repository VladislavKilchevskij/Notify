function cloneNote(note) {
    let clonedNote = {};
    clonedNote.category = {};
    if(note.id) {
        clonedNote.id = note.id;
    }
    clonedNote.title = note.title;
    clonedNote.body = note.body;
    clonedNote.category.name = note.category.name;
    clonedNote.category.color = note.category.color;
    clonedNote.timestamp = note.timestamp;
    return clonedNote;
};

export {
    cloneNote
}