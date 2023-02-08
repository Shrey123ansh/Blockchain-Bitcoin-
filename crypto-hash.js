const crypto = require('crypto')

const cryptoHash = (...inputs)=>{
    const hash = crypto.createHash('sha256');
    hash.update(inputs.join(""));
    return hash.digest("hex");
};

// result = cryptoHash("hello","world");
// result = cryptoHash("world","hello");
// console.log(result);
module.exports = cryptoHash;