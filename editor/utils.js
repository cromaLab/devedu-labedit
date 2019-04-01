// import monaco from 'monaco-editor'

class Status {
  constructor (message) {
    this.elem = document.createElement('div')
    this.elem.classList.add('status')
    this.elem.innerText = message

    const notify = (this.notify || document.getElementById('notify'))
    notify.appendChild(this.elem)
  }

  async update (message) {
    this.elem.innerText = message
  }

  async error (message) {
    this.elem.classList.add('error')
    this.remove(`Error: ${message}`, 1000)
  }

  async remove (message, ms = 500) {
    if (message) this.update(message)
    return setTimeout(() => this.elem.remove(), ms)
  }
}

class FileEditor {
  constructor (name) {
    this.name = name
    this._content = this._load()
  }

  async createEditor (container, options) {
    this.editor = monaco.editor.create(container, {
      value: await this._content,
      language: this._language,
      ...(options || {})
    })

    this.editor.onKeyDown(async event => {
      const isKeyS = event.browserEvent.keyCode === 83
      if ((event.ctrlKey || event.metaKey) && isKeyS) {
        event.preventDefault(); event.stopPropagation()
        await file._save(this.editor.getValue())
      }
    })

    return this.editor
  };

  async _load () {
    const status = new Status('Loading...')
    try {
      const content = await (await this._fetch(this._endpoint)).text()
      status.remove('Loaded')
      return content
    } catch (e) {
      status.error(e.message)
    }
  }

  async _save (body) {
    const method = 'POST'
    const status = new Status('Saving...')
    try {
      await this._fetch(this._endpoint, { method, body })
      status.remove('Saved')
    } catch (e) {
      status.error(e.message)
    }
  }

  async _fetch (input, init) {
    const response = await fetch(input, init)
    if (!response.ok) throw Error(response.statusText)
    return response
  }

  get _language () {
    const ext = this.name.split('.').pop()
    const langs = { html: 'html', js: 'javascript' }
    return langs[ext] || ext
  }

  get _endpoint () {
    return `/files/${this.name}`
  }
}
