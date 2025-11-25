import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

export function useTheme() {
  const theme = ref<Theme>('auto')

  const applyTheme = () => {
    const root = window.document.documentElement
    const isDark = theme.value === 'dark' || 
      (theme.value === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  watch(theme, () => {
    localStorage.setItem('theme', theme.value)
    applyTheme()
  })

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      theme.value = savedTheme
    }
    applyTheme()

    // Listen for system changes if in auto mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'auto') applyTheme()
    })
  })

  return {
    theme,
    applyTheme
  }
}
