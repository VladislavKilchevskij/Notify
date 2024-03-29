<script setup>
import { saveOrUpdate, changeCategoryColor } from "../stores/NoteLocalStore.js";
const props = defineProps({
  toogleWindow: Boolean,
  note: {
    title: String,
    body: String,
    category: {
      name: String,
      color: String,
    },
    timestamp: Date,
  },
  categories: Array,
});
const emit = defineEmits([
  "transfer-data:refreshWindow",
  "transfer-event:closeWindow",
]);
function updateWindow(response) {
  emit("transfer-data:refreshWindow", response);
}
function closeWindow() {
  emit("transfer-event:closeWindow");
}

async function submitForm(note) {
  changeCategoryColor(note);
  const response = await saveOrUpdate(note);
  updateWindow(response);
}
</script>

<template>
  <Transition name="hide">
    <form
      @submit.prevent="submitForm(note)"
      class="window-area"
      v-show="toogleWindow"
    >
      <div class="window-area__head">
        <input
          v-model="note.title"
          class="window-area__input window-area__input_title"
          type="text"
          placeholder="Заголовок"
        />
        <input
          v-model="note.category.color"
          class="window-area__color"
          type="color"
          list="categoriesColor"
        />
        <datalist id="categoriesColor">
          <option v-for="category of categories" :key="category">
            {{ category.color }}
          </option>
        </datalist>
        <input
          v-model="note.category.name"
          class="window-area__input window-area__input_category"
          type="text"
          list="categoriesName"
          placeholder="Название и цвет категории"
        />
        <datalist id="categoriesName">
          <option v-for="category of categories" :key="category">
            {{ category.name }}
          </option>
        </datalist>
      </div>
      <textarea
        v-model="note.body"
        class="window-area__body"
        placeholder="Текст заметки"
      >
      </textarea>
      <div class="window-area__bottom-panel">
        <button class="btn window-area__btn window-area__btn_blue">
          Сохранить
        </button>
        <button
          class="btn window-area__btn window-area__btn_red"
          @click.prevent="closeWindow"
        >
          Закрыть
        </button>
      </div>
    </form>
  </Transition>
</template>

<style scoped>
.window-area {
  width: auto;
  flex: 1;
  background: #fff;
  border-right: 0.25px solid rgba(0, 0, 0, 0.3);
  display: inline-grid;
  grid-template-columns: auto;
  grid-template-rows: 35px auto 35px;
}

.window-area__head {
  display: flex;
}

.window-area__input {
  height: 100%;
  padding-left: 10px;
  font-size: 20px;
  transition: all 0.35s ease;
}
.window-area__input_title {
  width: 40%;
  font-weight: bold;
  border-right: 0.25px solid rgba(0, 0, 0, 0.3);
}

.window-area__input_title:focus {
  width: 75%;
}

.window-area__input_category {
  width: 60%;
}

.window-area__color {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  padding: 5px;
  height: 100%;
  max-width: 35px;
  cursor: pointer;
}

.window-area__color::-webkit-color-swatch {
  border-radius: 5px;
  border: none;
}

.window-area__color::-webkit-color-swatch-wrapper {
  padding: 0;
}

.window-area__color::-moz-color-swatch,
.window-area__color::-moz-focus-inner {
  border-radius: 5px;
  border: 0;
}

.window-area__color::-moz-focus-inner {
  padding: 0;
}
.window-area__body {
  padding: 10px;
  border-top: 0.25px solid rgba(0, 0, 0, 0.3);
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.3);
  resize: none;
}

.window-area__btn {
  display: inline-block;
  height: 100%;
  width: 100px;
}

.window-area__btn_blue {
  background: #65a2e7;
}

.window-area__btn_red {
  background: #e76565;
}
.window-area__btn_blue:hover {
  background: #1276e7;
}

.window-area__btn_red:hover {
  background: #e71212;
}

/* Transition component properties */

.hide-enter-from,
.hide-leave-to {
  opacity: 0;
  width: 0;
}

.hide-enter-active,
.hide-leave-active {
  transition: all 1s ease-in-out;
}

/* ------------ Media ------------ */

@media (max-width: 824px) {
  .window-area {
    grid-template-rows: 50px auto 50px;
  }
  .window-area__color {
    max-width: 50px;
  }
}

@media (max-width: 576px) {
  .window-area {
    position: absolute;
    top: 1vh;
    left: 2.5vw;
    width: 95vw;
    height: calc(100vh - 60px - 4vh);
    border: 0.25px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    z-index: 998;
  }
  .window-area__input_title {
    border-top-left-radius: 10px;
  }
  .window-area__input_category {
    border-top-right-radius: 10px;
  }
  .window-area__btn {
    border-radius: 10px;
  }
}
</style>