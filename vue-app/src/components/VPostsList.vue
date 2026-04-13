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
                    <router-link :to="{ name:'post', params: {id: post.id} }"> 
                        <h3 >{{ post.title }}</h3>
                    </router-link>
                    <p>{{ post.body }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.post-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--bg-color);
    color: var(--text-color);
}

.error {
    color: #e74c3c;
}

.comments-section {
    margin-top: 40px;
    border-top: 1px solid var(--card-border);
    padding-top: 20px;
}

.comment {
    background: var(--card-bg);
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 8px;
    border-left: 3px solid #42b983;
}

.comment strong {
    display: block;
    margin-bottom: 4px;
    color: var(--text-color);
}

.comment small {
    display: block;
    margin-bottom: 8px;
    color: var(--text-light);
    font-size: 12px;
}

.comment p {
    margin: 0;
    color: var(--text-light);
}

.back-btn {
    background: none;
    border: none;
    color: #42b983;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 0;
}

.back-btn:hover {
    text-decoration: underline;
}
</style>