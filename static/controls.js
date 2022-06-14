
const MyPointerLockControls = PointerLockControls

let camera, scene, renderer, controls

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();


function init(camera, scene) {

    this.camera = camera
    this.scene = scene
    controls = new MyPointerLockControls(camera, document.body);

    const instructions = document.getElementById('root')

    instructions.addEventListener('click', function () {

        controls.lock();

    });


    scene.add(controls.getObject());

    const onKeyDown = function (event) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'Space':
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;

        }

    };

    const onKeyUp = function (event) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;

        }

    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

function animate() {
    const time = performance.now();
    if (controls.isLocked === true) {
        const delta = (time - prevTime) / 200;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
        //
        // console.log(game.camera.position)
        net.send("move", {name: ui.name, position: game.camera.position})
        decodeValsForMap(game.camera.position.x, game.camera.position.z)
    }

    function decodeValsForMap(i, j) {
        let x = Math.round((i - game.offset) / game.side)
        let y = Math.round((j - game.offset) / game.side)
        // console.log(x, y)
        if (ui.position.x !== x || ui.position.y !== y){
            ui.position = {x: x, y: y}
            ui.smallTablePrinter()
        }

    }

    prevTime = time;
}

