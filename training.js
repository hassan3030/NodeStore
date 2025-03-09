const bcrypt = require("bcryptjs");

// 1- To hash a password:
const pass = `123`;
const salt = bcrypt.genSaltSync(20); // # of hasing add to pass
const hash = bcrypt.hashSync(pass, salt); // encryption to pass + hash 
console.log(`pass:${pass}`);
console.log(`salt pass:${salt}`);
console.log(`hash pass:${hash}`);

// 2- compare hash from your pass
const compare = bcrypt.compareSync(pass, hash); // true
console.log(`compare pass:${compare}`);