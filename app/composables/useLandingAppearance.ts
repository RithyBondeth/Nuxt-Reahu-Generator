export const ACCENT_THEMES = [
  {
    id: 'lime',
    label: 'Acid lime',
    description: 'Bright and energetic',
    swatch: '#C5F74F'
  },
  {
    id: 'sky',
    label: 'Electric sky',
    description: 'Clear and focused',
    swatch: '#5FD3FF'
  },
  {
    id: 'coral',
    label: 'Warm coral',
    description: 'Friendly and bold',
    swatch: '#FF8269'
  },
  {
    id: 'violet',
    label: 'Soft violet',
    description: 'Creative and calm',
    swatch: '#B79CFF'
  },
  {
    id: 'gold',
    label: 'Solar gold',
    description: 'Optimistic and warm',
    swatch: '#FFD75E'
  },
  {
    id: 'mint',
    label: 'Fresh mint',
    description: 'Clean and lively',
    swatch: '#59E6A8'
  },
  {
    id: 'pink',
    label: 'Hot pink',
    description: 'Playful and vivid',
    swatch: '#FF7AB8'
  },
  {
    id: 'orange',
    label: 'Tangerine',
    description: 'Confident and bright',
    swatch: '#FFAD5C'
  }
] as const

export const FONT_THEMES = [
  {
    id: 'modern',
    label: 'Modern',
    description: 'Clean, balanced sans',
    sample: 'Aa'
  },
  {
    id: 'editorial',
    label: 'Editorial',
    description: 'Expressive serif display',
    sample: 'Aa'
  },
  {
    id: 'technical',
    label: 'Technical',
    description: 'Precise monospace',
    sample: 'Aa'
  },
  {
    id: 'ubuntu',
    label: 'Ubuntu',
    description: 'Warm, humanist sans',
    sample: 'Aa'
  },
  {
    id: 'noto',
    label: 'Noto Sans',
    description: 'Clear and multilingual',
    sample: 'Aa'
  }
] as const

export type AccentTheme = typeof ACCENT_THEMES[number]['id']
export type FontTheme = typeof FONT_THEMES[number]['id']

const ACCENT_STORAGE_KEY = 'reahu:accent-theme'
const FONT_STORAGE_KEY = 'reahu:font-theme'

function isAccentTheme(value: string | null): value is AccentTheme {
  return ACCENT_THEMES.some(theme => theme.id === value)
}

function isFontTheme(value: string | null): value is FontTheme {
  return FONT_THEMES.some(theme => theme.id === value)
}

export function useLandingAppearance() {
  const accentTheme = useState<AccentTheme>('landing-accent-theme', () => 'lime')
  const fontTheme = useState<FontTheme>('landing-font-theme', () => 'modern')
  const ready = useState('landing-appearance-ready', () => false)

  function applyPreferences() {
    if (!import.meta.client) return

    document.documentElement.dataset.accentTheme = accentTheme.value
    document.documentElement.dataset.fontTheme = fontTheme.value
  }

  function resetPreferences() {
    accentTheme.value = 'lime'
    fontTheme.value = 'modern'
  }

  onMounted(() => {
    try {
      const storedAccent = localStorage.getItem(ACCENT_STORAGE_KEY)
      const storedFont = localStorage.getItem(FONT_STORAGE_KEY)

      if (isAccentTheme(storedAccent)) accentTheme.value = storedAccent
      if (isFontTheme(storedFont)) fontTheme.value = storedFont
    } catch {
      // The live preferences still work when a browser blocks local storage.
    }

    applyPreferences()
    ready.value = true

    watch([accentTheme, fontTheme], () => {
      applyPreferences()
      try {
        localStorage.setItem(ACCENT_STORAGE_KEY, accentTheme.value)
        localStorage.setItem(FONT_STORAGE_KEY, fontTheme.value)
      } catch {
        // Keep the in-session preference even when persistence is unavailable.
      }
    })
  })

  return {
    accentTheme,
    fontTheme,
    ready,
    resetPreferences
  }
}
