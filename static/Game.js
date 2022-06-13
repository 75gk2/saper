class Game {
    fieldsState = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ] //0 - covered, 1 - uncovered,  2 - destructed, 3 - demined
    fieldsThreeArray = []
    grassCovered = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load("./assets/grassGrid.jpg"),
    })
    grassUncovered = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load("./assets/grassUncovered.jpg"),
    })
    grassDestructed = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load("./assets/grassDestructed.jpg"),
    })
    grassDemined = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load("./assets/grassDemined.jpg"),
    })
    side = 50
    blocksNum = 24
    offset = this.side / 2 - this.side * this.blocksNum / 2
    geometry = new THREE.PlaneGeometry(this.side, this.side)


    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(0, 1500, 0)
        this.camera.lookAt(this.scene.position)
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x385380);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // const axes = new THREE.AxesHelper(1000)
        // this.scene.add(axes)
        const geometry = new THREE.BoxGeometry( 100, 100, 100 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.opponent = new THREE.Mesh( geometry, material );
        this.scene.add(this.opponent);


        init(this.camera,this.scene);
        this.render()
        this.renderGround()
        this.raycaster()
        const root = document.getElementById("root")
        root.append(this.renderer.domElement);
        // root.addEventListener("click",()=>{
        // })

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);


        }, false);
        this.controls = new MyPointerLockControls(this.camera, document.body);


// // add event listener to show/hide a UI (e.g. the game's menu)

        this.controls.addEventListener('lock', function () {
            console.log("lock")
            // menu.style.display = 'none';

        });

        this.controls.addEventListener('unlock', function () {

            console.log("unlock")
            // menu.style.display = 'block';

        });

    }

    render = () => {
        animate();
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }

    renderGround = () => {
        for (let j = 0; j < this.blocksNum; j++) {
            this.fieldsThreeArray.push([])
            for (let i = 0; i < this.blocksNum; i++) {
                const field = new THREE.Mesh(this.geometry, this.grassCovered)
                field.position.set(i * this.side + this.offset, 0, j * this.side + this.offset)
                field.data = {x: j, y: i, state: 0}
                field.rotation.x = Math.PI / 2
                this.scene.add(field)
                this.fieldsThreeArray[j].push(field)
            }
        }
    }

    updateFieldsState(fields) {
        for (let i = 0; i < this.blocksNum; i++)
            for (let j = 0; j < this.blocksNum; j++) {
                if (this.fieldsState[i][j] !== fields[i][j]) {
                    switch (fields[i][j]) {
                        case 0:
                            this.fieldsThreeArray[i][j].material = this.grassCovered;
                            break;
                        case 1:
                            this.fieldsThreeArray[i][j].material = this.grassUncovered;
                            break;
                        case 2:
                            this.fieldsThreeArray[i][j].material = this.grassDestructed;
                            break;
                        case 3:
                            this.fieldsThreeArray[i][j].material = this.grassDemined;
                            break;
                    }
                    this.fieldsThreeArray[i][j].data.state = fields[i][j]
                }
            }
        this.fieldsState = fields
    }

    raycaster() {
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2()
        window.oncontextmenu = () => false
        window.addEventListener("mousedown", (e) => {
            let x = e.clientX
            let y = e.clientY
            x = window.innerWidth/2
            y = window.innerHeight/2
            // canvas.requestPointerLock()
            mouseVector.x = (x / window.innerWidth) * 2 - 1;
            mouseVector.y = -(y / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, this.camera);
            const intersects = raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0) {
                if (e.button === 2)
                    this.demining(intersects[0].object)
                else
                    this.clicked(intersects[0].object)
            }
        });
    }

    clicked(threeObj) {
        // console.log(threeObj)
        // if (threeObj.data.state === 0) {
        //     console.log("2")
        console.log("uncover",threeObj.data)
        net.send("uncovering", {x: threeObj.data.x, y: threeObj.data.y, user: ui.name})
        // }
    }

    demining(threeObj) {
        console.log("demine",threeObj.data)
        net.send("demining", {x: threeObj.data.x, y: threeObj.data.y, user: ui.name})
    }

    opponentMoved(position){
        console.log(position)
        this.opponent.position.set(position.x,50,position.z)
    }
}
