<script setup>
const props = defineProps({
  notes: Array,
  isWindowActive: Boolean,
});
const emit = defineEmits(["transferData:note", "update:show", "deleteEvent"]);
function openNoteToEdit(note) {
  emit("transferData:note", note);
  emit("update:show");
}
function doDelete(item) {
  let proxy = {};
  proxy.target = item;
  proxy.msg = "Вы действительно хотите удалить заметку?";
  emit("deleteEvent", proxy);
}
</script>

<template>
  <Transition name="short">
    <div class="notes-list" :class="{ halfWidth: isWindowActive }">
      <TransitionGroup name="list">
        <div
          class="note"
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
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: overlay;
  align-content: start;
  padding: 10px;
}

.halfWidth {
  width: 60%;
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

.short-enter-to,
.short-leave-from {
  width: 60%;
}

.short-enter-active,
.short-leave-active {
  transition: all 1s ease-in-out;
}

/* ------------ Media ------------ */

@media screen and (max-width: 1440px) {
  .halfWidth {
    width: 50%;
  }
  .short-enter-to,
  .short-leave-from {
    width: 50%;
  }
}

@media screen and (max-width: 1200px) {
  .halfWidth {
    width: 30%;
  }
  .short-enter-to,
  .short-leave-from {
    width: 30%;
  }
}

@media screen and (max-width: 1070px) {
  .note {
    width: 180px;
    aspect-ratio: 1/0.4;
    grid-template-columns: auto;
    grid-template-rows: 1.5em 1.4em;
  }

  .note__title {
    width: 5em;
    font-size: 18px;
  }
  .note__body {
    display: none;
  }
  .note__btn {
    top: 10px;
  }
}
</style>