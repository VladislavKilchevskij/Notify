<script setup>
import { ref, onMounted, computed } from "vue";
import { loadState, getNotes, deleteNote } from "./stores/NoteLocalStore";
import InputWindow from "./components/InputWindow.vue";
import Notes from "./components/Notes.vue";
import Modal from "./components/Modal.vue";
onMounted(async () => {
  await loadState();
});
const searchString = ref("");
const notes = ref(getNotes);
const windowNote = ref({});
const showWindow = ref(false);
const modalNote = ref({});
const showModalDelete = ref(false);
const messageModal = ref("");
const showModalInfo = ref(false);

const filteredNotes = computed(() => {
  return notes.value.filter((note) => {
    if (
      note.title.includes(searchString.value) ||
      note.body.includes(searchString.value)
    ) {
      return note;
    }
  });
});

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
    <section class="side-bar">
      <div class="side-bar__logo"></div>
      <div class="side-bar__panel">
        <button @click="createEmptyNote" class="btn side-bar__btn">
          Создать
        </button>
      </div>
    </section>
    <section class="main">
      <div class="nav-bar">
        <input
          v-model="searchString"
          type="text"
          class="nav-bar__search"
          placeholder="Search..."
        />
      </div>
      <div class="notes-area">
        <Suspense>
          <InputWindow
            @update:show="showWindow = false"
            @update:window="(response) => updateInputWindowShowInfo(response)"
            :show="showWindow"
            :note="windowNote"
          />
        </Suspense>
        <Notes
          :notes="filteredNotes"
          @update:show="showWindow = true"
          @transferData:note="
            (noteFromNotes) => (windowNote = Object.assign({}, noteFromNotes))
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
  border-bottom: 0.25px solid rgba(255, 255, 255, 0.35);
  background: url("N.svg") no-repeat center / contain;
}
.side-bar__panel {
  margin: 10px 0;
  border-bottom: 0.25px solid rgba(255, 255, 255, 0.35);
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
  width: 25%;
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
