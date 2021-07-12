'use strict';

import Enemy from "./Enemy.js";

export default class Doge extends Enemy {

    static h = 100;
    static w = 100;

    static all = [];

    static skin = '../media/characters/enemies/dog/sprites/run/1.png';

    damage = 2;
    health = 15;
    speed  = 3;

    constructor(x, y) {

        super(x, y);

        Doge.all.push(this);
        Enemy.all.push(this);
    }

    static generate(minX, maxX, y) {
        new Doge( Math.random() * (maxX - minX) + minX, y );
    }

}