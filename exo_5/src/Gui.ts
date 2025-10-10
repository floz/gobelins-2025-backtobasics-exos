import GUI from 'lil-gui';
import App from './App';

export default class Gui {

    public GUI: GUI
    private app: App
    constructor(app: App) {
        this.GUI = new GUI();
        this.app = app;
    }
}