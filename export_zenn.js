const fs = require('fs')
const { copyFile, mkdir, rm, readdir } = fs.promises
const { spawnSync } = require('child_process')

const FROM_DIR = 'content/blog'
const OUT_DIR = 'out_zenn'
const OUT_ARTICLES_DIR = `${OUT_DIR}/articles`
const OUT_BOOKS_DIR = `${OUT_DIR}/books`

const readdirRecursiveEnt = async (dir, ent) => {
  const path = `${dir}/${ent.name}`
  if (ent.isFile()) return path
  if (ent.isDirectory()) {
    return await readdirRecursive(path)
  }
  console.log(`${ent.name} is not a file or directory`)
  return null
}

const readdirRecursive = async (dir) => {
  const ents = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(ents.map((ent) => readdirRecursiveEnt(dir, ent))))
    .filter(Boolean)
    .flat()
}

const toSlugFilename = (path) => path.split('___')[1]
async function main() {
  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_ARTICLES_DIR, { recursive: true })
  await mkdir(OUT_BOOKS_DIR, { recursive: true })
  fs.closeSync(fs.openSync(`${OUT_BOOKS_DIR}/.gitkeep`, 'w'))

  const files = await readdirRecursive(FROM_DIR)
  for (const filePath of files) {
    const targetPath = `${OUT_ARTICLES_DIR}/${toSlugFilename(filePath)}`
    await copyFile(filePath, targetPath)

    // NOTE: zenn で diff コードブロックがうまく効かない
    spawnSync('gsed', ['-i', '-e', 's/^```diff.*/```/g', targetPath])

    // spawnSync(`gsed`, ['-i', '-e', 's/^```toc\\n*```//g', targetPath])
  }
}
main().then(() => console.log('fin'))
