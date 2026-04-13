import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    // Состояние (state)
    const isDark = ref(false)
    
    // Действия (actions)
    const toggleTheme = () => {
        isDark.value = !isDark.value
    }
    
    const setDark = () => {
        isDark.value = true
    }
    
    const setLight = () => {
        isDark.value = false
    }
    
    // Загрузка сохранённой темы из localStorage
    const loadTheme = () => {
        const saved = localStorage.getItem('theme')
        if (saved === 'dark') {
            isDark.value = true
        } else if (saved === 'light') {
            isDark.value = false
        }
    }
    
    // Следим за изменением темы и сохраняем в localStorage
    watch(isDark, (newValue) => {
        localStorage.setItem('theme', newValue ? 'dark' : 'light')
    })
    
    // Загружаем тему при создании стора
    loadTheme()
    
    // Возвращаем то, что будет доступно в компонентах
    return { isDark, toggleTheme, setDark, setLight }
})