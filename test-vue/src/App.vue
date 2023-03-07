<script setup>
import {
  loadState,
  getNotes,
  getCategories,
  deleteNote,
} from "./stores/NoteLocalStore";
import { ref, onMounted, computed } from "vue";
import { cloneNote } from "./utils/clone.js";
import InputWindow from "./components/InputWindow.vue";
import Notes from "./components/Notes.vue";
import Folders from "./components/Folders.vue";
import Modal from "./components/Modal.vue";
onMounted(async () => {
  await loadState();
});
const searchString = ref("");
const currentCategory = ref("");
const notesCategories = getCategories;
const windowNote = ref({ category: { name: "", color: "" } });
const showWindow = ref(false);
const modalNote = ref({});
const showModalDelete = ref(false);
const messageModal = ref("");
const showModalInfo = ref(false);

const filteredBySearch = computed(() => {
  return getNotes.value.filter((note) => {
    if (
      note.title.includes(searchString.value) ||
      note.body.includes(searchString.value)
    ) {
      return note;
    }
  });
});

const filteredByCategory = computed(() => {
  return getNotes.value.filter((note) => {
    if (note.category.name.includes(currentCategory.value)) {
      return note;
    }
  });
});

function createEmptyNote() {
  windowNote.value = { category: { name: "", color: "#000" } };
  showWindow.value = true;
}
function showNotesByCategory(name) {
  currentCategory.value = name;
  searchString.value = "";
}
function removeNote(response) {
  modalNote.value = response.target;
  messageModal.value = response.msg;
  showModalDelete.value = true;
}
function infoModalEvent(msg) {
  showModalInfo.value = true;
  messageModal.value = msg;
}
function updateInputWindowShowInfo(proxy) {
  windowNote.value = cloneNote(proxy.target);
  infoModalEvent(proxy.msg);
}
</script>

<template>
  <div class="container">
    <section class="side-bar">
      <div class="side-bar__logo"></div>
      <div class="side-bar__panel">
        <button @click="createEmptyNote" class="btn side-bar__btn">
          Создать
        </button>
      </div>
      <Folders
        @transfer-category="(recievedName) => showNotesByCategory(recievedName)"
        :categories="notesCategories"
      ></Folders>
    </section>
    <section class="main">
      <div class="nav-bar">
        <input
          v-model="searchString"
          class="nav-bar__search"
          type="text"
          placeholder="Поиск..."
        />
      </div>
      <div class="notes-area">
        <Suspense>
          <InputWindow
            @update:show="showWindow = false"
            @update:window="(response) => updateInputWindowShowInfo(response)"
            :show="showWindow"
            :note="windowNote"
            :categories="notesCategories"
          />
        </Suspense>
        <Notes
          :notes="searchString ? filteredBySearch : filteredByCategory"
          @update:show="showWindow = true"
          @transferData:note="
            (noteFromNotes) => (windowNote = cloneNote(noteFromNotes))
          "
          @deleteClick="(response) => removeNote(response)"
        />
      </div>
    </section>
    <Modal :show="showModalInfo" @closeModal="showModalInfo = false">
      <template #header>{{ messageModal }}</template>
    </Modal>
    <Modal :show="showModalDelete" @closeModal="showModalDelete = false">
      <template #header>{{ messageModal }}</template>
      <template #body>
        <button class="btn slot-btn" @click="deleteNote(modalNote)">
          Удалить
        </button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

/* Side bar section*/

.side-bar {
  width: 12vw;
  height: 100vh;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.85) 0%
    ),
    url("side-bar-backgr.jpg") no-repeat left / cover;
  padding: 0 8px;
  position: relative;
  z-index: 1;
}

.side-bar__logo {
  width: 100%;
  height: 25%;
  background: url("N.svg") no-repeat center / contain;
}
.side-bar__panel {
  padding-top: 10px;
  border-top: 0.25px solid rgba(255, 255, 255, 0.35);
  align-content: center;
}
.side-bar__btn {
  height: 50px;
  width: 100%;
  border-radius: 7px;
  margin-bottom: 10px;
  background: rgba(3, 205, 130, 0.5);
}

.side-bar__btn:hover {
  background: rgb(2, 184, 117);
}

/* Main section*/

.main {
  width: 88vw;
  height: 100vh;
  background: url("/main.jpg") no-repeat center / cover;
}

/* Nav bar block */

.nav-bar {
  height: 6%;
  background: rgb(16, 16, 16);
  display: flex;
  align-items: center;
}

.nav-bar__search {
  padding: 0.3em 1em;
  border-radius: 1em;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-weight: bold;
  transition: all 0.35s ease;
}

/* Notes block */

.notes-area {
  width: 100%;
  height: 94%;
  display: flex;
  justify-content: space-between;
}
</style>
