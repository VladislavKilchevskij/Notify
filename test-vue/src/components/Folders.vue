<script setup>
import { getNotesCounter } from "../stores/NoteLocalStore";
const props = defineProps({
  categories: Array,
  viewResolver: Object,
});
const emit = defineEmits(["transfer-data:categoryName"]);
function selectCategory(name) {
  emit("transfer-data:categoryName", name);
}
</script>

<template>
  <div class="dropdown">
    <div v-show="viewResolver.width <= 824" class="dropdown__btn">
      <img class="dropdown__image" src="arrow-down.svg" alt="arrow" />
    </div>
    <div class="folders">
      <button
        v-if="categories.length > 0"
        @click="selectCategory('')"
        class="btn folders__btn folders__btn_reset"
      >
        <div
          class="folders__color-indicator folders__color-indicator_reset"
        ></div>
        <span class="folders__sign folders__sign_bold">Все</span>
        <div class="folders__sign folders__sign_bold">
          {{ getNotesCounter }}
        </div>
      </button>
      <button
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category.name)"
        class="btn folders__btn"
      >
        <div
          class="folders__color-indicator"
          :style="{ background: category.color }"
        ></div>
        <span class="folders__sign folders__sign_padding-right">{{
          category.name
        }}</span>
        <div class="folders__sign">
          {{ category.count }}
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  grid-area: C;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.85) 0%
    ),
    url("side-bar-backgr.jpg") no-repeat left / cover;
  padding: 0 8px;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(255, 255, 255, 0.45);
}
.folders {
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

.folders__btn_reset {
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

/* ------------ Media ------------ */

@media (max-width: 992px) {
  .folders__sign {
    font-size: 16px;
  }
}

@media (max-width: 824px) {
  .dropdown {
    padding: 0;
    background: rgb(16, 16, 16);
    display: flex;
    align-items: center;
    border: none;
  }
  .dropdown__btn {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: none;
    border: 2px solid rgba(255, 255, 255, 0.7);
    font-size: 18px;
    line-height: 1.1em;
    display: flex;
    align-items: center;
    justify-content: start;
    overflow: hidden;
    transition: all 0.35s ease;
  }
  .dropdown__btn:hover {
    border: 2px solid #02e02a;
  }

  .dropdown__btn:hover .dropdown__image {
    filter: invert(76%) sepia(33%) saturate(5763%) hue-rotate(117deg)
      brightness(220%) contrast(102%);
  }
  .dropdown__image {
    height: 100%;
    border-radius: 50%;
  }
  .folders {
    display: none;
    position: absolute;
    top: 80px;
    left: 0;
    width: 200px;
  }
  .folders__btn {
    background: rgba(16, 16, 16, 0.7);
    width: 100%;
  }
  .folders__sign {
    font-size: 22px;
  }
  .dropdown:hover .folders {
    display: block;
  }
}

@media (max-width: 576px) {
  .dropdown {
    position: static;
  }
  .dropdown__btn {
    margin-left: 10px;
  }
  .dropdown__image {
    transform: rotate(-90deg);
    transition: all 0.35s ease-in-out
  }
  .dropdown:hover .folders {
    transform: translateX(1%);
    opacity: 1;
  }
  .dropdown:hover .dropdown__image {
    transform: rotate(90deg)
  }
  .folders {
    display: block;
    top: initial;
    bottom: 80px;
    width: 50vw;
    height: 55vh;
    padding-right: 10px;
    transform: translateX(-100%);
    opacity: 0;
    transition: 0.35s ease-in-out;
  }
  .folders__btn {
    padding: 0.5em 15px;
  }

}
</style>