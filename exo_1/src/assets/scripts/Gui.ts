import GUI from 'lil-gui';
import App from './app';

export default class Gui {

    public GUI: GUI
    private app: App
    constructor(app: App) {
        this.GUI = new GUI();
        this.app = app;
        (window as any).GUI = GUI;

    }
}