import web3 from '@solana/web3.js'

const _getConnection = () => {
    return new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
}

export const airDropSol = async (publicKey) => {
    try {
        const connection = _getConnection();
        const fromAirDropSignature = await connection.requestAirdrop(
            new web3.PublicKey(publicKey),
            2 * web3.LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

export const generateWallet = () => web3.Keypair.generate();

export const getWallet = async (secretKey) => {
    return web3.Keypair.fromSecretKey(Uint8Array.from(secretKey));
}

export const getWalletBalance = async (pubk) => {
    try{
        const connection = _getConnection();
        const balance = await connection.getBalance(new web3.PublicKey(pubk));
        return balance/web3.LAMPORTS_PER_SOL;
    }catch(err){
        console.log(err);
    }
}

export const transferSOL = async (from,to,transferAmt) => {
    try{
        const connection = _getConnection();
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey:new web3.PublicKey(from.publicKey.toString()),
                toPubkey:new web3.PublicKey(to.publicKey.toString()),
                lamports:transferAmt*web3.LAMPORTS_PER_SOL
            })
        )
        const signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        )
        return signature;
    }catch(err){
        console.log(err);
    }
}