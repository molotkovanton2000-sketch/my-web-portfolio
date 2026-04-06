<script setup>
</script>

<template>
    <div class="app">
        <!-- Навигация -->
        <nav class="navbar">
            <router-link to="/" class="nav-link">Главная</router-link>
            <router-link to="/posts" class="nav-link">Посты</router-link>
            <router-link to="/users" class="nav-link">Пользователи</router-link>
            <router-link to="/about" class="nav-link">О проекте</router-link>
            <router-link to="/sandbox" class="nav-link">Песочница</router-link>
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
</style>