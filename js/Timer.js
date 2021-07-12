'use script';

export default class Timer {

    static time = 0; // In seconds
    static _timer;
    static speed = 1000; // In ms

    static start( fromTime = this.time) {

        this.time = fromTime;
        this._timer = setInterval(() => this.time++ , this.speed);

        return true;

    }

    static stop() {
        clearInterval(this._timer);
        return true;
    }

}