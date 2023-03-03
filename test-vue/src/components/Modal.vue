<script setup>
const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["closeModal"]);
function closeClick() {
  emit("closeModal");
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <button class="modal-mask" v-if="show" @click="closeClick">
        <div class="modal-container">
          <h4 class="modal-container__title">
            <slot name="header"></slot>
          </h4>
          <div class="modal-container__panel panel">
            <slot name="body"></slot>
            <button
              class="btn modal-container__btn modal-container__btn_close"
              @click.stop="closeClick"
            >
              Закрыть
            </button>
          </div>
        </div>
      </button>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  border-radius: 7px;
  background: rgb(255, 255, 255);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-container__title {
  font-size: 1.5em;
  margin: 20px 30px 10px;
}

.modal-container__panel {
  margin: 5% 0;
  display: flex;
  justify-content: center;
}

.modal-container__btn {
  padding: 2% 5% !important;
  border-radius: 5px !important;
}

.panel :slotted(.slot-btn) {
  padding: 2% 5%;
  border-radius: 5px;
  background: rgb(255, 126, 126);
}

.panel :slotted(.slot-btn):hover {
  background: rgb(255, 31, 31);
}

.modal-container__btn_close {
  margin-left: 3%;
  background: rgb(196, 196, 196);
}

.modal-container__btn_close:hover {
  background: rgb(110, 110, 110);
}
/* Transition component properties */

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.35s ease-in-out;
}
</style>