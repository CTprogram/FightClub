class Character {
  constructor({ postion, color, width, height, attackBoxOffset }) {
    this.postion = postion;
    this.velocity = { x: 0, y: 0 };
    this.color = color;
    this.width = width;
    this.height = height;
    this.attackBoxOffset = attackBoxOffset;
    this.attacking = false;
    this.health = 100;
  }
}

module.exports = {
  Character,
};
