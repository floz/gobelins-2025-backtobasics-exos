import Cell from "../components/Cell";

export default class CellPoolProxy {
    private static readonly _Pool: Cell[] = [];

    public static Get(context: CanvasRenderingContext2D): Cell {
        const cell = CellPoolProxy._Pool.pop() || new Cell(context);
        cell.init();
        return cell;
    }

    public static Release(cell: Cell): void {
        cell.reset();
        CellPoolProxy._Pool.push(cell);
    }
}
