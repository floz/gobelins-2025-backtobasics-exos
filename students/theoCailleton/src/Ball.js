
export default class Ball {

    constructor( 
        size, 
        color, 
        scale,
        speed,
        angle, //direction
        canvasWidth,
        canvasHeight
    ){

 
        this._size = size
        this._color = color
        this._scale = scale
        this._speed = speed
        this._angle = angle
        this._canvasWidth = canvasWidth
        this._canvasHeight = canvasHeight

    }

    setPosition( x, y){
        this._x = x
        this._y = y
    }

    // setScale(scale){
    //     this._scale = scale
    // }

    // setSpeed(speed) {
    //     this._speed = speed
    // }


	drawBall( ctx ) {

		ctx.beginPath()
		ctx.fillStyle = this._color
		ctx.arc( this._x, this._y, this._size * .5 * this._scale, 0, Math.PI * 2 )
		ctx.fill()
		ctx.closePath()


        this.update()
	}

    // getDistance(xPos1, yPos1, xPos2, yPos2){
    //     let result = Math.sqrt(Math.pow(xPos2-xPos1, 2) + Math.pow(yPos2 - yPos1, 2))
    //     return result;
    // }

    update(){

        function lerp(start, end, t) {
        return start + (end - start) * t;
        }
        

        const stepX = Math.cos(this._angle)*this._speed;
        const stepY = Math.sin(this._angle)*this._speed;

        const newX = this._x + stepX;
        const newY = this._y + stepY;



        this._x = lerp(this._x, newX, 0.1);
        this._y = lerp(this._y, newY, 0.1);   


        if (this._x < 0 || this._x > this._canvasWidth) this._speed *= -1;
        if (this._y < 0 || this._y > this._canvasHeight) this._speed *= -1;



        // console.log(this._x)
        // console.log(getDistance(balls[0].x, balls[0].y, balls[1].x, balls[1].Y))
    }



}