import Status from './utils/Status'
import FileEditor from './utils/FileEditor'

const params = new URLSearchParams(window.location.search)
const filename = params.get('file') || ''

new Status(document.title = filename)
const saveStatus = new Status('Use Ctrl/Cmd + S to Save')

const container = document.getElementById('container')
const file = new FileEditor(filename)

const editor = file.createEditor(container, {
  automaticLayout: true,
  theme: 'vs-dark'
})

