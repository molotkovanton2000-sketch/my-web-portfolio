<script setup>
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
</script>

<template>
    <div class="app" :class="{ dark: themeStore.isDark }">
        <!-- Навигация -->
        <nav class="navbar">
            <router-link to="/" class="nav-link">Главная</router-link>
            <router-link to="/posts" class="nav-link">Посты</router-link>
            <router-link to="/add-post" class="nav-link">➕ Добавить пост</router-link>
            <router-link to="/users" class="nav-link">Пользователи</router-link>
            <router-link to="/about" class="nav-link">О проекте</router-link>
            <router-link to="/sandbox" class="nav-link">Песочница</router-link>
            <button @click="themeStore.toggleTheme" class="theme-toggle">
                {{ themeStore.isDark ? '☀️' : '🌙' }}
            </button>
        </nav>

        <!-- Здесь будет отображаться текущая страница -->
        <main class="main-content">
            <router-view />
        </main>
    </div>
</template>

<style scoped>
.app {
    min-height: 100vh;
    background-color: #f5f5f5;
}

.navbar {
    background-color: #2c3e50;
    padding: 15px 20px;
    display: flex;
    gap: 20px;
    justify-content: center;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #34495e;
    }
}

/* Активная ссылка (подсветка) */
.router-link-active {
    background-color: #42b983;
}

.main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Стили для тёмной темы */
.app.dark {
    background-color: #1a1a2e;
}

.app.dark .navbar {
    background-color: #16213e;
}

.app.dark .nav-link {
    color: #e0e0e0;
}

.app.dark .nav-link:hover {
    background-color: #1f3460;
}

.app.dark .router-link-active {
    background-color: #42b983;
}

.theme-toggle {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
}

.theme-toggle:hover {
    background-color: #34495e;
}
</style>