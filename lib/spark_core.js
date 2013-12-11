var restler = require('restler');
var util = require('util');
var endpoint = "https://api.spark.io/v1/devices/"

var debug_flag = true;


function debug(data) {
    if (debug_flag) {
        console.log(util.inspect(data));
    }
}

function request(device_no, access_token, command, params, success, error) {
    var url = endpoint + device_no + "/" + command;
    var req;

    restler.post(url, {
        'data': {
            'access_token': access_token,
            'params': params
        }
    }).once('success', success ? success : debug).once('fail', error ? error : debug).once('error', error ? error : debug);
}

function SparkCore(config) {
    if (!config) {
        config = {};
    }

    this.config = config;

}

SparkCore.prototype = {
    _checkConfig: function(error) {
        if (!this.config) {
            if (error) {
                error(new Error('Device ID and access token are not set'));
            }
            return false;
        }

        if (!this.config.device_id) {
            if (error) {
                error(new Error('Device ID is not set'));
            }
            return false;
        }

        if (!this.config.access_token) {
            if (error) {
                error(new Error('Access token is not set'));
            }
            return false;
        }
        return true;
    },
    digitalWrite: function(pin, value, success, error) {
        if (this._checkConfig(error)) {
            var params = pin + ',' + (value ? 'HIGH' : 'LOW');
            request(this.config.device_id, this.config.access_token, 'digitalwrite', params, success, error);
        }
    },
    digitalRead: function(pin, success, error) {
        if (this._checkConfig(error)) {
            var params = pin;
            request(this.config.device_id, this.config.access_token, 'digitalread', params, success, error);
        }
    },
    analogWrite: function(pin, value, success, error) {
        if (this._checkConfig(error)) {
            var params = pin + ',' + value;
            request(this.config.device_id, this.config.access_token, 'analogwrite', params, success, error);
        }
    },
    analogRead: function(pin, success, error) {
        if (this._checkConfig(error)) {
            var params = pin;
            request(this.config.device_id, this.config.access_token, 'analogread', params, success, error);
        }
    },
    call: function(command, params, success, error) {
        if (this._checkConfig(error)) {
            request(this.config.device_id, this.config.access_token, command, params, success, error);
        }
    }
}

module.exports = SparkCore;
