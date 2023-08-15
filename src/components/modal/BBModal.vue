<template>
    <transition name="modal" appear>
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-2xl w-full sm:max-w-5xl">
          <slot></slot>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'BBModal'
  }
  </script>
  
  <style scoped>
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-enter, .modal-leave-to {
    opacity: 0;
  }
  </style>
  