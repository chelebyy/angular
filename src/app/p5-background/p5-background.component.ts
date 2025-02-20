import { Component, type OnInit, type OnDestroy } from "@angular/core"
import * as p5 from "p5"

@Component({
  selector: "app-p5-background",
  template: "<div #p5Canvas></div>",
  styles: [
    `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  `,
  ],
})
export class P5BackgroundComponent implements OnInit, OnDestroy {
  private p5: any

  ngOnInit() {
    this.createCanvas()
  }

  ngOnDestroy() {
    this.destroyCanvas()
  }

  private createCanvas() {
    this.p5 = new p5(this.sketch)
  }

  private destroyCanvas() {
    this.p5.remove()
  }

  private sketch(p: any) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/`~"
    const codeSnippets = [
      "function()",
      "if()",
      "for()",
      "while()",
      "class{}",
      "import",
      "export",
      "const",
      "let",
      "var",
      "<div>",
      "</div>",
      "<p>",
      "</p>",
      "useState",
      "useEffect",
      "=>",
      "async",
      "await",
      "try{}",
      "catch{}",
      "Promise",
      "map()",
      "filter()",
      "reduce()",
      "JSON",
      "API",
      "HTTP",
      "GET",
      "POST",
    ]
    let particles: any[] = []

    class Particle {
      pos: p5.Vector
      targetPos: p5.Vector
      vel: p5.Vector
      char: string
      alpha: number
      maxAlpha: number
      hue: number
      hueSpeed: number
      isCodeSnippet: boolean

      constructor(x: number, y: number) {
        this.pos = p.createVector().random2D().mult(2).add(x, y)
        this.targetPos = p.createVector(x, y)
        this.vel = p.createVector(0, 0)
        this.char = p.random(chars)
        this.isCodeSnippet = p.random(1) < 0.1
        if (this.isCodeSnippet) {
          this.char = p.random(codeSnippets)
        }
        this.alpha = 0
        this.maxAlpha = p.random(150, 200)
        this.hue = p.random(360)
        this.hueSpeed = p.random(0.2, 1)
      }

      update(mousePos: p5.Vector) {
        const distance = p5.Vector.dist(mousePos, this.pos)
        const maxDistance = 150

        if (distance < maxDistance) {
          const targetAlpha = p.map(distance, 0, maxDistance, this.maxAlpha, 0)
          this.alpha = p.lerp(this.alpha, targetAlpha, 0.1)

          if (p.random(1) < 0.05) {
            if (this.isCodeSnippet) {
              this.char = p.random(codeSnippets)
            } else {
              this.char = p.random(chars)
            }
          }
        } else {
          this.alpha = p.lerp(this.alpha, 0, 0.1)
        }

        const force = p5.Vector.sub(this.targetPos, this.pos)
        force.mult(0.1)
        this.vel.add(force)
        this.vel.mult(0.95)
        this.pos.add(this.vel)

        this.hue += this.hueSpeed
        if (this.hue > 360) this.hue -= 360
      }

      draw() {
        if (this.alpha > 0.1) {
          p.fill(this.hue, 100, 100, this.alpha)
          if (this.isCodeSnippet) {
            p.textSize(12)
            p.text(this.char, this.pos.x, this.pos.y)
            p.textSize(16)
          } else {
            p.text(this.char, this.pos.x, this.pos.y)
          }
        }
      }
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.textFont("Courier")
      p.textAlign(p.CENTER, p.CENTER)
      p.colorMode(p.HSB, 360, 100, 100, 255)

      const gridSize = 15
      const cols = Math.floor(p.width / gridSize)
      const rows = Math.floor(p.height / gridSize)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize + gridSize / 2
          const y = j * gridSize + gridSize / 2
          particles.push(new Particle(x, y))
        }
      }
    }

    p.draw = () => {
      p.background(230, 50, 10)

      const mousePos = p.createVector(p.mouseX, p.mouseY)

      particles.forEach((particle) => {
        particle.update(mousePos)
        particle.draw()
      })
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      particles = []

      const gridSize = 15
      const cols = Math.floor(p.width / gridSize)
      const rows = Math.floor(p.height / gridSize)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize + gridSize / 2
          const y = j * gridSize + gridSize / 2
          particles.push(new Particle(x, y))
        }
      }
    }
  }
}

