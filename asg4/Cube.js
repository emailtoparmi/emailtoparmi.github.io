class Cube {
    constructor() {
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
        this.normalMatrix = new Matrix4();
        this.textureNum = -2;
    }

    render() {
        const vertexBuffer = gl.createBuffer();
        const uvBuffer = gl.createBuffer();
        const normalBuffer = gl.createBuffer();
        let rgba = this.color;
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        // gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

        drawTriangle3DUVNormal([0, 0, 0, 1, 1, 0, 1, 0, 0], [0, 0, 1, 1, 1, 0], [0, 0, -1, 0, 0, -1, 0, 0, -1], vertexBuffer,uvBuffer, normalBuffer);
        drawTriangle3DUVNormal([0, 0, 0, 0, 1, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1], [0, 0, -1, 0, 0, -1, 0, 0, -1], vertexBuffer,uvBuffer, normalBuffer);

        drawTriangle3DUVNormal([1, 1, 0, 1, 1, 1, 0, 1, 0], [1, 0, 1, 1, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0], vertexBuffer,uvBuffer, normalBuffer);
        drawTriangle3DUVNormal([0, 1, 1, 1, 1, 1, 0, 1, 0], [0, 1, 1, 1, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0], vertexBuffer,uvBuffer, normalBuffer);

        drawTriangle3DUVNormal([1, 0, 0, 1, 1, 0, 1, 1, 1], [0, 0, 0, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1, 0, 0], vertexBuffer,uvBuffer, normalBuffer);
        drawTriangle3DUVNormal([1, 0, 0, 1, 0, 1, 1, 1, 1], [0, 0, 1, 0, 1, 1], [1, 0, 0, 1, 0, 0, 1, 0, 0], vertexBuffer,uvBuffer, normalBuffer);

        drawTriangle3DUVNormal([0, 0, 0, 0, 0, 1, 0, 1, 1], [1, 0, 0, 0, 0, 1], [-1, 0, 0, -1, 0, 0, -1, 0, 0], vertexBuffer,uvBuffer, normalBuffer);
        drawTriangle3DUVNormal([0, 0, 0, 0, 1, 0, 0, 1, 1], [1, 0, 1, 1, 0, 1], [-1, 0, 0, -1, 0, 0, -1, 0, 0], vertexBuffer,uvBuffer, normalBuffer);

        drawTriangle3DUVNormal([0, 0, 0, 1, 0, 1, 1, 0, 0], [0, 1, 1, 0, 1, 1], [0, -1, 0, 0, -1, 0, 0, -1, 0], vertexBuffer,uvBuffer, normalBuffer);
        drawTriangle3DUVNormal([0, 0, 0, 0, 0, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0], [0, -1, 0, 0, -1, 0, 0, -1, 0], vertexBuffer,uvBuffer, normalBuffer);

        drawTriangle3DUVNormal([1, 0, 1, 0, 0, 1, 0, 1, 1], [0, 0, 1, 0, 1, 1], [0, 0, 1, 0, 0, 1, 0, 0, 1], vertexBuffer,uvBuffer, normalBuffer);
        drawTriangle3DUVNormal([1, 0, 1, 1, 1, 1, 0, 1, 1], [0, 1, 0, 1, 1, 1], [0, 0, 1, 0, 0, 1, 0, 0, 1], vertexBuffer,uvBuffer, normalBuffer);

        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    }

    renderfast() {
        let rgba = this.color;

        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniform1i(u_whichTexture, this.textureNum);


        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        let allverts = [];
        allverts = allverts.concat([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0]);
        allverts = allverts.concat([0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0]);
        allverts = allverts.concat([0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0]);
        allverts = allverts.concat([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0]);
        allverts = allverts.concat([0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
        allverts = allverts.concat([0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
        allverts = allverts.concat([0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0]);
        allverts = allverts.concat([1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0]);
        allverts = allverts.concat([0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0]);
        allverts = allverts.concat([0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
        allverts = allverts.concat([1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0]);
        allverts = allverts.concat([1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0]);
        let alluvs = [
            0, 0, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1,
            1, 0, 1, 1, 0, 0,
            0, 1, 1, 1, 0, 0,
            0, 0, 0, 1, 1, 1,
            0, 0, 1, 0, 1, 1,
            1, 0, 0, 0, 0, 1,
            1, 0, 1, 1, 0, 1,
            0, 1, 1, 0, 1, 1,
            0, 1, 0, 0, 1, 0,
            0, 0, 1, 0, 1, 1,
            0, 1, 0, 1, 1, 1
        ];
        let allnorms = [
            0, 0, -1, 0, 0, -1, 0, 0, -1,
            0, 0, -1, 0, 0, -1, 0, 0, -1,
            0, 1, 0, 0, 1, 0, 0, 1, 0,
            0, 1, 0, 0, 1, 0, 0, 1, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0,
            -1, 0, 0, -1, 0, 0, -1, 0, 0,
            -1, 0, 0, -1, 0, 0, -1, 0, 0,
            0, -1, 0, 0, -1, 0, 0, -1, 0,
            0, -1, 0, 0, -1, 0, 0, -1, 0,
            0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1, 0, 0, 1
        ];
        drawTriangle3DUVNormal(allverts, alluvs, allnorms);
    }

}