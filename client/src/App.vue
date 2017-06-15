<template>
  <div id="app">
    <app-nav></app-nav>
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppNav from './components/template/AppNav'

export default {
  name: 'app',
  components: {
    AppNav
  }
}
</script>

<style>
</style>
