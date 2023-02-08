const express = require("express");
const bodyParser =require('body-parser');
const Blockchain = require("./blockchain")

const app = express();

const blockchain = new Blockchain();

// blockchain.addBlock({data:"Block1"});
// blockchain.addBlock({data:"Block2"});

app.use(bodyParser.json());
app.get("/api/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });
//   pubsub.broadcastChain();
  res.redirect("/api/blocks");
});

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`listening to PORT:${3000}`);
})