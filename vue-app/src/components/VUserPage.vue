<script setup>
import {ref, onMounted, toRaw} from "vue"
import { useRoute } from "vue-router";

const route = useRoute()

const user = ref(null)
const loading = ref(true)
const postsUserLoading = ref(true)
const error = ref(null)
const posts = ref([])

const fetchUser = async () => {
    try{
        const userId = route.params.id

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)

        if (!response.ok){
            throw new Error(`Ошибка загрузки данных пользователя c id:${userId} `)
        }

        user.value = await response.json()
        await fetchPostsUser()
    }
    catch(err){
        error.value = err.message
        console.error('Ошибка загрузки данных пользователя:', err.message)
    }
    finally{
        loading.value = false
    }
}

const fetchPostsUser = async () => {
    try{
        const userId = route.params.id

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)

        if (!response.ok){
            throw new Error(`Ошибка загрузки постов пользователя с id:${userId}`)
        }

        posts.value = await response.json()
    }
    catch(err){
        console.error('Ошибка постов:', err.message)
    }
    finally{
        postsUserLoading.value = false
    }
}

onMounted(() => {
    fetchUser()
})
</script>
<template>
    <div class="user-page">
        <button class="back-btn" @click="$router.back()">← Назад к списку</button>

        <!-- Состояние загрузки -->
        <div v-if="loading">
            <p>⏳ Загрузка данных пользователя...</p>
        </div>

        <!-- Состояние ошибки -->
        <div v-else-if="error">
            <p class="error">❌ {{ error }}</p>
        </div>

        <!-- Данные загружены -->
        <div v-else-if="user">
            <!-- Информация о пользователе -->
            <div class="user-info">
                <h1>{{ user.name }}</h1>
                <p>✉️ Email: {{ user.email }}</p>
                <p>📞 Phone: {{ user.phone }}</p>
                <p>🌐 Website: {{ user.website }}</p>
                <p>🏢 Company: {{ user.company.name }}</p>
            </div>

            <!-- Посты пользователя -->
            <div class="user-posts">
                <h2>Посты пользователя</h2>
                
                <div v-if="postsUserLoading">
                    <p>⏳ Загрузка постов...</p>
                </div>
                <div v-else-if="posts.length === 0">
                    <p>📝 У пользователя нет постов</p>
                </div>
                <div v-else>
                    <div v-for="post in posts" :key="post.id" class="post-card">
                        <h3>{{ post.title }}</h3>
                        <p>{{ post.body }}</p>
                        <router-link :to="{ name: 'post', params: { id: post.id } }">
                            Читать далее →
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.user-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
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

.error {
    color: #e74c3c;
}

.user-info {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 30px;
    border: 1px solid #eee;
}

.user-info h1 {
    margin: 0 0 10px 0;
    color: #2c3e50;
}

.user-info p {
    margin: 8px 0;
    color: #34495e;
}

.user-posts h2 {
    margin-bottom: 20px;
    color: #2c3e50;
}

.post-card {
    background: white;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #eee;
    transition: all 0.2s ease;
}

.post-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-card h3 {
    margin: 0 0 8px 0;
    color: #2c3e50;
}

.post-card p {
    margin: 0 0 10px 0;
    color: #34495e;
    line-height: 1.4;
}

.post-card a {
    color: #42b983;
    text-decoration: none;
    font-size: 14px;
}

.post-card a:hover {
    text-decoration: underline;
}
</style>