import { gsap } from "gsap";

export default class Cell {

	constructor( x, y, size, color ) {
		this.x = x
		this.y = y
		this.size = size
		this.color = color
		this.scale = 1
		this.ox = x
		this.oy = y
		this.lineAlpha = 0
		this.lineScale = 1

		this.ease = Math.random() < .5 ? "expo.out" : "bounce.out"

		this.life = 2 + Math.round( Math.random() * 3 )
	}

	draw( ctx ) {
		this.drawLine( ctx )
		this.drawSquare( ctx )
	}

	drawLine( ctx ) {
		const offsetX = this.size * .5 
		const offsetY = this.size * .5
		ctx.strokeStyle = this.color
		ctx.save()
		ctx.globalAlpha = this.lineAlpha
		ctx.translate( offsetX, offsetY )

		ctx.beginPath()
		ctx.lineWidth = 3 * this.lineScale
		ctx.moveTo( this.ox, this.oy )
		ctx.lineTo( this.x, this.y )
		ctx.stroke()
		ctx.closePath()

		ctx.restore()
	}

	drawSquare( ctx ) {
		ctx.fillStyle = this.color
    ctx.save()
    ctx.beginPath()

    ctx.translate( this.x, this.y )

    ctx.translate( this.size * .5, this.size * .5 )
    ctx.scale( this.scale, this.scale )
    ctx.translate( -this.size * .5, -this.size * .5)
  
    ctx.rect( 0, 0, this.size, this.size )
    ctx.fill()

    ctx.closePath()
    ctx.restore()
	}

	animate() {
		const isX = Math.random() < .5

		const duration = 1 + Math.random() * 1
		this._animLine( duration )

    gsap.to( this, {
      x: isX ? this.x + Math.random() * 100 - 50 : this.x,
      y: !isX ? this.y + Math.random() * 100 - 50 : this.y,
      duration,
			ease: this.ease,
      onComplete: this.nextStep
    } )
	}

	nextStep = () => {
		if( this.life <= 0 ) {
			gsap.to( this, {
				scale: 0,
				duration: 1
			} )
			return
		}

		this.ox = this.x
		this.oy = this.y
	
		const isX = Math.random() < .5
		const isY = !isX
		const isScaleChanging = Math.random() < .5
	
		const duration = 1 + Math.random() * 1

		this._animLine( duration )

		this.life -= 1
		gsap.to( this, {
			x: isX ? this.x + Math.random() * 100 - 50 : this.x,
			y: isY ? this.y + Math.random() * 100 - 50 : this.y,
			scale: isScaleChanging ? Math.random() * 2 : this.scale,
			duration,
			ease: this.ease,
			onComplete: this.nextStep,
		} )
	}

	_animLine( duration ) {
		this.lineAlpha = 0
		gsap.to( this, {
			lineAlpha: 1,
			duration: duration * .1
		} )

		this.lineScale = 1
		gsap.to( this, {
			lineScale: 0,
			duration
		} )

		gsap.to( this, {
			lineAlpha: 0,
			delay: duration * .9,
			duration: duration * .1
		} )
	}

}