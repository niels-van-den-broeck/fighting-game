import { GAME_HEIGHT, GAME_WIDTH } from '../constants/game';

class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  collidesWith(line) {
    const denominator =
      (line.y2 - line.y1) * (this.x2 - this.x1) -
      (line.x2 - line.x1) * (this.y2 - this.y1);

    if (denominator === 0) return false;

    let a = this.y1 - line.y1;
    let b = this.x1 - line.x1;
    const numerator1 = (line.x2 - line.x1) * a - (line.y2 - line.y1) * b;
    const numerator2 = (this.x2 - this.x1) * a - (this.y2 - this.y1) * b;
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    return a > 0 && a < 1 && b > 0 && b < 1;
  }
}
class Rect {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  collidesWith(rect) {
    return (
      this.x <= rect.x + rect.width &&
      this.x + this.width >= rect.x &&
      this.y <= rect.y + rect.height &&
      this.y + this.height >= rect.y
    );
  }

  /**
   * Returns which side of the given rectangle touches this rectangle
   */
  collidesWithSide(rect) {
    const dx = this.x + this.width / 2 - (rect.x + rect.width / 2);
    const dy = this.y + this.height / 2 - (rect.y + rect.height / 2);
    const width = (this.width + rect.width) / 2;
    const height = (this.height + rect.height) / 2;
    const crossWidth = width * dy;
    const crossHeight = height * dx;
    let collision = 'none';
    //
    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
      if (crossWidth > crossHeight) {
        collision = crossWidth > -crossHeight ? 'bottom' : 'left';
      } else {
        collision = crossWidth > -crossHeight ? 'right' : 'top';
      }
    }

    return collision;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export const scene = {
  terrain: [
    new Rect(0, GAME_HEIGHT - 50, GAME_WIDTH, 50, 'green'),
    new Rect(-1, 0, 1, GAME_HEIGHT, 'green'),
    new Rect(GAME_WIDTH + 1, 0, 1, GAME_HEIGHT, 'green'),
  ],
  collidesWith(rect) {
    for (const key in this.terrain) {
      if (this.terrain[key].collidesWith(rect)) {
        return this.terrain[key];
      }
    }

    return undefined;
  },
  draw(ctx) {
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    for (const key in this.terrain) {
      this.terrain[key].draw(ctx);
    }
  },
};
