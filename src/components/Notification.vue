<template>
    <transition name="fade">
      <div v-if="message" :class="['notification', { 'error': message.includes('Заполните') }]">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    message: string
  }>()
  </script>
  
  <style lang="scss" scoped>
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    &.error {
      background-color: #ff6347; 
    }
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>