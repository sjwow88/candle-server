const io = require('socket.io-client');
const socket = io('https://wss.live-rates.com/')

var instruments:any = ['BTCUSD'];
//var key = 'XXXXXXX' //YOUR LIVE-RATES SUBSCRIPTION KEY

// if you want to subscribe only specific instruments, add them to the following object, otherwise leave this commented
// var instruments = ['EURUSD', 'USDJPY', 'BTCUSD', 'ETH']

//Use the 'trial' as key to establish a 2-minute streaming connection with real-time data.
//After the 2-minute test, the server will drop the connection and block the IP for an Hour.
const key = 'f92bdeaf6c' 

var LiveRatesConnect =() => {
  socket.on('connect', function() {
    socket.emit('key', key, (data:any) => {
      console.log(data); //RESPONSE FROM SERVER
    });
  });
  
  socket.on('rates', function(msg:any) {
    try {
      let obj = JSON.parse(msg);
  
      // Subscribe only specific rates
      if (typeof instruments === 'undefined' || instruments.length == 0) {
        console.log(obj)
      } else {
        if (instruments.includes(obj.currency)) {
          socket.emit('data',obj);
        }
      }
  
    } catch (e) {
      console.log(msg)
    }
  });
}


export default LiveRatesConnect;