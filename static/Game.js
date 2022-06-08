class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(0, 1500, 0)
        this.camera.lookAt(this.scene.position)
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x444444);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        const axes = new THREE.AxesHelper(1000)
        // this.scene.add(axes)

        this.render()
        this.renderGround()
        document.getElementById("root").append(this.renderer.domElement);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }

    renderGround = () => {

        const grass = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("./assets/grassGrid.jpg"),
        })
        const side = 50
        const blocksNum = 20
        const offset = side/2 - side*blocksNum/2
        const geometry = new THREE.PlaneGeometry(side,side)
        for (let j = 0; j < blocksNum; j++)
            for (let i = 0; i < blocksNum; i++) {
                const field = new THREE.Mesh(geometry, grass)
                field.position.set(j * side + offset, 0, i * side + offset)
                field.data = {x: i, y: j}
                field.rotation.x = Math.PI / 2
                this.scene.add(field)
            }
    }
}