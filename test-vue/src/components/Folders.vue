<script setup>
import { getNotesCounter } from "../stores/NoteLocalStore";
const props = defineProps({
  categories: Array,
});
</script>

<template>
  <div class="folders side-bar__panel">
    <button
      @click="$emit('transfer-category', '')"
      class="btn folders__btn folders__btn_first"
      v-if="categories.length > 0"
    >
      <div
        class="folders__color-indicator folders__color-indicator_reset"
      ></div>
      <span class="folders__sign folders__sign_bold">Все заметки</span>
      <div class="folders__sign folders__sign_bold">
        {{ getNotesCounter }}
      </div>
    </button>
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('transfer-category', category.name)"
      class="btn folders__btn"
    >
      <div
        class="folders__color-indicator"
        :style="{ background: category.color }"
      ></div>
      <span class="folders__sign folders__sign_padding-right">{{ category.name }}</span>
      <div class="folders__sign">
        {{ category.count }}
      </div>
    </button>
  </div>
</template>

<style scoped>
.folders {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: overlay;
}

.folders__btn {
  margin-top: 0.3em;
  padding: 0.3em 15px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  justify-content: space-between;
  position: relative;
}

.folders__btn_first {
  margin-top: 10px;
}

.folders__color-indicator {
  position: absolute;
  opacity: 0.7;
  top: 0;
  left: 0;
  height: 100%;
  width: 10px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  transition: width 0.35s ease-in-out;
}

.folders__color-indicator_reset {
  background: rgba(0, 0, 0, 0.7);
}

.folders__btn:hover .folders__color-indicator {
  width: 100%;
  border-radius: 4px;
}

.folders__sign {
  z-index: 999;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.folders__sign_padding-right {
  padding-right: 5px;
}

.folders__sign_bold {
  font-weight: bold;
}
</style>