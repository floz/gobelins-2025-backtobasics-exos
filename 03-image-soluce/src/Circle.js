export default class Circle {

	constructor( size, color = '#fff' ) {
		this._size = size
		this._color = color
		this._scale = 1
	}

	setPosition( x, y ) {
		this._x = x
		this._y = y
	}

	setScale( scale ) {
		this._scale = scale
	}

	draw( ctx ) {
		ctx.beginPath()
		ctx.fillStyle = this._color
		ctx.arc( this._x, this._y, this._size * .5 * this._scale, 0, Math.PI * 2 )
		ctx.fill()
		ctx.closePath()
	}

}