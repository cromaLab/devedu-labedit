const fs = require('fs-extra')
const path = require('path')

const { STORE_DIR } = process.env

class Store {
  /**
   *
   *
   * @param {string} id
   */
  constructor (id) {
    this.base = path.join(STORE_DIR, id)
  }

  path (file) {
    return path.join(this.base, file)
  }

  async create () {
    await fs.ensureDir(this.base)
  }

  async touch (file) {
    await fs.ensureFile(this.path(file))
  }

  async write (file, content) {
    await fs.writeFile(this.path(file), content)
  }
}

module.exports = Store
