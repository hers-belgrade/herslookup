function Lookup(){
  this.map = {};
}
Lookup.prototype.add = function(name,value){
  this.map[name] = value;
};
Lookup.prototype.get = function(name){
  return this.map[name];
};
Lookup.prototype.remove = function(name){
  delete this.map[name];
};

module.exports = Lookup;
