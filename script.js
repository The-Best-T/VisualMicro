const body = document.querySelector('body')

let context
let analyser

let myElements
const num = 32

const array = new Uint8Array(num * 2)

const width = 10

window.onclick = () => {
    if (context)
        return

    body.querySelector('h1').remove()

    for (let i = 0; i < num; i++) {
        const logo = document.createElement('div')

        logo.className = 'logo'
        logo.style.background = 'red'
        logo.style.minWidth = width + 'px'
        body.appendChild(logo)
    }

    myElements = document.querySelectorAll('.logo')

    context = new AudioContext()
    analyser = context.createAnalyser()
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        const src = context.createMediaStreamSource(stream)
        src.connect(analyser)
        loop()
    }).catch(error => {
        alert(error + '\r\n Отклонено. Страница будет обновлена!')
        location.reload()
    })
}

function loop() {
    window.requestAnimationFrame(loop)
    analyser.getByteFrequencyData(array)
    for (let i = 0; i < num; i++) {
        const height = array[i + num]
        myElements[i].style.minHeight = height + 'px'
        myElements[i].style.opacity = 0.008 * height
    }
}

