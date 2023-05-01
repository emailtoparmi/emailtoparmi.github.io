class Triangle{
           constructor(position, color, size){
            this.type='triangle';
            this.position = position;
            this.color = color;
            this.size = size;
            this.matrix = new Matrix4();
              }
              render() {
                    gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
                    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
                    drawTriangle3D([-1,0.0,0.0, 0.0,1.0,0.0, 1,0.0,0.0 ]);
                    drawTriangle3D([-1,0.0,1, 0.0,1.0,1, 1,0.0,1 ]);
                    gl.uniform4f(u_FragColor, this.color[0]-.20, this.color[1]-.20, this.color[2]-.20, this.color[3]);
                    drawTriangle3D([-1,0.0,1, 0.0,1.0,1, 0.0,1.0,0.0 ]);
                    drawTriangle3D([-1,0.0,1, -1,0.0,0.0, 0.0,1.0,0.0 ]);
                    gl.uniform4f(u_FragColor, this.color[0]-.15, this.color[1]-.15, this.color[2]-.15, this.color[3]);
                    drawTriangle3D([1,0.0,1, 0.0,1.0,1, 0.0,1.0,0.0 ]);
                    drawTriangle3D([1,0.0,1, 1,0.0,0.0, 0.0,1.0,0.0 ]);
                    gl.uniform4f(u_FragColor, this.color[0]-.10, this.color[1]-.10, this.color[2]-.10, this.color[3]);
                    drawTriangle3D([1,0.0,0.0, 1,0.0,1, -1,0.0,0.0 ]);
                    drawTriangle3D([-1,0.0,1, -1,0.0,0.0, 1,0.0,0.0 ]);
                    gl.uniform4f(u_FragColor, this.color[0]-.05, this.color[1]-.05, this.color[2]-.05, this.color[3]-.05);
                    }
           }

           function drawTriangle(vertices){
              var n = 3;
              var vertexBuffer = gl.createBuffer();
              if(!vertexBuffer){
                 console.log('Failed to create the buffer object');
                 return -1;
              }
              // Bind the buffer object to target
              gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
              // Write date into the buffer object
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

              // Assign the buffer object to a_Position variable
              gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

              // Enable the assignment to a_Position variable
              gl.enableVertexAttribArray(a_Position);
              gl.drawArrays(gl.TRIANGLES, 0, n);
        }

        function drawTriangle3D(vertices){
           var n = 3;
           var vertexBuffer = gl.createBuffer();
           if(!vertexBuffer){
              console.log('Failed to create the buffer object');
              return -1;
           }

           // Bind the buffer object to target
           gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
           // Write date into the buffer object
           gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

           // Assign the buffer object to a_Position variable
           gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

           // Enable the assignment  a_Position variable
           gl.enableVertexAttribArray(a_Position);

           gl.drawArrays(gl.TRIANGLES, 0, n);
        }