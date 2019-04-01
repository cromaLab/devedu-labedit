const params = new URLSearchParams(window.location.search)
const filename = params.get('file') || ''

document.title = filename
const base = new Status(filename)

const container = document.getElementById('container')
const file = new FileEditor(filename)

const editor = require(['vs/editor/editor.main'], async () => {
  return file.createEditor(container, {
    automaticLayout: true,
    theme: 'vs-dark'
  })
})
