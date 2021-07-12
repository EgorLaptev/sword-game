'use strict';

import Enemy from "./Enemy.js";

export default class Elf extends Enemy {

    static h = 200;
    static w = 100;

    static all = [];

    damage = 5;
    health = 30;
    speed  = 2;

    static skin = '../media/characters/enemies/elf/sprites/Idle/Idle_000.png';

    constructor(x, y) {
        super(x, y);
        Elf.all.push(this);
        Enemy.all.push(this);
    }

    static generate(minX, maxX, y) {
        new Elf( Math.random() * (maxX - minX) + minX, y );
    }

}