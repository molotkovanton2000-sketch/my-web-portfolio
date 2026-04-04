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
            <button class="button" @click="addTodo">➕ Добавить</button>
        </div>
        <ul>
            <li :class="{ completed : todo.done}" v-for="todo in todos" :key="todo.id">
                <input type="checkbox" :checked="todo.done" @change="todo.done = !todo.done" />
                {{ todo.text }}
                <button @click="removeTodo(todo.id)">❌</button>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.completed{
    text-decoration: line-through;
    color: #95a5a6;
}

.add-form{
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    input{
        flex: 1;
        padding: 19px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;

        &:focus{
            outline:none;
            border-color: #42b983;
        }
    }
}
.button{
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border:none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #359268;
    }
}
</style>