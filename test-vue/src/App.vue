<script setup>
import {
  loadState,
  getNotes,
  getCategories,
  deleteNote,
} from "./stores/NoteLocalStore";
import { ref, onMounted, computed } from "vue";
import getViewport from "./utils/viewResolver.js";
import { cloneNote } from "./utils/clone.js";
import Nav from "./components/Nav.vue";
import InputWindow from "./components/InputWindow.vue";
import Notes from "./components/Notes.vue";
import Folders from "./components/Folders.vue";
import Modal from "./components/Modal.vue";

/*----- Adaptive props -----*/

const viewport = getViewport();

/*----- Logic props -----*/

onMounted(async () => {
  await loadState();
});
const searchString = ref("");
const currentCategory = ref("");
const notesCategories = getCategories;
const windowNote = ref({ category: { name: "", color: "" } });
const modalNote = ref({});
const messageModal = ref("");
const showAssideBar = ref(true);
const showWindow = ref(false);
const showModalDelete = ref(false);
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
    <div v-if="viewport.width > 576" class="logo-box">
      <img class="logo-box__icon" src="N.svg" alt="logo_icon" />
      <img
        v-if="viewport.width > 824"
        class="logo-box__sign"
        src="logo.svg"
        alt="logo"
      />
    </div>
    <Nav
      :view-resolver="viewport"
      :search-string="searchString"
      @transfer-data:search="(search) => (searchString = search)"
      @transfer-event:toogleAssideBar="showAssideBar = !showAssideBar"
      @transfer-event:newNote="createEmptyNote"
    ></Nav>
    <Folders
      :view-resolver="viewport"
      :categories="notesCategories"
      @transfer-data:categoryName="
        (recievedName) => showNotesByCategory(recievedName)
      "
    ></Folders>
    <main class="main">
      <Suspense>
        <InputWindow
          :toogleWindow="showWindow"
          :note="windowNote"
          :categories="notesCategories"
          @transfer-event:closeWindow="showWindow = false"
          @transfer-data:refreshWindow="
            (response) => updateInputWindowShowInfo(response)
          "
        />
      </Suspense>
      <Notes
        :view-resolver="viewport"
        :isWindowActive="showWindow"
        :notes="searchString ? filteredBySearch : filteredByCategory"
        @transfer-event:openWindow="showWindow = true"
        @transfer-data:editNote="
          (noteFromNotes) => (windowNote = cloneNote(noteFromNotes))
        "
        @transfer-data:deleteNote="(response) => runDeleteModal(response)"
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
  grid-template-rows: 50px calc(100vh - 50px);
  grid-template-columns: 200px auto;
  grid-template-areas:
    "A B"
    "C D";
}
.logo-box {
  grid-area: A;
  height: 100%;
  background: rgb(16, 16, 16);
  display: flex;
  align-self: center;
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
.main {
  grid-area: D;
  background: url("/main.jpg") no-repeat center / cover;
  display: flex;
}

/* ------------ Media ------------ */

@media (max-width: 992px) {
  .container {
    grid-template-columns: 165px auto;
  }
}

@media (max-width: 824px) {
  .container {
    grid-template-columns: 70px 50px calc(100vw - 120px);
    grid-template-rows: 70px calc(100vh - 70px);
    grid-template-areas:
      "A C B"
      "D D D";
  }
  .logo-box {
    padding: 0 10px;
  }
  .logo-box__icon {
    width: 50px;
    height: 50px;
    margin-right: 5px;
  }
}

@media (max-width: 576px) {
  .container {
    grid-template-columns: 60px calc(100vw - 60px);
    grid-template-rows: calc(100vh - 70px) 70px;
    grid-template-areas:
      "D D D"
      "C B B";
  }
}
</style>