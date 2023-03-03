<script setup>
import { ref } from "vue";
import { deleteNote } from "./stores/NoteLocalStore";
import InputWindow from "./components/InputWindow.vue";
import Notes from "./components/Notes.vue";
import Modal from "./components/Modal.vue";
const windowNote = ref({});
const showWindow = ref(false);
const modalNote = ref({});
const showModalDelete = ref(false);
const messageModal = ref("");
const showModalInfo = ref(false);

function createEmptyNote() {
  windowNote.value = {};
  showWindow.value = true;
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
  windowNote.value = Object.assign({}, proxy.target);
  infoModalEvent(proxy.msg);
}
</script>

<template>
  <div class="container">
    <div class="side-bar">
      <div class="side-bar__logo"></div>
      <div class="side-bar__panel">
        <button @click="createEmptyNote" class="btn side-bar__btn">
          Создать
        </button>
      </div>
    </div>
    <div class="main">
      <div class="notes-area">
        <Suspense>
          <InputWindow
            @update:show="showWindow = false"
            @update:window="(response) => updateInputWindowShowInfo(response)"
            :show="showWindow"
            :note="windowNote"
          />
        </Suspense>
        <Suspense>
          <Notes
            @update:show="showWindow = true"
            @transferData:note="
              (noteFromNotes) => (windowNote = Object.assign({}, noteFromNotes))
            "
            @deleteClick="(response) => removeNote(response)"
          />
        </Suspense>
      </div>
    </div>
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
  border-bottom: 0.25px solid rgba(255, 255, 255, 0.35);
  background: url("N.svg") no-repeat center / 70%;
}

.side-bar__panel {
  margin: 10px 0;
  border-bottom: 0.25px solid rgba(255, 255, 255, 0.35);
}

.side-bar__btn {
  height: 50px;
  width: 100%;
  color: #fff;
  font-size: 1.2em;
  border-radius: 7px;
  margin-bottom: 10px;
  padding: 0 8px;
  background: rgba(3, 205, 130, 0.5);
}

.side-bar__btn:hover {
  background: rgb(2, 184, 117);
}

.main {
  width: 88vw;
  height: 100vh;
  background: url("/main.jpg") no-repeat center / cover;
}

.nav {
  width: 100%;
  height: 7%;
}

.notes-area {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
}
</style>
