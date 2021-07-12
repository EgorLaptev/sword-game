'use strict';

export default class File {

    static exists(url, resolve, reject = () => {}) {
        fetch(url).then( resp => (resp.status != 404) ? resolve() : reject() );
    }

}