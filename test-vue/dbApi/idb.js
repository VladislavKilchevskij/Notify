const DB_NAME = 'notesDb'
const STORAGE_NAME = 'notes'
const DB_VERSION = 1
let DB

export default {
    async getDb() {
        return new Promise((resolve, reject) => {
            if (DB) {
                return resolve(DB);
            }
            const dbReq = window.indexedDB.open(DB_NAME, DB_VERSION);

            dbReq.onerror = (event) => {
                console.log('Error while opening database', event.target.errorCode);
                reject('Error');
            }

            dbReq.onsuccess = (event) => {
                DB = event.target.result;
                resolve(DB);
            }

            dbReq.onupgradeneeded = (event) => {
                let db = event.target.result;
                db.createObjectStore(STORAGE_NAME, {
                    autoIncrement: true,
                    keyPath: 'id'
                })
            }
        })
    },

    async saveNote(note) {
        let db = await this.getDb();
        return new Promise(resolve => {
            const tx = db.transaction([STORAGE_NAME], 'readwrite');
            tx.oncompelte = () => {
                resolve();
            }

            let store = tx.objectStore(STORAGE_NAME);
            store.put(note);
        })
    },

    async getNotes() {
        let db = await this.getDb();
        return new Promise(resolve => {
            let tx = db.transaction([STORAGE_NAME], 'readonly')
            tx.oncomplete = () => {
                resolve(notes);
            }
            const store = tx.objectStore(STORAGE_NAME);
            const notes = [];
            const cursorReq = store.openCursor();
            cursorReq.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    let value = cursor.value;
                    notes.push(value);
                    cursor.continue();
                }
            }
            cursorReq.onerror = (event) => {
                console.log(event.target.errorCode);
            }
        })
    },

    async replaceNote(note) {
        let db = await this.getDb();
        return new Promise((resolve) => {
            const tx = db.transaction([STORAGE_NAME], 'readwrite');
            tx.oncompelte = () => {
                resolve();
            }

            let store = tx.objectStore(STORAGE_NAME);
            const cursorReq = store.openCursor();
            cursorReq.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.id === note.id) {
                        const updateData = cursor.value;
                        updateData.title = note.title;
                        updateData.body = note.body;
                        const updateRequest = cursor.update(updateData);
                        updateRequest.onsuccess = () => {
                        }
                    } else {
                        cursor.continue();
                    }

                }
            }
            cursorReq.onerror = (event) => {
                console.log(event.target.errorCode);
            }
        })
    },

    async deleteNote(note) {
        let db = await this.getDb();
        return new Promise(resolve => {
            const tx = db.transaction([STORAGE_NAME], 'readwrite')
            tx.oncompelte = () => {
                resolve()
            }

            const store = tx.objectStore(STORAGE_NAME)
            store.delete(note.id)
        })
    },
}