export default class Status {
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

function wait (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
