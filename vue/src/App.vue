<template>
  <div id="root">
    <router-view />
    <modal v-if="showModal" @close="closeModal(false, {})">
      <component :is="modalData.component" v-bind="modalData.properties" @close="closeModal"></component>
    </modal>
  </div>
</template>

<script>
import { EventBus } from "./event-bus/event-bus.js";

import Modal from "./components/modals/Modal";

import Button from "./components/shared/Button";
export default {
  data() {
    return {
      showModal: false,
      modalData: null
    };
  },
  mounted() {
    EventBus.$on("ShowModal", this.showModalComponent);
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" }); 
    },
    showModalComponent(modalData) {
      this.showModal = true;
      this.modalData = modalData;
    },
    closeModal(dialogResult, result) {
      this.showModal = false;
      if (!this.modalData.callback) {
        return;
      }

      this.modalData.callback(dialogResult, result);
    }
  },
  beforeDestroy() {
    EventBus.$off("ShowModal", this.showModalComponent);
  },
  components: {
    Modal,
    EventBus,
    Button
  }
};
</script>
<style lang="scss">
#root {
  background-color: $background;
  display: flex;
  flex-direction: column;
}

.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}
</style>
