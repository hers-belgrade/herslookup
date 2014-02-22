var PlainLookup = require('./PlainLookup');
//var Lookup = require('Lookup');

var lu = new PlainLookup();

function randomString(len){
  var ret = '';
  for(var i = 0; i<len; i++){
    ret+=String.fromCharCode(('A').charCodeAt(0)+Math.random()*50);
  }
  return ret;
};

function _now(){
  var hrt = process.hrtime();
  return hrt[0]+hrt[1]/1000000000;
}

var start = _now();
var now = _now();
var mu = 0;
var load = 6200000;
for(var i=0; i<load; i++){
  if(i%100000===0){
    now = _now();
    mu = process.memoryUsage().rss/1024/1024;
    console.log(i/1000,'Kinserts done at',i/(now-start),'insertions/sec',mu,'MB used, that is',mu/i*1000000,'B/pair');
  }
  lu.add(randomString(5+Math.random()*5),randomString(5+Math.random()*10));
}
console.log(load,'insertions done');
start = _now();
now = _now();
var lap = now;
var searches = 0;
var hits = 0;
var maxsd = 0;
while(hits<100000){
  var key = randomString(5+Math.random()*5);
  searches++;
  if(searches%1000000===0){
    searches=0;
    //now = _now();
    //console.log(searches/(now-start),'searches/sec');
  }
  now = _now();
  var val = lu.get(key);
  var sd = _now()-now;
  if(sd>maxsd){
    maxsd = sd;
    console.log('maximum search time',maxsd*1000,'msec');
  }else if(sd>1000){
    console.log('search time',sd,'!');
  }
  if(now-lap>10){
    console.log(process.memoryUsage().rss/1024/1024,'MB used');
    lap = now;
  }
  if(lu.get(key)){
    //console.log('found',key,'removing it now');
    lu.add(randomString(5+Math.random()*5),randomString(5+Math.random()*10));
    hits++;
    lu.remove(key);
  }else{
    lu.add(key,'bla');
    lu.remove(key);
  }
}
