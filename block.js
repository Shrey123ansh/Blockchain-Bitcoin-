const {GENESIS_DATA,MINE_RATE} = require('./config');
const hexToBinary = require("hex-to-binary");
const cryptoHash = require('./crypto-hash.js');

class Block{
    constructor({timestamp,prevHash,hash,data,nonce,difficulty}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
    static mineBlock({prevBlock,data}){
        let hash,timestamp;
        const prevHash = prevBlock.hash;
        let { difficulty } = prevBlock;

        let nonce=0;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty=Block.adjustDifficulty({originalBlock:prevBlock,timestamp});
            hash = cryptoHash(timestamp,prevHash,data,nonce,difficulty)
            }while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));
        
        return new this({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash,
        });
    }
    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty} = originalBlock;

        if(difficulty<1) return 1;
        const difference = timestamp-originalBlock.timestamp;
        if(difference > MINE_RATE) return difficulty-1;
        return difficulty+1;
    }
}

// const block1 = new Block({
//     hash:"21",
//     timestamp:"5645",
//     prevHash:"443e",
//     data:"hello"
// });
// const block2 = new Block("2321","443e","444533e","heertlo");

// const genesisBlock = Block.genesis();
// // console.log(genesisBlock);

// const result = Block.mineBlock({prevBlock: genesisBlock,data: "block2"});
// console.log(result);

module.exports = Block;