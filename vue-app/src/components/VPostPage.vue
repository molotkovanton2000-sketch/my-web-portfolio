<script setup>
import { ref, onMounted} from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

const post = ref(null)
const loading = ref(true)
const error = ref(null)
const comments = ref([])
const commentsLoading = ref(true)

const fetchPost = async () => {
    try{
        const postId = route.params.id

        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)

        if (!response.ok){
            throw new Error(`Пост с id ${postId} не найден`)
        }

        post.value = await response.json()
        await fetchComments()
    }
    catch (err){
        error.value = err.message
        console.error('Ошибка:', err.message)
    }
    finally {
        loading.value = false
    }
}

const fetchComments = async () => {
    try{
        const postId = route.params.id

        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        
        if (!response.ok){
            throw new Error(`Ошибка загрузки комментариев: ${response.status}`);            
        }
        
        comments.value = await response.json()
    }
    catch (err){
        console.error('Ошибка комментариев:', err.message)
        comments.value = []
    }
    finally{
        commentsLoading.value = false
    }
}

onMounted(() => {
    fetchPost()
})
</script>
<template>
    <div class="post-page">
        <div v-if="loading">
            <p>⏳ Загрузка поста...</p>
        </div>
        <div v-else-if="error">
            <p class="error">❌ {{ error }}</p>
        </div>
        <div v-else-if="post">
            <h1>{{ post.title }}</h1>
            <p>{{ post.body }}</p>
        </div>
        <div v-if="commentsLoading">
            <p>💬 Загрузка комментариев...</p>
        </div>
        <div v-else-if="comments.length === 0" class="comments-section">
            <p>💬 Нет комментариев</p>
        </div>
        <div v-else class="comments-section">
            <h3>Комментарии ({{ comments.length }})</h3>
            <div v-for="comment in comments" :key="comment.id" class="comment">
                <strong>{{ comment.name }}</strong>
                <small>{{ comment.email }}</small>
                <p>{{ comment.body }}</p>
            </div>
        </div>
        <button class="back-btn" @click="$router.back()">← Назад к списку</button>
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