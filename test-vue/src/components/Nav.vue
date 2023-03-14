<script setup>
const props = defineProps({
  searchString: String,
  viewResolver: Object,
});
const emit = defineEmits([
  "transfer-data:search",
  "transfer-event:newNote",
  "transfer-event:toogleAssideBar",
]);
function toogleAsside() {
  emit("transfer-event:toogleAssideBar");
}
function newNote() {
  emit("transfer-event:newNote");
}
function search(request) {
  emit("transfer-data:search", request);
}
</script>

<template>
  <nav class="nav-bar">
    <button
      @click="newNote"
      class="btn nav-bar__item nav-bar__item_btn nav-bar__item_btn-new"
    >
      <img class="nav-bar__image" src="plus.svg" alt="create" />
      <span
        v-if="viewResolver.width > 824"
        class="nav-bar__active-element nav-bar__active-element_sign"
        >Создать</span
      >
    </button>
    <div class="nav-bar__item nav-bar__item_search">
      <img class="nav-bar__image" src="lens.svg" alt="lens" />
      <input
        :value="searchString"
        @input="(event) => search(event.target.value)"
        class="nav-bar__active-element nav-bar__active-element_input"
        type="text"
        placeholder="Поиск..."
      />
    </div>
  </nav>
</template>

<style scoped>
.nav-bar {
  grid-area: B;
  background: rgb(16, 16, 16);
  display: flex;
  align-items: center;
}

.nav-bar__item {
  height: 35px;
  width: 35px;
  margin-right: 5px;
  border-radius: 1em;
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

.nav-bar__item_btn:hover {
  border-color: #02e02a;
}

.nav-bar__item_btn-new:hover {
  width: 110px;
}

.nav-bar__item_btn:hover .nav-bar__image {
  filter: invert(76%) sepia(33%) saturate(5763%) hue-rotate(117deg)
    brightness(220%) contrast(102%);
}

.nav-bar__item_btn-new:hover .nav-bar__active-element_sign {
  color: #02e02a;
}

.nav-bar__item_search:hover,
.nav-bar__item_search:focus-within {
  background: rgba(255, 255, 255, 0.15);
  width: 358px;
}

.nav-bar__image {
  height: 100%;
  border-radius: 50%;
  z-index: 999;
  transition: all 0.35s ease;
}

.nav-bar__active-element {
  color: rgba(255, 255, 255, 1);
  background: transparent;
  transition: all 0.35s ease;
}

.nav-bar__active-element_input {
  width: 310px;
}

/* ------------ Media ------------ */

@media (max-width: 824px) {
  .nav-bar {
    margin-left: -1px;
  }
  .nav-bar__item {
    height: 50px;
    width: 50px;
    margin: 0;
    margin-left: 10px;
    border-radius: 2em;
    font-size: 24px;
    line-height: 1.1em;
  }
  .nav-bar__item_btn-new:hover {
    width: 50px;
  }
  .nav-bar__item_search:hover,
  .nav-bar__item_search:focus-within {
    width: calc(100vw - 190px);
  }
  .nav-bar__active-element_input {
    width: calc(100% - 46px - 20px);
  }
}

@media (max-width: 576px) {
  .nav-bar__item_search:hover,
  .nav-bar__item_search:focus-within {
    background: none;
    width: 50px;
  }
  .nav-bar__active-element_input {
    position: absolute;
    width: 75vw;
    width: 7vw;
    left: 135px;
    bottom: 7px;
    border-radius: 1em;
    background: rgb(16, 16, 16);
    padding: 0.3em 20px;
    transform: translateY(0);
    opacity: 0;
    transition: opacity 150ms ease-in-out 0.2s,
      transform width 0.35s ease-in-out;
    z-index: 999;
  }
  .nav-bar__item_search:hover .nav-bar__active-element_input {
    transform: translateY(-130%);
    opacity: 1;
    width: 75vw;
    left: calc((100vw - (75vw + 1em)) / 2);
  }
}
</style>