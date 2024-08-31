import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
    Connection,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
    PublicKey
} from "@solana/web3.js";
   
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const keypair = getKeypairFromEnvironment("SECRET_KEY");

const transaction = new Transaction();

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

const programId = new PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: pingProgramDataId,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
});

transaction.add(instruction);

const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [keypair]
);

console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);

