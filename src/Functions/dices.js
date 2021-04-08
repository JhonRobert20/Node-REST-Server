function throwDices() {
  var dices = 0;
  for ( var i = 0; i < 2; i++) {
    dices += Math.floor( Math.random() * 6 ) + 1;
  }
  return dices;
}



// csv 
// modelo de asteroide
// crud
// autentificacion
// testing
// modelo cliente, nombre cliento y posicion
// mock ?? Development, produccion, testing

module.exports.throwDices = throwDices;