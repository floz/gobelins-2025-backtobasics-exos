export default class ImageAnalyser {

	constructor( ratioDivider = 4, isCoverMode = false ) {
		this._ratioDivider = ratioDivider
		this._isCoverMode = isCoverMode
		
		this.img = new Image()
	}

	_onLoad = () => {
		this._createAnalyser()

		this._onComplete()
	}

	_createAnalyser() {
		this._canvas = document.createElement( 'canvas' )
		this._ctx = this._canvas.getContext( '2d' )
		if( !this._isCoverMode ) {
			this._initNaturalMode()
		} else {
			this._initCoverMode()
		}

		this._dataFull = this._ctx.getImageData( 0, 0, this._w, this._h ).data
	}

	_initNaturalMode() {
		this._w = this.img.width / this._ratioDivider
		this._h = this.img.height / this._ratioDivider
		this._setupCanvas()


		this._ctx.drawImage( this.img, 0, 0, this._w, this._h )
	}

	_initCoverMode() {
		const w = window.innerWidth
		const h = window.innerHeight

		this._w = w
		this._h = h
		this._setupCanvas()

		const scale = Math.max( w / this.img.width, h / this.img.height )
		const widthScaled = this.img.width * scale
		const heightScaled = this.img.height * scale
		const xScaled = ( w - widthScaled ) * .5
		const yScaled = ( h - heightScaled ) * .5

		this._ctx.drawImage( this.img, 0, 0, this.img.width, this.img.height, xScaled, yScaled, widthScaled, heightScaled )
	}
	
	_setupCanvas() {
		this._canvas.width = this._w
		this._canvas.height = this._h
		this._canvas.style.width = this._w + 'px'
		this._canvas.style.height = this._h + 'px'
	}

	load( src, onComplete ) {
		if( !src ) {
			throw new Error( 'Need a src URL' )
		}

		this._onComplete = onComplete

		this.img.addEventListener( 'load', this._onLoad )
		this.img.src = src
	}

	debug() {
		this._canvas.style.position = 'absolute'
		this._canvas.style.top = 0
		this._canvas.style.left = 0
		this._canvas.style.opacity = .1
		document.body.appendChild( this._canvas )
	}

	getRGBA( x, y ) {
		const idx = (y * this._w + x) * 4;
		return [
			this._dataFull[ idx ],
			this._dataFull[ idx + 1 ],
			this._dataFull[ idx + 2 ],
			this._dataFull[ idx + 3 ],
		]
	}

	getGrayScale( x, y ) {
		// const rgba = this.getRGBA( x, y )
		const rgba = this._ctx.getImageData( x, y, 1, 1 ).data
		const grayScale = ( rgba[ 0 ] + rgba[ 1 ] + rgba[ 2 ] ) / 3
		return grayScale / 255
	}

	get width() {
		return this._w
	}

	get height() {
		return this._h
	}

	get data() {
		return this._dataFull
	}

}