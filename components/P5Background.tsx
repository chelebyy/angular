"use client"

import { useEffect, useRef } from "react"
import p5 from "p5"

export default function P5Background() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const sketch = (p: p5) => {
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
      let particles: Particle[] = []
      let cols: number
      let rows: number

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
          this.pos = p5.Vector.random2D().mult(2)
          this.pos.add(x, y)
          this.targetPos = p.createVector(x, y)
          this.vel = p.createVector(0, 0)
          this.char = chars[Math.floor(p.random(chars.length))]
          this.isCodeSnippet = p.random(1) < 0.1 // 10% chance of being a code snippet
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
          const maxDistance = 150 // Mouse influence radius

          if (distance < maxDistance) {
            // Calculate alpha based on distance
            const targetAlpha = p.map(distance, 0, maxDistance, this.maxAlpha, 0)
            this.alpha = p.lerp(this.alpha, targetAlpha, 0.1)

            // Occasionally change character
            if (p.random(1) < 0.05) {
              if (this.isCodeSnippet) {
                this.char = p.random(codeSnippets)
              } else {
                this.char = chars[Math.floor(p.random(chars.length))]
              }
            }
          } else {
            this.alpha = p.lerp(this.alpha, 0, 0.1)
          }

          // Move towards target position
          const force = p5.Vector.sub(this.targetPos, this.pos)
          force.mult(0.1)
          this.vel.add(force)
          this.vel.mult(0.95) // Damping
          this.pos.add(this.vel)

          // Update hue
          this.hue += this.hueSpeed
          if (this.hue > 360) this.hue -= 360
        }

        draw() {
          if (this.alpha > 0.1) {
            p.fill(this.hue, 100, 100, this.alpha)
            if (this.isCodeSnippet) {
              p.textSize(12) // Smaller size for code snippets
              p.text(this.char, this.pos.x, this.pos.y)
              p.textSize(16) // Reset text size
            } else {
              p.text(this.char, this.pos.x, this.pos.y)
            }
          }
        }
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.textFont("Courier") // Use a monospace font for a more code-like appearance
        p.textAlign(p.CENTER, p.CENTER)
        p.colorMode(p.HSB, 360, 100, 100, 255)

        // Adjust grid size for a denser background
        const gridSize = 15
        cols = Math.floor(p.width / gridSize)
        rows = Math.floor(p.height / gridSize)

        // Create particles in a grid
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = i * gridSize + gridSize / 2
            const y = j * gridSize + gridSize / 2
            particles.push(new Particle(x, y))
          }
        }
      }

      p.draw = () => {
        p.background(230, 50, 10) // Dark background with a slight blue tint

        const mousePos = p.createVector(p.mouseX, p.mouseY)

        particles.forEach((particle) => {
          particle.update(mousePos)
          particle.draw()
        })
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
        particles = []

        // Recalculate grid
        const gridSize = 15
        cols = Math.floor(p.width / gridSize)
        rows = Math.floor(p.height / gridSize)

        // Recreate particles
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = i * gridSize + gridSize / 2
            const y = j * gridSize + gridSize / 2
            particles.push(new Particle(x, y))
          }
        }
      }
    }

    const p5Instance = new p5(sketch, containerRef.current)

    return () => {
      p5Instance.remove()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0" />
}

