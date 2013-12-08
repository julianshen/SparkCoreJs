SparkCoreJs
======
What is it?
------
A rest client lib to connect to [Spark Tinker API](http://docs.spark.io/#/start/tinkering-with-tinker-the-tinker-api) with node.js
Example usage
------
```javascript
var SparkCore = require('./spark_core');
var util = require('util');

var juliansCore = new SparkCore({
    device_id: 'YOUR_DEVICE_ID',
    access_token: 'YOUR_ACCESS_TOKEN'
});
var val = 0;
(function blink() {
    val = (val + 1) % 2;
    juliansCore.digitalWrite('D7', val, function(data) {
        console.log(util.inspect(data));
        setTimeout(blink, 1000);
    }, function(error) {
        console.log('error');
        console.log(error);
    });
})();
```
