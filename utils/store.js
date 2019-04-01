const crypto = require('crypto')
const fs = require('fs-extra')
const path = require('path')

const { STORE_DIR } = process.env
const metdata = path.join(STORE_DIR, 'metadata.csv')
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
    this.base = path.join(STORE_DIR, this.id)
    this._meta = `${this.id},${user},${keyword}\n`
  }

  path (file) {
    return path.join(this.base, file)
  }

  async create () {
    fs.appendFile(metdata, this._meta)
    await fs.ensureDir(this.base)
  }

  async touch (file) {
    const fd = await fs.open(this.path(file), 'a')
    await fs.close(fd)
  }

  async write (file, content) {
    await fs.writeFile(this.path(file), content)
  }

  async read (file, content) {
    return fs.readFile(this.path(file), content)
  }

  async ls () {
    return fs.readdir(this.base)
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
