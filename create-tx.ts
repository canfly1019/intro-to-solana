import {
    Connection,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    Keypair
} from "@solana/web3.js";
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in the .env file");
}

const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretKey)));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {    
    // create tx
    const transaction = new Transaction();
    
    const sender = keypair.publicKey;
    const recipient = new PublicKey("Fn1PPuyAn45WRT1wA4K9qhE4XCu6aTktfsbt43ZYcVS6");
    const amount = 0.01;

    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: recipient,
        lamports: LAMPORTS_PER_SOL * amount,
    });

    transaction.add(sendSolInstruction);

    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair]
    );

    console.log(`Transaction signature is ${signature} !`);
})();
