import { Status, FileEditor } from './utils'

const params = new URLSearchParams(window.location.search)
const filename = params.get('file') || ''

new Status(document.title = filename)
const saveStatus = new Status('Use Ctrl/Cmd + S to Save')

const container = document.getElementById('container')
const file = new FileEditor(filename)
export default file

// const editor = require(['vs/editor/editor.main'], async () => {
//   return file.createEditor(container, {
//     automaticLayout: true,
//     theme: 'vs-dark'
//   })
// })
const editor = file.createEditor(container, {
  automaticLayout: true,
  theme: 'vs-dark'
})
