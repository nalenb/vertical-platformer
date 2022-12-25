const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

class Player {
	constructor(position) {
		this.position = position
		this.velocity = {
			x: 0,
			y: 1
		}
	}

	draw() {
		context.fillStyle = 'red'
		context.fillRect(this.position.x, this.position.y, 100, 100)
	}

	update() {
		this.draw()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		this.velocity.y += 0.25
	}
}

const player = new Player({x: 300, y: 100})
const player2 = new Player({x: 0, y: 100})

function animate() {
	window.requestAnimationFrame(animate)

	context.fillStyle = 'white'
	context.fillRect(0, 0, canvas.width, canvas.height)

	player.update()
	player2.update()
}

animate()
