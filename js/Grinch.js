'use strict';

import Enemy from "./Enemy.js";

export default class Grinch extends Enemy {

    static h = 200;
    static w = 100;

    static all = [];

    damage = 10;
    health = 60;
    speed  = 1;

    static skin = '../media/characters/enemies/greench/sprites/Run/Run_000.png';

    constructor(x, y) {
        super(x, y);
        Grinch.all.push(this);
        Enemy.all.push(this);
    }

    static generate(minX, maxX, y) {
        new Grinch( Math.random() * (maxX - minX) + minX, y );
    }

}