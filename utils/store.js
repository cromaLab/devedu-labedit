const crypto = require('crypto')
const fs = require('fs-extra')
const path = require('path')

const { STORE_DIR } = process.env

const projBase = path.join(STORE_DIR, 'project_base/')
const metdata = path.join(STORE_DIR, 'metadata.csv')

fs.ensureDirSync(projBase)
fs.ensureFileSync(metdata)

class Store {
  /**
   *
   *
   * @param {string} user
   * @param {string} keyword
   */
  constructor (user, keyword) {
    this.id = Store.generateId(user, keyword)
    this._meta = `${this.id},${user},${keyword}\n`
  }

  // Folder getters
  get proj () { return path.join(this._base, 'data') }
  get other () { return path.join(this._base, 'meta') }
  get _base () { return path.join(STORE_DIR, this.id) }

  path (file) {
    return path.join(this.proj, file)
  }

  async create () {
    await fs.appendFile(metdata, this._meta)
    await fs.copy(projBase, this.proj, { overwrite: false })
  }

  async touch (file) {
    const fd = await fs.open(this.path(file), 'a')
    await fs.close(fd)
  }

  async write (file, content) {
    await fs.writeFile(this.path(file), content)
  }

  async actions (file, data) {
    const timestamp = new Date().toISOString()
    await fs.outputJSON(path.join(this.other, file, timestamp + '.json'), data)
  }

  async read (file, content) {
    return fs.readFile(this.path(file), content)
  }

  async ls () {
    return fs.readdir(this.proj)
  }

  /**
   *
   * @param {string} user
   * @param {string} keyword
   */
  static generateId (user, keyword) {
    const hash = crypto.createHash('sha256')
    hash.update(user).update(keyword)
    return hash.digest('hex')
  }
}

module.exports = Store
