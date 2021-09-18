const fs = require('fs').promises
const { execSync, spawnSync } = require('child_process')

const FROM_DIR = 'content/blog'
const OUT_DIR = 'out_zenn/articles'

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
  const ents = await fs.readdir(dir, { withFileTypes: true })
  return (await Promise.all(ents.map((ent) => readdirRecursiveEnt(dir, ent))))
    .filter(Boolean)
    .flat()
}

const toSlugFilename = (path) => path.split('___')[1]
async function main() {
  await fs.rmdir(OUT_DIR, { recursive: true })
  await fs.mkdir(OUT_DIR, { recursive: true })
  const files = await readdirRecursive(FROM_DIR)
  for (const filePath of files) {
    const targetPath = `${OUT_DIR}/${toSlugFilename(filePath)}`
    await fs.copyFile(filePath, targetPath)

    // NOTE: zenn で diff コードブロックがうまく効かない
    spawnSync('gsed', ['-i', '-e', 's/^```diff.*/```/g', targetPath])

    // spawnSync(`gsed`, ['-i', '-e', 's/^```toc\\n*```//g', targetPath])
  }
}
main().then(() => console.log('fin'))
