'use strict';

import Game from "./Game.js";

Game.cnv = document.getElementById('gameField');
Game.ctx = Game.cnv.getContext('2d');

Game.cnv.width  = window.innerWidth;
Game.cnv.height = window.innerHeight;

Game.start();
