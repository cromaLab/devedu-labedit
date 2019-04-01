const fs = require('fs-extra')
const path = require('path')

const { STORE_DIR } = process.env

class store {
  /**
   *
   *
   * @param {string} id
   */
  constructor (id) {
    this.base = path.join(STORE_DIR, id)
  }

  absolutePath (file) {
    return path.join(this.base, file)
  }

  writeFile (file, content) {
    return fs.writeFile(file, content)
  }
}

module.exports = store
