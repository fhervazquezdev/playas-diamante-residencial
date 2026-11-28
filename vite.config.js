import { defineConfig } from 'vite'
import { resolve } from 'node:path'

const pages = [
  'index.html',
  'master-suite/index.html',
  'amatista/index.html',
  'turquesa/index.html',
  'suite/index.html',
  'penthouse/index.html',
  'nuevas-suites/index.html',
  'diario/una-manana-frente-al-mar/index.html',
  'diario/fin-de-semana-en-playas-de-tijuana/index.html',
  'diario/elige-la-residencia-que-se-siente-como-casa/index.html',
]

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(import.meta.dirname, page)])),
    },
  },
})
