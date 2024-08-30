import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// .env
// SECRET_KEY="[]

const keypair = getKeypairFromEnvironment("SECRET_KEY"); 
console.log(keypair.publicKey.toBase58());