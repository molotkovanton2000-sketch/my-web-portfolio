<script setup>
const projectStartDate = 'Апрель 2026'
const techStack = ['Vue 3', 'Vue Router', 'Pinia', 'SCSS', 'Vite', 'JSONPlaceholder API']
const lastUpdated = new Date().toLocaleDateString('ru-RU')
const components = [
    { name: 'VHomePage', description: 'Главная страница', date: '04.04.2026' },
    { name: 'VPostsList', description: 'Список постов (GET-запросы)', date: '05.04.2026' },
    { name: 'VPostPage', description: 'Страница поста + комментарии', date: '06.04.2026' },
    { name: 'VUsersList', description: 'Список пользователей (GET-запросы)', date: '05.04.2026' },
    { name: 'VUserPage', description: 'Страница пользователя + его посты', date: '06.04.2026' },
    { name: 'VCounter', description: 'Счётчик + случайное число', date: '03.04.2026' },
    { name: 'VTodoList', description: 'Список задач + случайная задача', date: '04.04.2026' },
    { name: 'VSandboxPage', description: 'Песочница (счётчик + тудулист + дата/время)', date: '05.04.2026' },
    { name: 'VAddPostPage', description: 'Форма добавления поста (POST-запросы)', date: '08.04.2026' },
    { name: 'Theme Store (Pinia)', description: 'Глобальное хранилище темы (тёмная/светлая)', date: '13.04.2026' }
]
</script>

<template>
    <div class="about-container">
        <h1>О проекте</h1>
        
        <section class="about-section">
            <h2>📖 Описание</h2>
            <p>
                Это учебное Vue-приложение, созданное для портфолио. 
                Оно демонстрирует работу с API, маршрутизацию, 
                реактивные компоненты, глобальное состояние (Pinia) и адаптивный дизайн.
            </p>
        </section>

        <section class="about-section">
            <h2>🛠 Технологии</h2>
            <ul class="tech-list">
                <li v-for="tech in techStack" :key="tech">
                    {{ tech }}
                </li>
            </ul>
        </section>

        <section class="about-section">
            <h2>📅 История проекта</h2>
            <p><strong>Начало работы:</strong> {{ projectStartDate }}</p>
            <table class="components-table">
                <thead>
                    <tr>
                        <th>Компонент</th>
                        <th>Описание</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comp in components" :key="comp.name">
                        <td><code>{{ comp.name }}</code></td>
                        <td>{{ comp.description }}</td>
                        <td>{{ comp.date }}</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="about-section">
            <h2>✨ JS-фишки в песочнице</h2>
            <ul>
                <li>🎲 Случайное число — кнопка Random в счётчике</li>
                <li>📅 Живые дата и время — обновляются каждую секунду</li>
                <li>✨ Случайная задача — добавляет случайную задачу в тудулист</li>
                <li>🌙 Тёмная тема — переключается кнопкой в навигации, сохраняется в localStorage</li>
            </ul>
        </section>

        <section class="about-section">
            <h2>🔗 Ссылки</h2>
            <ul>
                <li>
                    <a href="https://github.com/molotkovanton2000-sketch/my-web-portfolio" target="_blank">
                        GitHub репозиторий
                    </a>
                </li>
                <li>
                    <a href="https://my-web-portfolio-sand.vercel.app/" target="_blank">
                        Живой сайт (Vercel)
                    </a>
                </li>
            </ul>
            <p class="updated">📅 Последнее обновление: {{ lastUpdated }}</p>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.about-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--bg-color);
    color: var(--text-color);
}

.about-section {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--card-border);

    h2 {
        color: var(--text-color);
        margin-bottom: 15px;
    }

    p, li {
        color: var(--text-light);
        line-height: 1.5;
    }
}

.tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    list-style: none;
    padding: 0;

    li {
        background: #42b98320;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 14px;
        color: var(--text-color);
    }
}

.components-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;

    th, td {
        text-align: left;
        padding: 10px;
        border-bottom: 1px solid var(--card-border);
    }

    th {
        background-color: var(--card-bg);
        color: var(--text-color);
    }

    code {
        background: var(--input-bg);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 13px;
        color: var(--text-color);
    }
}

a {
    color: #42b983;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}

.updated {
    margin-top: 20px;
    color: var(--text-light);
}
</style>