class Circle{
           constructor(position, color, size, count){
                 this.type='circle';
                 this.position = position;
                   this.color = color;
                   this.size = size;
                 this.count = count;
              }
              render(){
                 gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
                 var delta = this.size/40.0;
                 var angleStep = 360/this.count*.5;
                    for(var angle = 0; angle <= 360; angle += angleStep){
                       let centerPt = [this.position[0], this.position[1]];
                       let angle1 = angle;
                       let angle2 = angle + angleStep;
                       let vec1 = [Math.cos(angle1*Math.PI/180)*delta, Math.sin(angle1*Math.PI/180)*delta];
                       let vec2 = [Math.cos(angle2*Math.PI/180)*delta, Math.sin(angle2*Math.PI/180)*delta];
                       let pt1 = [centerPt[0]+vec1[0], centerPt[1]+vec1[1]];
                       let pt2 = [centerPt[0]+vec2[0], centerPt[1]+vec2[1]];
                       drawTriangle([this.position[0], this.position[1], pt1[0], pt1[1], pt2[0], pt2[1]]);
                    }
              }
           }
//function drawTriangle(vertices){
//              var n = 3;
//              var vertexBuffer = gl.createBuffer();
//              gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
//              gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
//              gl.enableVertexAttribArray(a_Position);
//              gl.drawArrays(gl.TRIANGLES, 0, n);
//        }