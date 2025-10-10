export default class Cell {

	constructor( size, color = '#2650e8ff' ) {
		this._size = size
		this._color = color
		this._scale = 1
	}

	setPosition( x, y ) {
		this._x = x
		this._y = y

		this._xCurr = x
		this._yCurr = y
	}

	draw( ctx ) {

		ctx.beginPath()
		ctx.fillStyle = this._color
		ctx.arc( this._xCurr, this._yCurr, this._size * .5 * this._scale, 0, Math.PI * 2 )
		ctx.fill()
		ctx.closePath()
	}

}