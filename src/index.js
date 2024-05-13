import { GAME_HEIGHT, GAME_WIDTH } from "./constants/game";
import { Player } from "./models/player";
import { scene } from "./models/scene";

const container = document.querySelector('#container');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const scale = Math.min(
        canvas.width / GAME_WIDTH,
        canvas.height / GAME_HEIGHT
    );

    ctx.scale(scale, scale);
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const player = new Player(scene);

setInterval(() => {
    player.update();

    window.requestAnimationFrame(() => {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        scene.draw(ctx);
        player.draw(ctx);
    })
}, 1000 / 60);



