class Sphere{
   constructor(){
      this.type='sphere';
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4();
      this.center = [0,0,0];
      this.size = 18.0;
      this.sCount = 4;
   }

   render() {
      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
      // Draw
      var delta = this.size/40.0;
      var angleStep = 360/this.sCount*.5;
      var indices1 = [];
      var indices2 = [];
      var anglez = 0;
      var sizexy = 0;
      for(var sCounts = 0; sCounts < this.sCount; sCounts++){
         let z1 = Math.cos(anglez*Math.PI/180)*delta;
         let z2 = Math.cos((anglez+angleStep)*Math.PI/180)*delta;
         anglez = anglez + angleStep;
         for(var angle = 0; angle <= 360; angle += angleStep){
            let centerPt = [this.center[0], this.center[1]];
            let angle1 = angle;
            let angle2 = angle + angleStep;
            let vec1 = [Math.cos(angle1*Math.PI/180)*delta, Math.sin(angle1*Math.PI/180)*delta];
            let vec2 = [Math.cos(angle2*Math.PI/180)*delta, Math.sin(angle2*Math.PI/180)*delta];
            let pt1 = [centerPt[0]+vec1[0], centerPt[1]+vec1[1]];
            let pt2 = [centerPt[0]+vec2[0], centerPt[1]+vec2[1]];
            indices1.push([pt1[0], pt1[1], z1]);
            indices2.push([pt2[0], pt2[1], z2]);
         }
      }
      for(var x = 0; x < indices1.length-1; x++){
         drawTriangle3D([indices1[x][0], indices1[x][1], indices1[x][2], indices1[x+1][0], indices1[x+1][1], indices1[x+1][2], indices2[x][0], indices2[x][1], indices2[x][2]]);
         drawTriangle3D([indices2[x][0], indices2[x][1], indices2[x][2], indices2[x+1][0], indices2[x+1][1], indices2[x+1][2], indices1[x+1][0], indices1[x+1][1], indices1[x+1][2]]);
         gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
      }
   }
}