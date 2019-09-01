'use strict';

module.exports = function() {
    console.info("Setting env variables");
    if(!process.env.PORT) {
        process.env.PORT = 7000;
    }
};
