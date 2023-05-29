class Sphere {
    constructor() {
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
        this.textureNum = -2;
        this.verts32 = new Float32Array([]);
    }

    // render() {
    //     let rgba = this.color;
    //     gl.uniform1i(u_whichTexture, this.textureNum);
    //     gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    //     gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    //     let d = Math.PI / 10;
    //     let dd = Math.PI / 10;
    //     for (let t = 0; t < Math.PI; t += d) {
    //         for (let r = 0; r < (2 * Math.PI); r += d) {
    //             let p1 = [Math.sin(t) * Math.cos(r), Math.sin(t) * Math.sin(r), Math.cos(t)];
    //             let p2 = [Math.sin(t + dd) * Math.cos(r), Math.sin(t + dd) * Math.sin(r), Math.cos(t + dd)];
    //             let p3 = [Math.sin(t) * Math.cos(r + dd), Math.sin(t) * Math.sin(r + dd), Math.cos(t)];
    //             let p4 = [Math.sin(t + dd) * Math.cos(r + dd), Math.sin(t + dd) * Math.sin(r + dd), Math.cos(t + dd)];
    //             let uv1 = [t / Math.PI, r / (2 * Math.PI)];
    //             let uv2 = [(t + dd) / Math.PI, r / (2 * Math.PI)];
    //             let uv3 = [t / Math.PI, (r + dd) / (2 * Math.PI)];
    //             let uv4 = [(t + dd) / Math.PI, (r + dd) / (2 * Math.PI)];
    //             let v = [];
    //             let uv = [];
    //             v = v.concat(p1);
    //             uv = uv.concat(uv1);
    //             v = v.concat(p2);
    //             uv = uv.concat(uv2);
    //             v = v.concat(p4);
    //             uv = uv.concat(uv4);
    //             drawTriangle3DUVNormal(v, uv, v);
    //             v = [];
    //             uv = [];
    //             v = v.concat(p1);
    //             uv = uv.concat(uv1);
    //             v = v.concat(p4);
    //             uv = uv.concat(uv4);
    //             v = v.concat(p3);
    //             uv = uv.concat(uv3);
    //             drawTriangle3DUVNormal(v, uv, v);
    //         }
    //     }
    // }

    function

    render() {
        const vertexBuffer = gl.createBuffer();
        const uvBuffer = gl.createBuffer();
        const normalBuffer = gl.createBuffer();
        let rgba = this.color;
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        const gridSize = 10;
        const delta = Math.PI / gridSize;

        for (let t = 0; t < Math.PI; t += delta) {
            for (let r = 0; r < 2 * Math.PI; r += delta) {
                const p1 = [Math.sin(t) * Math.cos(r), Math.sin(t) * Math.sin(r), Math.cos(t)];
                const p2 = [Math.sin(t + delta) * Math.cos(r), Math.sin(t + delta) * Math.sin(r), Math.cos(t + delta)];
                const p3 = [Math.sin(t) * Math.cos(r + delta), Math.sin(t) * Math.sin(r + delta), Math.cos(t)];
                const p4 = [Math.sin(t + delta) * Math.cos(r + delta), Math.sin(t + delta) * Math.sin(r + delta), Math.cos(t + delta)];
                const uv1 = [t / Math.PI, r / (2 * Math.PI)];
                const uv2 = [(t + delta) / Math.PI, r / (2 * Math.PI)];
                const uv3 = [t / Math.PI, (r + delta) / (2 * Math.PI)];
                const uv4 = [(t + delta) / Math.PI, (r + delta) / (2 * Math.PI)];

                let vertices = [...p1, ...p2, ...p4];
                const uv = [...uv1, ...uv2, ...uv4];
                const normals = [...p1, ...p2, ...p4];

                drawTriangle3DUVNormal(vertices, uv, normals, vertexBuffer,uvBuffer, normalBuffer);

                vertices = [...p1, ...p4, ...p3];
                drawTriangle3DUVNormal(vertices, uv, normals, vertexBuffer,uvBuffer, normalBuffer);

            }
        }
    }
}