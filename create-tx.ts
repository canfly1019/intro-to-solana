import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
    Connection,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey
} from "@solana/web3.js";
   
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const keypair = getKeypairFromEnvironment("SECRET_KEY"); 
const sender = keypair.publicKey;
const recipient = new PublicKey("Fn1PPuyAn45WRT1wA4K9qhE4XCu6aTktfsbt43ZYcVS6")
const amount = 0.01;

// create tx
const transaction = new Transaction();
 
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: recipient,
    lamports: LAMPORTS_PER_SOL * amount,
});
 
transaction.add(sendSolInstruction);
 
const signature = await sendAndConfirmTransaction(connection, transaction, [keypair]);

console.log(`Transaction signature is ${signature}!`);