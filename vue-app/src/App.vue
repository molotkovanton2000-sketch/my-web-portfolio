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

<style>
/* Светлая тема (по умолчанию) */
:root {
    --bg-color: #f5f5f5;
    --text-color: #2c3e50;
    --text-light: #34495e;
    --card-bg: #f9f9f9;
    --card-border: #eee;
    --navbar-bg: #2c3e50;
    --navbar-link-hover: #34495e;
    --input-bg: white;
    --input-border: #ddd;
    --success-bg: #e8f8f5;
    --error-bg: #fdecea;
}

/* Тёмная тема */
.app.dark {
    --bg-color: #1a1a2e;
    --text-color: #e0e0e0;
    --text-light: #b0b0b0;
    --card-bg: #16213e;
    --card-border: #1f3460;
    --navbar-bg: #0f3460;
    --navbar-link-hover: #1a4a8a;
    --input-bg: #0f3460;
    --input-border: #1f3460;
    --success-bg: #0a2a1a;
    --error-bg: #3a1a1a;
}
</style>

<style scoped>
.app {
    min-height: 100vh;
    background-color: var(--bg-color);
    color: var(--text-color);
}

.navbar {
    background-color: var(--navbar-bg);
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
}

.nav-link:hover {
    background-color: var(--navbar-link-hover);
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

.theme-toggle {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
    color: white;
}

.theme-toggle:hover {
    background-color: var(--navbar-link-hover);
}
</style>