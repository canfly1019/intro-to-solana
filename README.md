# intro-to-solana
- [參考資源](https://solana.com/developers/courses)
- [範例 repo](https://github.com/canfly1019/intro-to-solana)
> 如遇到 Windows 路徑問題可以用 ts-node 來取代 esrun！
## [Cryptography and the Solana Network](https://solana.com/developers/courses/intro-to-solana/intro-to-cryptography)
- Keypair
    - Public Key：可公開的 address。
    - Secret Key：用來簽署交易和驗證身份，不可公開。

- Symmetric and Asymmetric Cryptography
    - Symmetric Cryptography 對稱加密：已有幾百年歷史，現在常見的有 AES。
    - Asymmetric Cryptography 非對稱加密：1970s 發展出來，有公私鑰形成密鑰對，現在常見的有 ECC（橢圓曲線）和 RSA。
        - **Encryption**：數據被公鑰加密，只有相對應的私鑰可以解密。（目的：保護數據隱私）
        - **Signatures**：使用私鑰簽名，公鑰可以用來驗證簽名者的身份。（目的：驗證真實性與完整性）

- Solana 的 keypair 使用 Ed25519 curve。

### Lab 1 - Keypair
- 下載套件
    ```npm install```

- 使用 ```@solana/web3.js``` 生成 Keypair
    ```npx esrun generate-keypair.ts```
> [如何自訂自訂公鑰的前幾位元](https://solana.com/developers/cookbook/wallets/generate-vanity-address)
- 取得 Keypair
    ```npx esrun get-public-key.ts```

> secret key 請保管好，不要傳到任何地方！

## [Read Data From The Solana Network](https://solana.com/developers/courses/intro-to-solana/intro-to-reading-data)

- SOL：Solana 的原生代幣，符號為 ◎，最小單位為 Lamport，為紀念分散式系統大師 Leslie Lamport。（1 SOL = 10^9 Lamports）
- Addresses：用來識別不同的 Accounts，通常以 **base-58 encoded string** 的形式顯示，大部分的 Addresses 都是 Public Key。

### Lab 2 - Check Balance
- 取得指定 address 的 balance
    ```npx esrun check-balance.ts```
- 領取 devnet SOL
    - [Faucet](https://faucet.solana.com/)

## [Create Transactions on the Solana Network](https://solana.com/developers/courses/intro-to-solana/intro-to-writing-data)
- Transactions aka Tx
    - Atomic：只會 success or fail
    - Instructions aka Ix：Tx 裡面的每個步驟為 Ix，Ix 包含：
        - an array of **accounts** that will be read from and/or written to
        - the public key of the **program to invoke**
        - **data passed to the program being invoked**, structured as a byte array
- 提交狀態一般 Tx 使用 "confirmed" 或者 "finalized"
    - "processed" 指的是交易已經被某個節點處理並寫入當前的狀態中（回滾機率高）
    - "confirmed" 指的是交易已經被網路上的節點驗證並寫入區塊（回滾機率低）
    - "finalized" 指的是交易已經被網路上的節點全面驗證並達到最終狀態（絕對不回滾）

### Lab 3 - Create a Transfer Tx
- 創建 Tx
    ```npx esrun create-tx.ts```
- 上 [Solana Explorer](https://explorer.solana.com) 查看 Tx（記得切換到 devnet！）

## [Using custom onchain programs](https://solana.com/developers/courses/intro-to-solana/intro-to-custom-onchain-programs)
- 剛剛是透過 ```SystemProgram.transfer()``` 現成 Ix，如果要自己寫呢？
    ```typescript=
    const instruction = new TransactionInstruction({
      programId: PublicKey;
      keys: [
        {
          pubkey: PublicKey,
          isSigner: boolean,
          isWritable: boolean,
        },
      ],
      data?: Buffer;
    });
    ```
    - programId：要調用的 program 的 ID。
    - keys：指定會使用到的一個 array of accounts，每個 account 中包含：
        - pubkey
        - isSigner (boolean)：是否為 signer
        - isWritable (boolean)：是否可以在交易執行中被修改
    - data (optional)：用來傳參數或數據的欄位，通常是以位元組（Buffer）的形式傳遞。

### Lab 4 - Ping Progarm
- Devnet 上有一個計數 program id 為 ```ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa```，並在 ```Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod``` 這個 account 存了資料。
- 發送 Tx 與合約互動
    ```npx esrun ping-program.ts```
