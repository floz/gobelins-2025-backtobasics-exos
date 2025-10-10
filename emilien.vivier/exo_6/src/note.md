fait un carré assez cool
```ts
for (let angle = 0; angle < 2 * Math.PI; angle += 0.1) {


            let x = Math.cos(angle) * this.radius;
            let y = Math.sin(angle) * this.radius;

            let xto = Math.cos(angle + 0.1) * this.radius;
            let yto = Math.sin(angle + 0.1) * this.radius;

            const noisePosFrom = this.noise.noise2D(x, y) * Math.PI * 2
            const noisePosTo = this.noise.noise2D(x, y) * Math.PI * 2


            const dx = this.x + Math.cos(noisePosFrom)
            const dy = this.y + Math.sin(noisePosFrom)

            x = Math.cos(angle) * this.radius * Math.cos(noisePosFrom);
            y = Math.sin(angle) * this.radius * Math.sin(noisePosFrom);

            xto = Math.cos(angle + 1) * this.radius * Math.cos(noisePosTo);
            yto = Math.sin(angle + 1) * this.radius * Math.sin(noisePosTo);



            this.ctx.moveTo(
                x,
                y
            );
            this.ctx.lineTo(
                xto,
                yto
            );
}
    ```