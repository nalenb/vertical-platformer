const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const gravity = 0.2

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, rowIndex) => {
  row.forEach((symbol, columnIndex) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({ position: { x: columnIndex * 16, y: rowIndex * 16 } })
      )
    }
  })
})

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, rowIndex) => {
  row.forEach((symbol, columnIndex) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({ position: { x: columnIndex * 16, y: rowIndex * 16 } })
      )
    }
  })
})

const player = new Player({
  position: { x: 100, y: 300 },
  collisionBlocks,
  imageSrc: './images/warrior/Idle.png',
  frameRate: 8,
  animations: {
    Idle: {
      imageSrc: './images/warrior/Idle.png',
      frameRate: 8,
      frameBuffer: 10,
    },
    IdleLeft: {
      imageSrc: './images/warrior/IdleLeft.png',
      frameRate: 8,
      frameBuffer: 10,
    },
    Run: {
      imageSrc: './images/warrior/Run.png',
      frameRate: 8,
      frameBuffer: 12,
    },
    RunLeft: {
      imageSrc: './images/warrior/RunLeft.png',
      frameRate: 8,
      frameBuffer: 12,
    },
    Jump: {
      imageSrc: './images/warrior/Jump.png',
      frameRate: 2,
      frameBuffer: 5,
    },
    JumpLeft: {
      imageSrc: './images/warrior/JumpLeft.png',
      frameRate: 2,
      frameBuffer: 5,
    },
    Fall: {
      imageSrc: './images/warrior/Fall.png',
      frameRate: 2,
      frameBuffer: 5,
    },
    FallLeft: {
      imageSrc: './images/warrior/FallLeft.png',
      frameRate: 2,
      frameBuffer: 5,
    },
  },
})

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
}

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: './images/background.png',
})

function animate() {
  window.requestAnimationFrame(animate)

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.save()
  context.scale(4, 4)
  context.translate(0, -background.image.height + scaledCanvas.height)

  background.update()

  collisionBlocks.forEach((block) => {
    block.update()
  })
  platformCollisionBlocks.forEach((block) => {
    block.update()
  })

  player.update()

  player.velocity.x = 0

  if (keys.d.pressed) {
    player.switchSprite('Run')
    player.velocity.x = 1
    player.lastDirection = 'right'
  } else if (keys.a.pressed) {
    player.switchSprite('RunLeft')
    player.velocity.x = -1
    player.lastDirection = 'left'
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === 'right') {
      player.switchSprite('Idle')
    } else {
      player.switchSprite('IdleLeft')
    }
  }

  if (player.velocity.y < 0) {
    if (player.lastDirection === 'right') {
      player.switchSprite('Jump')
    } else {
      player.switchSprite('JumpLeft')
    }
  } else if (player.velocity.y > 0) {
    if (player.lastDirection === 'right') {
      player.switchSprite('Fall')
    } else {
      player.switchSprite('FallLeft')
    }
  }

  context.restore()
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break
    case 'w':
      player.velocity.y = -5
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }
})
