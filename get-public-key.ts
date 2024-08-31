// 請先在 .env 中放入 SECRET_KEY="[]"

// .env
// SECRET_KEY="[
//   123,456,789
// ]"

import { Keypair } from "@solana/web3.js";
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error("SECRET_KEY is not defined in the .env file");
}

const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretKey)));
console.log(keypair.publicKey.toBase58());