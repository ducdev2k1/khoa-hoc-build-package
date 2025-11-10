import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootDir = resolve(__dirname, '..')
const publicDir = join(rootDir, 'public')
const lessonsDir = join(publicDir, 'lessons')
const sourceLessonsDir = resolve(rootDir, '..', 'lessons')

// Create directories
mkdirSync(publicDir, { recursive: true })
mkdirSync(lessonsDir, { recursive: true })

// Copy lessons
console.log('Copying lessons...')
const lessonFiles = readdirSync(sourceLessonsDir).filter(file => file.endsWith('.md'))
lessonFiles.forEach(file => {
    const src = join(sourceLessonsDir, file)
    const dest = join(lessonsDir, file)
    copyFileSync(src, dest)
    console.log(`  ✓ ${file}`)
})

// Copy other markdown files
console.log('\nCopying other markdown files...')
const otherFiles = ['SETUP.md', 'RESOURCES.md', 'EXAMPLES.md']
otherFiles.forEach(file => {
    const src = resolve(rootDir, '..', file)
    const dest = join(publicDir, file)
    try {
        if (statSync(src).isFile()) {
            copyFileSync(src, dest)
            console.log(`  ✓ ${file}`)
        }
    } catch (err) {
        console.log(`  ✗ ${file} (not found)`)
    }
})

console.log('\n✅ Done!')

