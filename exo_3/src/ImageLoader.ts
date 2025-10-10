import App from "./App"
// import img from "./assets/hockney.jpg"
export default class ImageLoader {

    private image: HTMLImageElement
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private app: App
    public lofiImage: [r: number, g: number, b: number][][] = []
    private painting: ImageData | null = null
    constructor(app: App, url: string) {

        this.app = app
        this.image = new Image()
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;



        this.onLoad = this.onLoad.bind(this)
        this.load(url)
    }

    load(url: string) {
        this.image.src = url;
        this.image.addEventListener("load", this.onLoad);
    }

    onLoad(e: any) {
        this.canvas.width = this.image.width;
        this.canvas.height = this.image.height;
        this.ctx.drawImage(this.image, 0, 0);
        this.painting = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this.browseImage(this.app.grid.lines, this.app.grid.columns)
        this.app.onReady()
    }

    calcBrightness(r: number, g: number, b: number) {
        return Math.sqrt(
            (r * r) * 0.299 +
            (g * g) * 0.587 +
            (b * b) * 0.114
        )
    }

    browseImage(lines: number, cols: number) {
        if(!this.painting) return 
        const imageRatio = this.painting.width / this.painting.height
        const screenRatio = this.app.screenWidth / this.app.screenHeight

        // console.log(imageRatio)
        // console.log(screenRatio)


        // if (imageRatio > 1 && screenRatio > 1) { }
        // if (imageRatio < 1 && screenRatio > 1) { }
        // if (imageRatio < 1 && screenRatio < 1) { }
        // if (imageRatio > 1 && screenRatio < 1) { }




        for (let line = 0; line < lines; line++) {

            const row = []

            for (let col = 0; col < cols; col++) {
                const lineStart = Math.floor(line / lines * this.painting.height)
                const lineEnd = Math.floor((line + 1) / lines * this.painting.height)
                const colStart = Math.floor(col / cols * this.painting.width)//Seems to doesn't work
                const colEnd = Math.floor((col + 1) / cols * this.painting.width)//Seems to doesn't work


                let sumR = 0
                let sumG = 0
                let sumB = 0

                let cellCount = 0


                /**
                 * Center the image in the grid 
                 */




                for (let iy = lineStart; iy < lineEnd; iy++) {
                    for (let ix = colStart; ix < colEnd; ix++) {
                        sumR += this.painting.data[iy * 4 * this.painting.width + ix * 4 + 0] // Why * painting.width
                        sumG += this.painting.data[iy * 4 * this.painting.width + ix * 4 + 1] // Why * painting.width
                        sumB += this.painting.data[iy * 4 * this.painting.width + ix * 4 + 2] // Why * painting.width
                        cellCount++
                    }
                }


                // cellCount = lineEnd - lineStart + colEnd - colStart
                row.push([sumR / cellCount, sumG / cellCount, sumB / cellCount] as [r: number, g: number, b: number])
            }
            this.lofiImage.push(row)

        }


    }
}