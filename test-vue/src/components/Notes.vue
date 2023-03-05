<script setup>
const props = defineProps({
  notes: Array,
})
</script>

<template>
  <div class="notes-list">
    <div
      class="note"
      v-for="note of notes"
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
      <div class="note__panel">
        <p class="note__timestamp">{{ note.timestamp }}</p>
        <button
          class="btn note__btn"
          @click.stop="
            $emit('deleteClick', {
              target: note,
              msg: `Вы действительно хотите удалить заметку?`,
            })
          "
        ></button>
      </div>
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
}

.note:hover {
  box-shadow: 0px 7px 15px -2px rgb(64, 64, 64);
  transform: translate(0, -5px);
}

.note:active {
  box-shadow: 0px 5px 7px -1px rgb(64, 64, 64);
  transform: translate(0);
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

.note__panel {
  display: flex;
  justify-content: space-between;
}

.note__btn {
  width: 24px;
  height: 24px;
  border-radius: 10%;
  background: url("trash-bin.ico") no-repeat center / 70%;
}

.note__btn:hover {
  background: url("trash-bin.ico") no-repeat center center / 70%,
    rgba(255, 45, 45, 0.7);
}
</style>