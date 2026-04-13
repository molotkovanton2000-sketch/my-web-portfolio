<script setup>
import VCounter from './VCounter.vue';
import VTodoList from './VTodoList.vue';

import { ref, onMounted, onUnmounted } from 'vue'

const currentDateTime = ref('')
let intervalId = null

const updateDateTime = () => {
    const now = new Date()
    currentDateTime.value = now.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}

onMounted(() => {
    updateDateTime()
    intervalId = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId)
    }
}) 
</script>
<template>
    <div class="sandbox-container">
        <VCounter></VCounter>
        <VTodoList></VTodoList>
        <div class="datetime-card">
            <h3>📅 Текущая дата и время</h3>
            <p class="datetime">{{ currentDateTime }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sandbox-container {
    background-color: var(--bg-color);
    color: var(--text-color);
    min-height: 100vh;
}

.datetime-card {
    background: var(--card-bg);
    padding: 20px;
    border-radius: 12px;
    margin-top: 30px;
    text-align: center;
    border: 1px solid var(--card-border);
}

.datetime {
    font-size: 18px;
    font-weight: bold;
    color: var(--text-color);
}
</style>