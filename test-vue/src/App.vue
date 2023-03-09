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
  windowNote.value = { category: { name: "", color: "" } };
  showWindow.value = true;
}
function showNotesByCategory(name) {
  currentCategory.value = name;
  searchString.value = "";
}
function runDeleteModal(response) {
  modalNote.value = response.target;
  messageModal.value = response.msg;
  showModalDelete.value = true;
}

function removeNote(note) {
  if (windowNote.value.id === note.id) {
    windowNote.value = { category: { name: "", color: "" } };
  }
  deleteNote(note);
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
    <nav class="nav-bar">
      <div class="nav-bar__logo logo-box">
        <img class="logo-box__icon" src="N.svg" alt="logo_icon" />
        <img class="logo-box__sign" src="logo.svg" alt="logo" />
      </div>
      <input
        v-model="searchString"
        class="nav-bar__search"
        type="text"
        placeholder="Поиск..."
      />
    </nav>
    <asside class="asside-bar">
      <div class="asside-bar__panel">
        <button @click="createEmptyNote" class="btn asside-bar__btn">
          Создать
        </button>
      </div>
      <Folders
        @transfer-category="(recievedName) => showNotesByCategory(recievedName)"
        :categories="notesCategories"
      ></Folders>
    </asside>
    <main class="main">
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
        :isWindowActive="showWindow"
        @update:show="showWindow = true"
        @transferData:note="
          (noteFromNotes) => (windowNote = cloneNote(noteFromNotes))
        "
        @deleteEvent="(response) => runDeleteModal(response)"
      />
    </main>
    <Modal :show="showModalInfo" @closeModal="showModalInfo = false">
      <template #header>{{ messageModal }}</template>
    </Modal>
    <Modal :show="showModalDelete" @closeModal="showModalDelete = false">
      <template #header>{{ messageModal }}</template>
      <template #body>
        <button class="btn slot-btn" @click="removeNote(modalNote)">
          Удалить
        </button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 5vh 95vh;
  grid-template-columns: 200px auto;
  grid-template-areas:
    "A A"
    "B C";
}

/*---------- Nav section ----------*/

.nav-bar {
  grid-area: A;
  background: rgb(16, 16, 16);
  display: flex;
  align-items: center;
}

.logo-box {
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-box__icon {
  width: 35px;
  height: 35px;
}

.logo-box__sign {
  width: 75px;
  height: 35px;
  margin-left: 5px;
}

.nav-bar__search {
  width: 90px;
  padding: 0.3em 1em;
  border-radius: 1em;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  transition: all 0.35s ease;
}

.nav-bar__search:hover,
.nav-bar__search:focus {
  width: 290px;
}

/*---------- Asside section ----------*/

.asside-bar {
  grid-area: B;
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

.asside-bar__panel {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.65);
  align-content: center;
}

.asside-bar__btn {
  width: 100%;
  padding: 0.3em 15px;
  border-radius: 7px;
  background: rgba(3, 205, 130, 0.5);
}

.asside-bar__btn:hover {
  background: rgb(2, 184, 117);
}

/*---------- Main section ----------*/

.main {
  grid-area: C;
  background: url("/main.jpg") no-repeat center / cover;
  display: flex;
}
</style>