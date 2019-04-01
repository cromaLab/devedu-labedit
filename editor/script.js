const params = new URLSearchParams(window.location.search)
const filename = params.get('file') || ''

new Status(document.title = filename)
const saveStatus = new Status('Use Ctrl/Cmd + S to Save')

const container = document.getElementById('container')
const file = new FileEditor(filename)

const editor = require(['vs/editor/editor.main'], async () => {
  return file.createEditor(container, {
    automaticLayout: true,
    theme: 'vs-dark'
  })
})
