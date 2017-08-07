var SlotGame_mk2 = SlotGame_mk2 || {};

SlotGame_mk2.game = new Phaser.Game(1000, 497, Phaser.AUTO);

SlotGame_mk2.GameState = {
    init: function () {

        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.stage.backgroundColor = 'eee8aa';

    },

    preload: function () {
        this.game.load.image('background', 'assets/images/Background.png');
        this.game.load.image('gameMachine', 'assets/images/gameMachine.png');


        this.game.load.image('letter1', 'assets/images/j.png');
        this.game.load.image('letter2', 'assets/images/q.png');
        this.game.load.image('letter3', 'assets/images/k.png');
        this.game.load.image('letter4', 'assets/images/a.png');

        this.game.load.image('number1', 'assets/images/3.png');
        this.game.load.image('number2', 'assets/images/4.png');
        this.game.load.image('number3', 'assets/images/5.png');
        this.game.load.image('number4', 'assets/images/6.png');

        this.game.load.image('winline', 'assets/images/winline.png');


        this.game.load.image('spinBtn', 'assets/images/Spin.png');


    },

    create: function () {

        this.min = 12;
        this.max = 18;
        this.flag = true;

        this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 20, 'background');
        this.background.anchor.setTo(0.5);
        this.background.scale.setTo(0.9);

        this.gameMachine = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gameMachine');
        this.gameMachine.scale.setTo(0.9);
        this.gameMachine.anchor.setTo(0.5);


        this.spinBtn = this.add.button(this.game.world.centerX + 430, this.game.world.centerY, 'spinBtn', this.startSpin, this);
        this.spinBtn.anchor.setTo(0.5);


        this.winline = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'winline');
        this.winline.anchor.setTo(0.5);
        this.winline.scale.setTo(0.9, 1);
        this.winline.alpha = 0;

        this.J = this.add.sprite(this.game.world.centerX, -30, 'letter1');
        this.Q = this.add.sprite(this.game.world.centerX, -30, 'letter2');
        this.K = this.add.sprite(this.game.world.centerX, -30, 'letter3');
        this.A = this.add.sprite(this.game.world.centerX, -30, 'letter4');

        this.J3 = this.add.sprite(this.game.world.centerX - 235, -30, 'letter1');
        this.Q3 = this.add.sprite(this.game.world.centerX - 235, -30, 'letter2');
        this.K3 = this.add.sprite(this.game.world.centerX - 235, -30, 'letter3');
        this.A3 = this.add.sprite(this.game.world.centerX - 235, -30, 'letter4');


        this.J5 = this.add.sprite(this.game.world.centerX + 235, -30, 'letter1');
        this.Q5 = this.add.sprite(this.game.world.centerX + 235, -30, 'letter2');
        this.K5 = this.add.sprite(this.game.world.centerX + 235, -30, 'letter3');
        this.A5 = this.add.sprite(this.game.world.centerX + 235, -30, 'letter4');


        this.number1 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'number1');
        this.number1.anchor.setTo(0.5);
        this.number1.alpha = 0;
        this.number1.scale.setTo(0.6);

        this.number2 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'number2');
        this.number2.anchor.setTo(0.5);
        this.number2.alpha = 0;
        this.number2.scale.setTo(0.6);

        this.number3 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'number3');
        this.number3.anchor.setTo(0.5);
        this.number3.alpha = 0;
        this.number3.scale.setTo(0.6);

        this.number4 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'number4');
        this.number4.anchor.setTo(0.5);
        this.number4.alpha = 0;
        this.number4.scale.setTo(0.6);


        this.letters = this.add.group();
        this.letters.add(this.J);
        this.letters.add(this.Q);
        this.letters.add(this.K);
        this.letters.add(this.A);

        this.letters2 = this.add.group();
        this.letters2.add(this.J3);
        this.letters2.add(this.Q3);
        this.letters2.add(this.K3);
        this.letters2.add(this.A3);


        this.letters3 = this.add.group();
        this.letters3.add(this.J5);
        this.letters3.add(this.Q5);
        this.letters3.add(this.K5);
        this.letters3.add(this.A5);


        this.letters.forEach(function (letter) {
            letter.anchor.setTo(0.5);
            letter.scale.setTo(0.9);
            letter.alpha = 0;
        }, this);
        this.letters2.forEach(function (letter) {
            letter.anchor.setTo(0.5);
            letter.scale.setTo(0.9);
            letter.alpha = 0;
        }, this);
        this.letters3.forEach(function (letter) {
            letter.anchor.setTo(0.5);
            letter.scale.setTo(0.9);
            letter.alpha = 0;
        }, this);

        this.selector = this.letters.children[Math.floor(Math.random() * 4)];
        this.selector2 = this.letters2.children[Math.floor(Math.random() * 4)];
        this.selector3 = this.letters3.children[Math.floor(Math.random() * 4)];

        this.game.world.bringToTop(this.gameMachine);

        this.slotRoller1();

        this.uiBlocked = false;
        this.startAutoSpin();

    },

    slotRoller1: function () {
        this.selector.animations.add('rotate');
        this.selector.animations.play('rotate', 2, false);
        this.selector2.animations.add('rotate');
        this.selector2.animations.play('rotate', 2, false);
        this.selector3.animations.add('rotate');
        this.selector3.animations.play('rotate', 2, false);

    },

    changeSelector: function () {
        this.selector = this.letters.children[Math.floor(Math.random() * 4)];

    },
    changeSelector2: function () {
        this.selector2 = this.letters2.children[Math.floor(Math.random() * 4)];
    },
    changeSelector3: function () {
        this.selector3 = this.letters3.children[Math.floor(Math.random() * 4)];
    },
    // dice: function () {
    //     var dicer = Math.round(Math.random() * (this.max - this.min)) + this.min;
    //
    //     for (var i = 0; i < dicer; i++) {
    //         this.slotRoller1(this.selector);
    //
    //     }
    // },

    startSpin: function () {
        if (!this.uiBlocked) {
            this.flag = !this.flag;
            this.uiBlocked = true;
        }
    },

    startSpinManual: function () {



    },


    startAutoSpin: function () {
        this.game.time.events.add(3000, this.startSpin, this);
    },
    // createLetter: function (state, x, y, data) {
    //     var letter = this.letters.getFirstExists(false);
    //     if (!letter) {
    //         this.letter = new SlotGame.Letter(this, x, y,  this.ANIMATION_TIME);
    //         this.letters.add(this.letter);
    //     }
    //     else {
    //         this.letter.reset(x, y);
    //     }
    //
    //     return letter;
    // },
    // drawBoard: function () {
    //     var i, j, square, x, y;
    //
    //     var squareBitmap = this.add.bitmapData(220, 220);
    //     squareBitmap.ctx.fillStyle = 'red';
    //     squareBitmap.ctx.fillRect(0, 0, 220, 220);
    //
    //     for (i = 0; i < this.NUM_ROWS; i++) {
    //         for (j = 0; j < this.NUM_COLS; j++) {
    //             x = 276 + j * (220 + 6);
    //             y = 150 + i * (220 + 6);
    //
    //             square = this.add.sprite(x, y, squareBitmap);
    //             square.anchor.setTo(0.5);
    //             square.alpha = 0;
    //
    //             this.createLetter(this, x, y, {
    //                 asset: 'letter' + this.slot1.grid[i][j],
    //                 row: i,
    //                 col: j
    //             }, this.ANIMATION_TIME);
    //         }
    //     }
    //
    //     // this.game.world.bringToTop(this.background);
    //     this.game.world.bringToTop(this.gameMachine)
    // },

    winAnimation: function (selector) {
        this.game.world.bringToTop(this.winline);
        this.uiBlocked = true;


        if (selector.key === 'letter1') {
            this.lineAnimation1 = this.game.add.tween(this.number1);
            this.game.world.bringToTop(this.number1);
            this.lineAnimation1.to({alpha: 1}, 2000);
            this.lineAnimation1.start();
            this.lineAnimation1.onComplete.add(function () {
                var scaleMovement = this.game.add.tween(this.number1.scale);
                scaleMovement.to({x: 1, y: 1}, 4000);
                scaleMovement.start();
            }, this);

        } else if (selector.key === 'letter2') {
            this.game.world.bringToTop(this.number2);
            this.lineAnimation2 = this.game.add.tween(this.number2);
            this.lineAnimation2.to({alpha: 1}, 2000);
            this.lineAnimation2.start();
            this.lineAnimation2.onComplete.add(function () {
                var scaleMovement = this.game.add.tween(this.number2.scale);
                scaleMovement.to({x: 1, y: 1}, 4000);
                scaleMovement.start();

            }, this);


        } else if (this.selector.key === 'letter3') {
            this.game.world.bringToTop(this.number3);
            this.lineAnimation3 = this.game.add.tween(this.number3);
            this.lineAnimation3.to({alpha: 1}, 2000);
            this.lineAnimation3.start();
            this.lineAnimation3.onComplete.add(function () {
                var scaleMovement = this.game.add.tween(this.number3.scale);
                scaleMovement.to({x: 1, y: 1}, 4000);
                scaleMovement.start();

            }, this);

        } else if (this.selector.key === 'letter4') {
            this.game.world.bringToTop(this.number4);
            this.lineAnimation4 = this.game.add.tween(this.number4);
            this.lineAnimation4.to({alpha: 1}, 2000);
            this.lineAnimation4.start();
            this.lineAnimation4.onComplete.add(function () {
                var scaleMovement = this.game.add.tween(this.number4.scale);
                scaleMovement.to({x: 1, y: 1}, 4000);
                scaleMovement.start();

            }, this);

        }

        this.winLineAnimation = this.game.add.tween(this.winline);
        this.winLineAnimation.to({alpha: 1}, 6000);
        this.winLineAnimation.start();
        this.winLineAnimation.onComplete.add(function () {
            this.game.time.events.add(3000, this.gameOver, this);

        }, this);
    },

    isChained: function (selector, selector2, selector3) {
        var isChained = false;
        if (selector.key === selector2.key && selector2.key === selector3.key) {
            isChained = true;
        }

        return isChained;
    },

    gameOver: function () {

        //true restart states, false keep images and preload stuff
        this.game.state.start('GameState', true, false);
    },

    update: function () {
        if (this.flag && !this.uiBlocked) {
            this.selector.y += 40;
            this.selector2.y += 40;
            this.selector3.y += 40;


            if (this.selector.y > 700) {
                this.changeSelector();
                this.selector.y = -200;
            }

            if (this.selector.y < 140) {
                this.selector.alpha = 0;
            } else {
                this.selector.alpha = 1;
            }


            if (this.selector2.y > 700) {
                this.changeSelector2();
                this.selector2.y = -200;
            }

            if (this.selector2.y < 140) {
                this.selector2.alpha = 0;
            } else {
                this.selector2.alpha = 1;
            }

            if (this.selector3.y > 700) {
                this.changeSelector3();
                this.selector3.y = -200;
            }

            if (this.selector3.y < 140) {
                this.selector3.alpha = 0;
            } else {
                this.selector3.alpha = 1;
            }

        } else {
            this.selector.y = this.game.world.centerY;
            this.selector2.y = this.game.world.centerY;
            this.selector3.y = this.game.world.centerY;
            this.isChainedVar = this.isChained(this.selector, this.selector2, this.selector3);
            console.log(this.isChainedVar);
            if (this.isChainedVar) {
                this.winAnimation(this.selector);
                this.uiBlocked = true;

            } else {
                this.uiBlocked = false;


            }
        }


    }


};


SlotGame_mk2.game.state.add('GameState', SlotGame_mk2.GameState);
SlotGame_mk2.game.state.start('GameState');