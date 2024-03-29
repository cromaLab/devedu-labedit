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
    return wait(ms).then(() => this.elem.remove())
  }
}

class FileEditor {
  constructor (name) {
    this.name = name
    this._content = this._load()
  }

  async createEditor (container, options) {
    if (this._language == 'javascript') {
      const typings = [{
          name: 'JQuery',
          baseUrl: '/editor/third/jquery/',
          files: ['JQuery', 'JQueryStatic', 'misc', 'legacy']
      }]

      Promise.all(typings.map(async lib => {
        await Promise.all(lib.files.map(async file => {
          const data = await (await fetch(`${lib.baseUrl}/${file}.d.ts`)).text()
          monaco.languages.typescript.javascriptDefaults.addExtraLib(data)
        }))
      }))
    }

    this.editor = monaco.editor.create(container, {
      value: await this._content,
      language: this._language,
      ...(options || {})
    })

    if (livewriting !== undefined) {
      this.editor.livewriting = livewriting;
      this.editor.livewriting("create", "monaco", {}, await this._content);
    }

    let saving = false
    this.editor.onKeyDown(async event => {
      const isKeyS = event.browserEvent.keyCode === 83
      if ((event.ctrlKey || event.metaKey) && isKeyS) {
        event.stopPropagation()
        event.preventDefault()

        if (!saving) {
          saving = true // Block concurrent requests
          let actions = null;
          if (this.editor.livewriting)
            actions = this.editor.livewriting("returnactiondata")
          await file._save(this.editor.getValue(), actions)
          saving = false
        }
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

  async _save (content, actions) {
    const status = new Status('Saving...')
    try {
      const body = JSON.stringify({content, actions})
      await this._fetch(this._endpoint, {
        headers: {'Content-Type': 'application/json'},
        method:'POST', body,
      })

      // TODO: workaround for dup messages
      await status.remove('Saved')
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

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
