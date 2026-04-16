<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

// Данные для статистики
const postsCount = ref(0)
const usersCount = ref(0)
const recentPosts = ref([])

// Загрузка постов
const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        postsCount.value = data.length
        recentPosts.value = data.slice(0, 5) // последние 5 постов
    } catch (err) {
        console.error('Ошибка загрузки постов:', err)
    }
}

// Загрузка пользователей
const fetchUsers = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        usersCount.value = data.length
    } catch (err) {
        console.error('Ошибка загрузки пользователей:', err)
    }
}

// Живая дата и время
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
    fetchPosts()
    fetchUsers()
    updateDateTime()
    intervalId = setInterval(updateDateTime, 1000)
})

// Очистка интервала при размонтировании
import { onUnmounted } from 'vue'
onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})
</script>

<template>
    <div class="home-page">
        <!-- Приветственный баннер -->
        <section class="hero">
            <h1>Привет! 👋</h1>
            <p class="role">Frontend Developer</p>
            <p>Добро пожаловать в моё Vue-приложение-портфолио</p>
            <p class="date-time">{{ currentDateTime }}</p>
        </section>

        <!-- Статистика -->
        <section class="stats">
            <div class="stat-card">
                <div class="stat-value">{{ postsCount }}</div>
                <div class="stat-label">Всего постов</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{{ usersCount }}</div>
                <div class="stat-label">Пользователей</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{{ themeStore.isDark ? '🌙' : '☀️' }}</div>
                <div class="stat-label">Текущая тема</div>
            </div>
        </section>

        <!-- Быстрые ссылки -->
        <section class="quick-links">
            <h2>🚀 Быстрый доступ</h2>
            <div class="links-grid">
                <router-link to="/posts" class="quick-link">
                    📝 Смотреть все посты
                </router-link>
                <router-link to="/users" class="quick-link">
                    👥 Смотреть пользователей
                </router-link>
                <router-link to="/add-post" class="quick-link">
                    ➕ Добавить пост
                </router-link>
                <router-link to="/sandbox" class="quick-link">
                    🎮 Песочница
                </router-link>
            </div>
        </section>

        <!-- Последние посты -->
        <section class="recent-posts">
            <h2>📰 Последние посты</h2>
            <div v-if="recentPosts.length === 0" class="loading">
                Загрузка постов...
            </div>
            <div v-else class="posts-grid">
                <div v-for="post in recentPosts" :key="post.id" class="post-preview">
                    <h3>{{ post.title }}</h3>
                    <p>{{ post.body.slice(0, 100) }}...</p>
                    <router-link :to="{ name: 'post', params: { id: post.id } }">
                        Читать далее →
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.home-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.hero {
    text-align: center;
    padding: 40px 20px;
    background: var(--card-bg);
    border-radius: 16px;
    margin-bottom: 30px;

    h1 {
        font-size: 2.5rem;
        margin-bottom: 10px;
        color: var(--text-color);
    }

    .role {
        font-size: 1.2rem;
        color: #42b983;
        margin-bottom: 15px;
    }

    .date-time {
        margin-top: 15px;
        font-size: 0.9rem;
        color: var(--text-light);
    }
}

.stats {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
}

.stat-card {
    background: var(--card-bg);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    min-width: 120px;
    border: 1px solid var(--card-border);

    .stat-value {
        font-size: 2rem;
        font-weight: bold;
        color: #42b983;
    }

    .stat-label {
        font-size: 0.9rem;
        color: var(--text-light);
        margin-top: 8px;
    }
}

.quick-links {
    margin-bottom: 40px;

    h2 {
        color: var(--text-color);
        margin-bottom: 20px;
    }
}

.links-grid {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.quick-link {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    color: var(--text-color);
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        border-color: #42b983;
    }
}

.recent-posts {
    h2 {
        color: var(--text-color);
        margin-bottom: 20px;
    }
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.post-preview {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    h3 {
        margin: 0 0 10px 0;
        font-size: 1.1rem;
        color: var(--text-color);
    }

    p {
        color: var(--text-light);
        line-height: 1.4;
        margin-bottom: 12px;
    }

    a {
        color: #42b983;
        text-decoration: none;
        font-size: 0.9rem;

        &:hover {
            text-decoration: underline;
        }
    }
}

.loading {
    text-align: center;
    padding: 40px;
    color: var(--text-light);
}
</style>