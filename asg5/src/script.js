(function () {
    "use strict";
    let camera, scene, renderer, controls;
    let geometry, material;
    let geometries = [];
    const size = 6;
    const orientationPortrait = window.innerWidth < window.innerHeight;

    init();
    animate();

    function init() {
        const container = document.createElement("div");
        document.body.appendChild(container);
        scene = new THREE.Scene();
        scene.background = 0x000000;
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 500);
        if (orientationPortrait) {
            camera.position.set(0, 4, 10);
        } else {
            camera.position.set(0, 3, 7.5);
        }
        camera.lookAt(0, 0, 0);
        const light = new THREE.AmbientLight(0xffffff, 0.1);
        scene.add(light);
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.2);
        scene.add(hemisphereLight);
        const spotLight = new THREE.SpotLight(0xffffff, 1, 18, Math.PI / 7, 1, 0.5);
        spotLight.position.set(0, 10, 5);
        spotLight.target.position.set(0, 0, 0);
        spotLight.target.updateMatrixWorld();
        spotLight.castShadow = true;
        scene.add(spotLight);
        let wrap = new THREE.Mesh(new THREE.SphereGeometry(50, 4, 4), new THREE.MeshBasicMaterial({
            color: "royalblue", side: THREE.BackSide
        }));
        scene.add(wrap);
        geometries = [];
        material = new THREE.MeshLambertMaterial({
            color: "forestgreen"
        });
        geometry = new THREE.IcosahedronGeometry(13, 3);
        geometry.translate(0, 17, 0);
        geometries.push(geometry);
        //
        geometry = new THREE.IcosahedronGeometry(5.0, 0);
        geometry.translate(0, 7.8, 0);
        geometries.push(geometry);
        //
        geometry = new THREE.IcosahedronGeometry(2.5, 0);
        geometry.translate(-4, 6, 0);
        geometries.push(geometry);
        geometry = new THREE.IcosahedronGeometry(2, 0);
        geometry.translate(4, 6, 0);
        geometries.push(geometry);
        geometry = THREE.BufferGeometryUtils.mergeBufferGeometries(geometries);

        const tree = new THREE.Mesh(geometry, material);
        geometry = new THREE.CylinderGeometry(0.7, 1, 5, 8);
        geometry.translate(0, 1.5, 0);
        geometries.push(geometry);
        material = material.clone();
        material.color.set("saddlebrown");
        const trunk = new THREE.Mesh(geometry, material);
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);
        tree.position.set(-2, -0.3, -3);
        scene.add(tree);
        geometries = [];
        geometry = new THREE.CapsuleGeometry(0.1, 0.1, 4, 10);
        geometry.translate(0, 0.1, 1);
        geometries.push(geometry);
        geometry = new THREE.CapsuleGeometry(0.15, 0.8, 4, 10);
        geometry.rotateZ(Math.PI / 6);
        geometry.translate(0.5 + 0.1, 0.9 + 0.15, 0);
        geometries.push(geometry);
        geometry = new THREE.CapsuleGeometry(0.15, 0.8, 4, 10);
        geometry.rotateZ(-Math.PI / 6);
        geometry.translate(-0.5 - 0.1, 0.9 + 0.15, 0);
        geometries.push(geometry);
        geometry = new THREE.SphereGeometry(0.5, 10, 10);
        geometry.translate(0, 1.2 + 0.9, 0);
        geometries.push(geometry);
        geometry = new THREE.CapsuleGeometry(0.15, 0.5, 4, 8);
        geometry.translate(0.2, 1.8 + 0.9, 0);
        geometries.push(geometry);
        geometry = new THREE.CapsuleGeometry(0.15, 0.5, 4, 8);
        geometry.translate(-0.2, 1.8 + 0.9, 0);
        geometries.push(geometry);
        geometry = THREE.BufferGeometryUtils.mergeBufferGeometries(geometries);
        material = material.clone();
        material.color.set("#f6bfbc");
        geometry = new THREE.SphereGeometry(0.15, 5, 5);
        geometry.translate(0, -0.3 + 0.9, -0.5);
        geometries.push(geometry);

        geometry = new THREE.CapsuleGeometry(0.2, 0.5, 4, 10);
        geometry.translate(0, -0.25, 0);
        material = material.clone();
        material.color.set("#f6bfbc");
        geometry = new THREE.CylinderGeometry(0, size * 1.1, 0.5, 50); //5, size * 1.1, 0.5, 50
        material = material.clone();
        material.color.set("olivedrab");
        const floor = new THREE.Mesh(geometry, material);
        floor.receiveShadow = true;
        floor.position.set(0, -0.25, 0);
        floor.name = "floor";
        scene.add(floor);
        let maxDistance;
        if (orientationPortrait) {
            maxDistance = 18;
            camera.position.set(0, 3, 15);
        } else {
            maxDistance = 18;
        }
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.autoRotate = false; //true
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.minDistance = 2;
        controls.maxDistance = maxDistance;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(0, size / 4, 0);
        controls.update();
        window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        render();
    }

    function render() {
        renderer.render(scene, camera);
    }
})();