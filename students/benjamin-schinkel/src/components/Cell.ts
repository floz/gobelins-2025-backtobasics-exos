import Point from "../tools/Point";

export interface CellConfig {
    size: number;
    color: string;
    speed: number;
    positionX?: number;
    positionY?: number;
}

export default class Cell {
    private static _Counter = 0;
    private readonly _id: string;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _position: Point;
    private _canvasWidth: number;
    private _canvasHeight: number;
    private _size: number;
    private _speed: number;
    private _randomSpeedMultiplicator: number;
    private _angle: number;
    private _dirX: number;
    private _dirY: number;
    private _color: string;

    constructor(context: CanvasRenderingContext2D) {
        this._id = 'Cell_' + Cell._Counter++;
        this._context = context;
        this._position = new Point();
        this._canvasWidth = 0;
        this._canvasHeight = 0;
        this._size = 0;
        this._color = '#000000';
        this._speed = 0;
        this._randomSpeedMultiplicator = 0;
        this._angle = 0;
        this._dirX = 0;
        this._dirY = 0;
    }

    public init(): void {
        this.reset();
        this._randomSpeedMultiplicator = 1 + Math.random() * 2;
        this._initAngle();
    }

    public reset(): void {
        this._position.clear();
        this._size = 0;
        this._color = '#000000';
        this._speed = 0;
        this._randomSpeedMultiplicator = 0;
        this._angle = 0;
        this._dirX = 0;
        this._dirY = 0;
    }

    private _initAngle(): void {
        const epsilone = 0.0001;
        this._angle = epsilone + (Math.random() * (Math.PI * 2 - epsilone * 2));
        this._dirX = Math.cos(this._angle);
        this._dirY = Math.sin(this._angle);

        const length = Math.sqrt(this._dirX * this._dirX + this._dirY * this._dirY);
        this._dirX /= length;
        this._dirY /= length;
    }

    public setConfig(cellConfig: CellConfig): void {
        this._size = cellConfig.size;
        this._color = cellConfig.color;
        this._speed = cellConfig.speed;
        if (cellConfig.positionX) this._position.x = cellConfig.positionX;
        if (cellConfig.positionY) this._position.y = cellConfig.positionY;
    }

    public setCanvasDimension(width: number, height: number): void {
        this._canvasWidth = width;
        this._canvasHeight = height;
    }

    public refreshPosition(dt: number): void {
        this._position.x += this._dirX * this._speed * this._randomSpeedMultiplicator * dt;
        this._position.y += this._dirY * this._speed * this._randomSpeedMultiplicator * dt;
        this._refreshDirections();
    }

    private _refreshDirections(): void {
        if (this._needRefreshDirX()) this._dirX *= -1;
        if (this._needRefreshDirY()) this._dirY *= -1;
    }

    private _needRefreshDirX(): boolean {
        if (this._position.x <= 0 + this._size && this._dirX < 0) return true;
        if (this._position.x >= this._canvasWidth - this._size && this._dirX > 0) return true;
        return false;
    }

    private _needRefreshDirY(): boolean {
        if (this._position.y <= 0 + this._size && this._dirY < 0) return true;
        if (this._position.y >= this._canvasHeight - this._size && this._dirY > 0) return true;
        return false;
    }

    private _draw(): void {
        this._context.save();
        this._context.translate(this._position.x, this._position.y);
        this._context.fillStyle = this._color;
        this._context.beginPath()
        this._context.arc(0, 0, this._size, 0, Math.PI * 2);
        this._context.fill();
        this._context.closePath();
        this._context.restore();
    }

    public update(dt: number): void {
        this._draw();
    }

    //#region Getters
    //
    public get id(): string { return this._id; }
    public get position(): Point { return this._position; }
    //
    //#endregion
}