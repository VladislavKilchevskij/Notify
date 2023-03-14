<script setup>
const props = defineProps({
  notes: Array,
  isWindowActive: Boolean,
  viewResolver: Object
});
const emit = defineEmits([
  "transfer-data:editNote",
  "transfer-data:deleteNote",
  "transfer-event:openWindow",
]);
function openNoteToEdit(note) {
  emit("transfer-data:editNote", note);
  emit("transfer-event:openWindow");
}
function doDelete(item) {
  let proxy = {};
  proxy.target = item;
  proxy.msg = "Вы действительно хотите удалить заметку?";
  emit("transfer-data:deleteNote", proxy);
}
</script>

<template>
  <Transition name="short">
    <div
      class="notes-list"
      :class="{
        halfWidth:
          viewResolver.width > 576 ? (isWindowActive ? true : false) : false,
      }"
    >
      <TransitionGroup name="list">
        <div
          class="note"
          :class="{ noteSmaller: isWindowActive }"
          v-for="note of notes"
          :key="note.id"
          :note="note"
          @click="openNoteToEdit(note)"
        >
          <div
            :style="{ background: note.category.color }"
            class="note__category-color-indicator"
          ></div>
          <h4 class="note__title">
            {{ note.title }}
          </h4>
          <p class="note__body">
            {{ note.body }}
          </p>
          <p class="note__timestamp">{{ note.timestamp }}</p>
          <button class="btn note__btn" @click.stop="doDelete(note)"></button>
        </div>
      </TransitionGroup>
    </div>
  </Transition>
</template>

<style scoped>
.notes-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: overlay;
  align-content: flex-start;
  padding: 10px;
  transition: all 1s ease-in-out;
}

.halfWidth {
  width: 50%;
}
.note {
  width: 220px;
  aspect-ratio: 4/3;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(214, 214, 214);
  box-shadow: 0px 5px 7px -1px rgb(64, 64, 64);
  color: rgb(44, 44, 44);
  transition: all 0.35s ease;
  cursor: pointer;
  display: inline-grid;
  grid-template-columns: auto;
  grid-template-rows: 1.5em auto 1.4em;
  gap: 0.5em;
  position: relative;
}

.noteSmaller {
  width: 185px;
}

.note:hover {
  box-shadow: 0px 7px 15px -2px rgb(64, 64, 64);
  transform: translate(0, -5px);
}

.note:active {
  box-shadow: 0px 5px 7px -1px rgb(64, 64, 64);
  transform: translate(0);
}

.note__category-color-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: #000;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.note__title {
  font-size: 20px;
  line-height: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note__body {
  overflow: hidden;
  position: relative;
}

.note__body::after {
  content: "";
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 0) 67%,
    rgba(255, 255, 255, 1) 100%
  );
}

.note__timestamp {
  font-size: 13px;
  padding-right: 30px;
  line-height: 1.7em;
}

.note__btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 10%;
  background: url("trash-bin.ico") no-repeat center / 70%;
}

.note__btn:hover {
  background: url("trash-bin.ico") no-repeat center center / 70%,
    rgba(255, 45, 45, 0.7);
}

/* Transition Group properties */

.list-enter-active,
.list-leave-active {
  transition: opacity transform 1.5s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.1);
}

.list-leave-active {
  position: absolute;
}

/* Transition component properties */

.short-enter-from,
.short-leave-to {
  width: 100%;
}

.short-enter-active .notes-list,
.short-leave-active .notes-list {
  transition: all 1s ease-in-out;
}

/* ------------ Media ------------ */

@media (max-width: 1400px) {
  .halfWidth {
    width: 40%;
  }
}

@media (max-width: 1200px) {
  .halfWidth {
    width: 26%;
  }
}

@media (max-width: 992px) {
  .halfWidth {
    width: 30%;
  }
  .note {
    width: 185px;
  }
  .noteSmaller {
    width: 160px;
  }
}

@media (max-width: 824px) {
  .halfWidth {
    width: 33.5%;
  }
  .note {
    width: 160px;
  }
}

@media (max-width: 576px) {
  .note__list {
    justify-content: space-between;
  }
  .note {
    width: 29%;
  }
}

@media (max-width: 541px) {
  .note__title {
    font-size: 17px;
  }
  .note__body {
    font-size: 14px;
  }
  .note__timestamp {
    font-size: 11px;
  }
}

@media (max-width: 495px) {
  .note {
    width: 45%;
  }
}
@media (max-width: 425px) {
  .note {
    width: 43%;
  }
}
</style>