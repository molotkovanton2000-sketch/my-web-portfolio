<script setup>
import {ref, onMounted} from "vue"

const posts = ref([])
const loading = ref(true)
const error = ref(null)

const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`)
        }
        
        posts.value = await response.json()
    } catch (err) {
        error.value = err.message
        console.error('Что-то пошло не так:', err.message)
    } finally {
        loading.value = false
    }
}

onMounted (() => {
    fetchPosts()
})

</script>

<template>
    <div class="posts-container">
        <div v-if="loading">
            <p>⏳ Загрузка постов...</p>
        </div>
        <div v-else-if="error">
            <p class="error-message">❌ Ошибка: {{ error }}</p>
        </div>
        <div v-else>
            <h2>Список постов</h2>
            <ul class="posts-list">
                <li v-for="post in posts" :key="post.id" class="post-item">
                    <h3>{{ post.title }}</h3>
                    <p>{{ post.body }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.posts-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.error-message {
    color: #e74c3c;
    background-color: #fdecea;
    padding: 10px;
    border-radius: 8px;
    border-left: 4px solid #e74c3c;
}

.posts-list {
    list-style: none;
    padding: 0;
}

.post-item {
    background: #f9f9f9;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #eee;
    transition: all 0.2s ease;

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h3 {
        margin: 0 0 10px 0;
        color: #2c3e50;
    }

    p {
        margin: 0;
        color: #34495e;
        line-height: 1.5;
    }
}
</style>