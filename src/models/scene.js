import { GAME_HEIGHT, GAME_WIDTH } from "../constants/game";

class Rect {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    collidesWith(rect) {
        return this.x <= rect.x + rect.width &&
            this.x + this.width >= rect.x &&
            this.y <= rect.y + rect.height &&
            this.y + this.height >= rect.y;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}

export const scene = {
    terrain: [
        new Rect(0, GAME_HEIGHT - 50, GAME_WIDTH, 50, 'green'),
        new Rect(-1, 0, 10, GAME_HEIGHT, 'green'),
        new Rect(GAME_WIDTH - 10, 0, 10, GAME_HEIGHT, 'green'),
    ],
    collidesWith(rect) {
        for (const terrain of this.terrain) {
            if (terrain.collidesWith(rect)) return terrain;
        }

        return undefined;
    },
    draw(ctx) {
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        for (const terrain of this.terrain) {
            terrain.draw(ctx);
        }
    }
}