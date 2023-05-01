class Cube{
   constructor(position, color, size, count){
         this.type='cube';
         this.color = [1.0, 1.0, 1.0, 1.0];
         this.matrix = new Matrix4();
      }
      render() {
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        // Draw
        // Front of Cube
        drawTriangle3D([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
        drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);
        // Back of Cube
        drawTriangle3D([0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0 ]);
        drawTriangle3D([0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0 ]);
        gl.uniform4f(u_FragColor, this.color[0]-.20, this.color[1]-.20, this.color[2]-.20, this.color[3]);
        // Top of Cube
        drawTriangle3D([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
        drawTriangle3D([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
        // Bottom of Cube
        drawTriangle3D([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
        drawTriangle3D([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);
        gl.uniform4f(u_FragColor, this.color[0]-.10, this.color[1]-.10, this.color[2]-.10, this.color[3]);
        // Left of Cube
        drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ]);
        drawTriangle3D([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ]);
        // Right of Cube
        drawTriangle3D([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
        drawTriangle3D([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ]);
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
      }
   }