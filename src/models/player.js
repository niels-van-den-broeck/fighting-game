import { GAME_HEIGHT } from "../constants/game";

const GRAVITY = 2;

export class Player {
    constructor(scene) {
        this.x = 0;
        this.y = GAME_HEIGHT - 100;
        this.width = 32;
        this.height = 150;
        this.color = 'red';
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.scene = scene

        this.pressedKeys = [];

        this.addEvents();
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    updateMovement() {
        if (this.pressedKeys.length) {
            switch(this.pressedKeys[0]) {
                case 'd':
                    this.velocity.x = 5;
                    break;
                case 'a':
                    this.velocity.x = -5;
                    break;
            }
        }
    }

    update() {
        this.updateMovement();

        this.y = this.y + this.velocity.y;
        this.x += this.velocity.x;
        
        const collisionRect = this.scene.collidesWith(this)
        if (!collisionRect) this.velocity.y += GRAVITY;
        else {
            this.y = collisionRect.y - this.height;
            this.velocity.y = 0;
        }
    }

    addEvents() {
        window.addEventListener('keydown', (e) => { 
            this.pressedKeys.unshift(e.key);                      
            // one time movement
            if (this.pressedKeys.filter(x => x === e.key).length > 1) return;
            if (e.key === ' ' && this.velocity.y === 0) this.velocity.y = -30;
        });

        window.addEventListener('keyup', (e) => {
            this.pressedKeys = this.pressedKeys.filter(key => key !== e.key);
            switch(e.key) {
                case 'd':
                case 'a':
                    if (!this.pressedKeys.includes(e.key)) this.velocity.x = 0;
                    break;
            }
        });
    }
}