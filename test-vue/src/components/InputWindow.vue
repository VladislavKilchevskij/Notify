<script setup>
import { saveOrUpdate } from "../stores/NoteLocalStore";
const props = defineProps({
  show: Boolean,
  note: {},
});
const emit = defineEmits(["update:window"]);
function updateWindow(response) {
  emit("update:window", response);
}

async function submitForm(note) {
  const response = await saveOrUpdate(note);
  updateWindow(response);
}
</script>

<template>
  <Transition name="hide-left">
    <form @submit.prevent="submitForm(note)" class="window-area" v-if="show">
      <input
        type="text"
        class="window-area__input window-area__title"
        placeholder="Title"
        v-model="note.title"
      />
      <textarea
        class="window-area__input window-area__body"
        placeholder="Description"
        v-model="note.body"
      >
      </textarea>
      <div class="window-area__bottom-panel">
        <button class="btn window-area__btn window-area__btn_blue">
          Сохранить
        </button>
        <button
          class="btn window-area__btn window-area__btn_red"
          @click.prevent="$emit('update:show')"
        >
          Закрыть
        </button>
      </div>
    </form>
  </Transition>
</template>

<style scoped>
.window-area {
  height: 100%;
  width: 67%;
  background: #fff;
  border-right: 0.25px solid rgba(0, 0, 0, 0.3);
  display: inline-grid;
  grid-template-columns: auto;
  grid-template-rows: 4% auto 5%;
}

.window-area__title {
  width: 30%;
  line-height: 1em;
  border-right: 0.25px solid rgba(0, 0, 0, 0.3);
  padding: 0 10px;
  font-size: 20px;
  font-weight: bold;
  transition: all 0.35s ease;
}

.window-area__title:focus {
  width: 60%;
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
  width: 20%;
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

.hide-left-enter-from,
.hide-left-leave-to {
  opacity: 0;
  width: 0%;
}

.hide-left-enter-active,
.hide-left-leave-active {
  transition: all 1s ease;
}
</style>

