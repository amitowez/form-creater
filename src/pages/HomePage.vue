<template>
  <div>
    <h1>Генератор форм</h1>
    <nav>
      <router-link to="/simple">Простая форма</router-link> |
      <router-link to="/complex">Сложная форма</router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
nav {
  margin-top: 20px;
  a {
    color: #42b983;
    text-decoration: none;
    &.router-link-exact-active {
      color: #2c3e50;
    }
  }
}
</style>