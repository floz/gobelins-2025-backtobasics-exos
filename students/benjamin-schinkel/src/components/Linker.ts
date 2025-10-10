import type { guiConfig } from "../main";
import CellPoolProxy from "../proxies/CellPoolProxy";
import type Cell from "./Cell";


export interface LinkerConfig {
    linkerDistance: number;
    linkerColor: string;
    linkerWidth: number;
}

export default class Linker {
    private readonly _context: CanvasRenderingContext2D;
    private readonly _cells: Cell[];
    private _distanceForLink: number;
    private _color: string;
    private _width: number;

    constructor(context: CanvasRenderingContext2D) {
        this._context = context;
        this._cells = [];
        this._distanceForLink = 0;
        this._color = '#000000';
        this._width = 0;
    }

    public setConfig(config: LinkerConfig): void {
        this._distanceForLink = config.linkerDistance;
        this._color = config.linkerColor;
        this._width = config.linkerWidth;
    }

    public generateCells(config: guiConfig, canvasWidth: number, canvasHeight: number): void {
        if (config.cellNumber > this._cells.length) {
            for (let i = this._cells.length; i < config.cellNumber; i++) {
                const cell = CellPoolProxy.Get(this._context);
                cell.setConfig({
                    positionX: config.cellSize + (Math.random() * (canvasWidth - config.cellSize * 2)),
                    positionY: config.cellSize + (Math.random() * (canvasHeight - config.cellSize * 2)),
                    size: config.cellSize,
                    color: config.cellColor,
                    speed: config.cellSpeed,
                })
                cell.setCanvasDimension(canvasWidth, canvasHeight);
                this._cells.push(cell);
            }
        } else {
            for (let i = this._cells.length; i > config.cellNumber; i--) {
                const cell = this._cells.pop();
                CellPoolProxy.Release(cell!);
            }
        }
    }

    private _draw(): void {
        for (let i = 0; i < this._cells.length; i++) {
            for (let j = i + 1; j < this._cells.length; j++) {
                if (this._cells[i].id !== this._cells[j].id) {
                    const dx = this._cells[j].position.x - this._cells[i].position.x;
                    const dy = this._cells[j].position.y - this._cells[i].position.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < this._distanceForLink) {
                        const opacity = Math.round((1 - distance / this._distanceForLink) * 255).toString(16).padStart(2, '0');
                        this._context.strokeStyle = this._color + opacity;
                        this._context.lineWidth = this._width;
                        this._context.beginPath();
                        this._context.moveTo(this._cells[i].position.x, this._cells[i].position.y);
                        this._context.lineTo(this._cells[j].position.x, this._cells[j].position.y);
                        this._context.stroke();
                    }
                }
            }
        }
    }

    public update(dt: number) {
        for (const cell of this._cells) cell.refreshPosition(dt);
        this._draw();
        for (const cell of this._cells) cell.update(dt);
    }

    //#region Getter
    public get cells(): Cell[] { return this._cells; }
    //#endregion
}
