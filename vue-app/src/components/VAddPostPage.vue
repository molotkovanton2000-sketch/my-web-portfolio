<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('')
const body = ref('')
const loading = ref(false)
const error = ref (null)
const success = ref(false)

const submitForm = async () => {
    loading.value = true
    error.value = null
    success.value = false

    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, 
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title.value,
                    body: body.value,
                    userId: 1
                })
            }
        )
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`)
        }

        const newPost = await response.json()
        console.log('Пост создан:', newPost)

        success.value = true

        title.value = ''
        body.value = ''

        setTimeout(() => {
            success.value = false
        }, 2000)
    } catch (err){
        error.value = err.message
        console.error('Ошибка:', err.message)
    }finally {
        loading.value = false
    }
}


</script>

<template>
    <div class="add-post-page">
        <h1>➕ Добавить пост</h1>
        
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="title">Заголовок</label>
                <input 
                    id="title"
                    type="text"
                    v-model="title"
                    required
                />
            </div>
            <div class="form-group" >
                <label for="body">Текст поста</label>
                <textarea
                    id="body"
                    v-model="body"
                    rows="6"
                    required
                ></textarea>
            </div>
            <button type="submit" :disabled="loading">
                {{ loading ? 'Отправка...' : 'Опубликовать' }}
            </button>
        </form>
        <div v-if="error" class="error">
            ❌ {{ error }}
        </div>
        <div v-if="success" class="success">
            ✅ Пост успешно создан!
        </div>
    </div>
</template>

<style scoped>
.add-post-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--bg-color);
    color: var(--text-color);
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: var(--text-color);
}

input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--input-border);
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;
    background-color: var(--input-bg);
    color: var(--text-color);
}

input:focus, textarea:focus {
    outline: none;
    border-color: #42b983;
}

button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #359268;
}

button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
}

.error {
    color: #e74c3c;
    background: var(--error-bg);
    padding: 10px;
    border-radius: 8px;
    margin-top: 20px;
}

.success {
    color: #27ae60;
    background: var(--success-bg);
    padding: 10px;
    border-radius: 8px;
    margin-top: 20px;
}
</style>