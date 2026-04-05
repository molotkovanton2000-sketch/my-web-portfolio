<script setup>
import {ref, onMounted} from "vue"

const users = ref([])
const loading = ref(true)
const error = ref(null)

const fetchUsers = async () => {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok){
            throw new Error(`Ошибка HTTP запроса: ${response.status}`)
        }

        users.value = await response.json()
    } catch (err){
        error.value = err.message
        console.error('Ошибка при загрузке пользователей:', err.message)
    } finally{
        loading.value = false
    }
}

onMounted(() => {
    fetchUsers()
})

</script>

<template>
    <div class="users-container">
        <div v-if="loading">
            <p class="message-loading">Загрузка</p>
        </div>
        <div v-else-if="error">
            <p class="error-message">Ошибка: {{ error }}</p>
        </div>
        <div v-else-if="users.length === 0">
            <p class="no-users">Нет пользователей</p>
        </div>
        <div v-else>
            <h2>Список пользователей</h2>
            <ul class="users-list">
                <li v-for="user in users" :key="user.id" class="user-item">
                    <h3>Name: {{ user.name }}</h3>
                    <p>✉️ Email: {{ user.email }}</p>
                    <p>📞 Phone: {{ user.phone }}</p>
                    <p>🌐 Website: {{ user.website }}</p>
                    <p>🏢 Company: {{ user.company.name }}</p>                  
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.users-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.error-message {
    color: #e74c3c;
    background-color: #fdecea;
    padding: 10px;
    border-radius: 8px;
    border-left: 4px solid #e74c3c;
}

.users-list {
    list-style: none;
    padding: 0;
}

.user-item {
    background: #f9f9f9;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #eee;
    transition: all 0.2s ease;

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h3 {
        margin: 0 0 10px 0;
        color: #2c3e50;
    }

    p {
        margin: 0;
        color: #34495e;
        line-height: 1.5;
    }
}
.no-users{
    color: #000000;
    background-color: #fdecea;
    padding: 10px;
    border-radius: 8px;
    border-left: 4px solid #000000;
}
.message-loading{
    color: #000000;
    background-color: #fdecea;
    padding: 10px;
    border-radius: 8px;
    border-left: 4px solid #000000;
}
</style>