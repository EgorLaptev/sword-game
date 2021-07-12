'use strict';

import Timer from "./Timer.js";
import Knight from "./Knight.js";
import Doge from "./Doge.js";
import Grinch from "./Grinch.js";
import Elf from "./Elf.js";
import Panel from "./Panel.js";
import Enemy from "./Enemy.js";

export default class Game {

    static player   = Knight;

    static paused   = false;
    static started  = false;

    static cnv = null;
    static ctx = null;

    static _pressedKeys = {
        65: false,
        68: false
    };

    static start() {

        this.player.y = this.cnv.height-this.player.height-50;

        Panel.username.textContent = this.player.name;

        Timer.start();

        this.started = true;
        this.controls();

        this.loop();

    }

    static loop() {

        if( !Game.paused && Game.started ) {
            Game.generation();
            Game.movement();
            Game.collisions();
            Game.render();
        }

        requestAnimationFrame(Game.loop);

    }

    static render() {

        this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);

        // Player
        let playerImage = new Image();
        playerImage.src = this.player.skin;

        this.ctx.drawImage(playerImage, this.player.x, this.player.y, this.player.width, this.player.height);

        // Doges
        let dogeImage = new Image();
        dogeImage.src = Doge.skin;

        for ( const doge of Doge.all )
            this.ctx.drawImage(dogeImage, doge.x, doge.y, Doge.w, Doge.h);

        // Elf
        let elfImage = new Image();
        elfImage.src = Elf.skin;

        for ( const elf  of Elf.all )
            this.ctx.drawImage(elfImage, elf.x, elf.y, Elf.w, Elf.h);

        // Grinch
        let grinchImage = new Image();
        grinchImage.src = Grinch.skin;

        for ( const grinch of Grinch.all )
            this.ctx.drawImage(grinchImage, grinch.x, grinch.y, Grinch.w, Grinch.h);

        // Panel
        Panel.mp.textContent = this.player.mp;
        Panel.health.textContent = this.player.hp;
        Panel.kills.textContent = this.player.kills;
        Panel.time.textContent = `${ (Timer.time/60 < 10) ? '0' : ''}${Math.floor(Timer.time/60)}:${ (Timer.time%60 < 10) ? '0' : '' }${Timer.time%60}`;

    }

    static movement() {

        // Player
        if(this._pressedKeys[65]) this.player.x -= this.player.speed;
        if(this._pressedKeys[68]) this.player.x += this.player.speed;

        // Enemies
        for ( const enemy of Enemy.all) {
            const dist = Knight.x - enemy.x;
            enemy.x += enemy.speed * Math.sign( dist );
        }

    }

    static collisions() {

    }

    static controls() {

        document.addEventListener('keydown', evt => {

            switch (evt.keyCode) {
                case 27: { // Esc ( Pause )
                    (this.paused) ? this.resume() : this.pause();
                    break;
                }
                case 65: { // A ( Walking left )
                    this._pressedKeys[65] = true;
                    break;
                }
                case 68: { // D ( Walking right )
                    this._pressedKeys[68] = true;
                    break;
                }
            }

        });

        document.addEventListener('keyup', evt => {

            switch (evt.keyCode) {
                case 65: { // A ( Walking left )
                    this._pressedKeys[65] = false;
                    break;
                }
                case 68: { // D ( Walking right )
                    this._pressedKeys[68] = false;
                    break;
                }
            }

        });

    }

    static generation() {

        let enemiesCount = Doge.all.length + Elf.all.length + Grinch.all.length;

        if( enemiesCount >= 10)  return false;

        let rand = Math.random();

        if(rand >= .6) Grinch.generate( 100, this.cnv.width-100, this.cnv.height-Grinch.h-50);
        else if(rand >= .3) Elf.generate(100, this.cnv.width-100, this.cnv.height-Elf.h-50);
        else if(rand >= 0) Doge.generate(100, this.cnv.width-100, this.cnv.height-Doge.h-50);

    }

    static pause() {
        this.paused = true;
        Timer.stop();
    }

    static resume() {
        this.paused = false;
        Timer.start();
    }

    static end() {

    }

}