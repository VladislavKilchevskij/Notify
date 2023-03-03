<script setup>
import { loadState, getNotes, deleteNote } from "../stores/NoteLocalStore";
loadState();
</script>

<template>
  <div class="notes-list">
    <div
      class="note"
      v-for="note of getNotes"
      :key="note.id"
      :note="note"
      @click="$emit('transferData:note', note), $emit('update:show')"
    >
      <h4 class="note__title">
        {{ note.title }}
      </h4>
      <p class="note__body">
        {{ note.body }}
      </p>
      <button
        class="btn note__btn note__btn_delete"
        @click.stop="
          $emit('deleteClick', {
            target: note,
            msg: `Вы действительно хотите удалить заметку ${note.title} ?`,
          })
        "
      ></button>
    </div>
  </div>
</template>

<style scoped>
.notes-list {
  height: 100%;
  width: 100%;
  min-width: 33%;
  display: flex;
  flex-wrap: wrap;
  overflow: overlay;
  align-content: start;
  padding: 10px;
  transition: all 0.35s ease-in-out;
}

.note {
  height: 200px;
  width: 225px;
  margin: 10px;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(214, 214, 214);
  box-shadow: 0px 5px 7px -1px rgb(64, 64, 64);
  color: rgb(44, 44, 44);
  position: relative;
  transition: all 0.35s ease;
}

.note:hover {
  box-shadow: 0px 7px 15px -2px rgb(64, 64, 64);
  transform: translate(0, -5px);
  cursor: pointer;
}

.note:active {
  box-shadow: 0px 5px 7px -1px rgb(64, 64, 64);
  transform: translate(0);
}

.note__title {
  position: absolute;
  top: 7%;
  left: 5%;
  width: 70%;
  margin: 0 auto 0 0;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note__body {
  position: absolute;
  top: 23%;
  left: 5%;
  height: 58%;
  width: 90%;
  display: flex;
  overflow: hidden;
}

.note__body::after {
  content: "";
  height: 100%;
  width: 100%;
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 0) 67%,
    rgba(255, 255, 255, 1) 100%
  );
}
.note__btn {
  position: absolute;
  border-style: none;
  width: 24px;
  height: 24px;
  border-radius: 10%;
  outline: none;
  align-self: flex-end;
}

.note__btn_delete {
  bottom: 7%;
  right: 5%;
  background: url("trash-bin.ico") no-repeat center / 70%;
}

.note__btn_delete:hover {
  background: url("trash-bin.ico") no-repeat center center / 70%,
    rgba(255, 45, 45, 0.7);
}

.note__btn_edit {
  top: 7%;
  right: 5%;
  background: url("edit.png") no-repeat center / 70%;
}

.note__btn_edit:hover {
  background: url("edit.png") no-repeat center center / 70%,
    rgba(72, 160, 238, 0.7);
}
</style>