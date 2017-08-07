var SlotGame_mk2 = SlotGame_mk2 || {};

SlotGame_mk2.Slot = function (letters2, state) {
    // Phaser.Sprite.prototype.call();
    this.letters2 = letters2;
    this.state = state;

    this.selector2 = this.letters2.children[Math.floor(Math.random() * 8)];

this.update();
};

SlotGame_mk2.Slot.prototype = Object.create(Phaser.Sprite.prototype);
SlotGame_mk2.Slot.prototype.constructor = SlotGame_mk2.Slot;

SlotGame_mk2.Slot.prototype.slotRoller1 = function () {


    this.selector2.animations.add('rotate');
    this.selector2.animations.play('rotate', 40, false);


};

SlotGame_mk2.Slot.prototype.changeSelector =  function () {
    this.selector2 = this.letters2.children[Math.floor(Math.random() * 8)];
    this.selector2.anchor.setTo(0.5);
    this.selector2.alpha = 1;
    // this.selector.position.x = this.game.world.centerX;
    // this.selector.position.y = this.game.world.centerY + 240;
};

SlotGame_mk2.Slot.prototype.update = function () {
    Phaser.State.prototype.update.call();
    this.selector2.x = this.state.game.world.centerX - 300;
    this.selector2.y += 30;


    if (this.selector2.y > 900) {
        this.changeSelector();
        this.selector2.y = -200;
    }
};
