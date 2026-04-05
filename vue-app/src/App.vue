<script setup>
/*
import VCounter from './components/VCounter.vue'
import VTodoList from './components/VTodoList.vue'
import VPostsList from './components/VPostsList.vue'
*/
import VUsersList from './components/VUsersList.vue'
</script>

<template>
  <header>
    
  </header>

  <main>
    <VCounter />
    <VTodoList/>
    <VPostsList/>
    <VUsersList/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>