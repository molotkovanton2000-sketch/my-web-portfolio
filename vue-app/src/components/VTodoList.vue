<script setup>
import { ref } from 'vue'

const todos = ref([
    { id: 1, text: 'Изучить Vue', done: true },
    { id: 2, text: 'Сделать счётчик', done: true },
    { id: 3, text: 'Сделать Todolist', done: false }
])

const newTodoText = ref('')

let nextId = 4

const addTodo = () => {
    if (newTodoText.value.trim() === '') return

    todos.value.push({
        id: nextId++,
        text: newTodoText.value,
        done: false
    })
    newTodoText.value = ''
}

const removeTodo = (id) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
}

const clearCompleted = () => {
    todos.value = todos.value.filter(todo => todo.done === false)
}

const markAllCompleted = () => {
    todos.value.forEach((todo) => {
        todo.done = true
    })
}

const completedFirst = () => {
    todos.value.sort((a, b) => b.done - a.done)
}

const uncompletedFirst = () => {
    todos.value.sort((a, b) => a.done - b.done)
}

const taskTemplates = [
    'Купить продукты',
    'Позвонить маме',
    'Сделать зарядку',
    'Прочитать книгу',
    'Выучить новую фишку JS',
    'Написать пост в блог',
    'Разобрать почту',
    'Погулять на свежем воздухе'
]

const addRandomTodo = () => {
    const randomIndex = Math.floor(Math.random() * taskTemplates.length)
    const randomText = taskTemplates[randomIndex]
    
    todos.value.push({
        id: nextId++,
        text: randomText,
        done: false
    })
}

</script>

<template>
    <div>
        <h1>Здесь будет тудулист</h1>
        <div class="add-form">
            <input
                type="text"
                v-model="newTodoText"
                placeholder="Что нужно сделать?"
                @keyup.enter="addTodo"
            />
            <button class="action-btn" @click="addTodo">➕ Добавить</button>
        </div>
        <div v-if="todos.length === 0">🎉 Поздравляю! Все задачи выполнены.</div>
        <ul v-else>
            <li :class="{ completed : todo.done}" v-for="todo in todos" :key="todo.id">
                <input type="checkbox" :checked="todo.done" @change="todo.done = !todo.done" />
                {{ todo.text }}
                <button @click="removeTodo(todo.id)">❌</button>
            </li>
        </ul>
        <p>Выполнено: {{ todos.filter(todo => todo.done).length }}  из {{ todos.length }}</p>
        <button class="action-btn clearCompleted" @click="clearCompleted">Очистить список от выполненных задач</button>
        <button class="action-btn markAllCompleted" @click="markAllCompleted">✔ Отметить всё</button>
        <button class="action-btn completedFirst" @click="completedFirst">Сначала выполненные</button>
        <button class="action-btn uncompletedFirst" @click="uncompletedFirst">Сначала невыполненные</button>
        <button class="action-btn random-todo" @click="addRandomTodo">✨ Случайная задача</button>
    </div>
    
</template>

<style lang="scss" scoped>
.completed {
    text-decoration: line-through;
    color: #95a5a6;
}

.add-form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    input {
        flex: 1;
        padding: 10px;
        border: 1px solid var(--input-border);
        border-radius: 8px;
        font-size: 16px;
        background-color: var(--input-bg);
        color: var(--text-color);

        &:focus {
            outline: none;
            border-color: #42b983;
        }
    }
}

// Общий класс для всех кнопок действий
.action-btn {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
}

// Кнопка добавления
.add-form .action-btn {
    background-color: #42b983;
    color: white;

    &:hover {
        background-color: #359268;
    }
}

// Кнопка "Очистить выполненные"
.clearCompleted {
    background-color: #e74c3c;
    color: white;

    &:hover {
        background-color: #c0392b;
    }
}

// Кнопка "Отметить всё"
.markAllCompleted {
    background-color: #3498db;
    color: white;

    &:hover {
        background-color: #2980b9;
    }
}

// Кнопки удаления в списке
li button {
    background-color: transparent;
    padding: 5px 10px;
    font-size: 14px;
    opacity: 0.6;
    transform: none;

    &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.05);
        transform: none;
    }
}

.completedFirst {
    background-color: #9b59b6;
    color: white;

    &:hover {
        background-color: #8e44ad;
    }
}

.uncompletedFirst {
    background-color: #f39c12;
    color: white;

    &:hover {
        background-color: #e67e22;
    }
}

.random-todo {
    background-color: #e67e22;
    color: white;

    &:hover {
        background-color: #d35400;
    }
}
</style>