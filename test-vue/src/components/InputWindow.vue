<script setup>
import { saveOrUpdate } from "../stores/NoteLocalStore";
const props = defineProps({
  show: Boolean,
  note: {},
});
const emit = defineEmits(["update:window"]);
function updateWindow(response) {
  emit("update:window", response);
};

async function submitForm(note) {
  const response = await saveOrUpdate(note);
  console.log(response);
  updateWindow(response);
};
</script>

<template>
  <Transition name="slide-left">
    <form @submit.prevent="submitForm(note)" class="window-area" v-if="show">
      <input
        type="text"
        class="window-area__title-input"
        placeholder="Title"
        v-model="note.title"
      />
      <textarea
        class="window-area__body-input"
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
  border: 0.25px solid rgba(0, 0, 0, 0.3);
  font-family: Helvetica, sans-serif;
}

.window-area__title-input,
.window-area__body-input {
  transition: all 0.35s;
  border: none;
}

.window-area__title-input {
  width: 30%;
  height: 4.1%;
  border-right: 0.25px solid rgba(0, 0, 0, 0.3);
  outline: 0;
  padding: 4px 10px;
  font-weight: bold;
}

.window-area__title-input:focus {
  width: 60%;
}

.window-area__body-input {
  width: 100%;
  height: 90%;
  padding: 10px;
  border-top: 0.25px solid rgba(0, 0, 0, 0.3);
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.3);
  resize: none;
  outline: 0;
}

.window-area__bottom-panel {
  width: 100%;
  height: 6%;
  margin-top: -4px;
  margin-left: -1px;
}
.window-area__btn {
  display: inline-block;
  height: 100%;
  width: fit-content;
  width: 20%;
  border: none;
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

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  width: 0%;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 1s ease;
}
</style>

