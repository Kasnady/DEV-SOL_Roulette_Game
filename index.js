import readlineSync from 'readline-sync'

import { getReturnAmount, randomNumber } from './helper.js'
import {
    airDropSol,
    generateWallet,
    transferSOL
} from './utility.js'

async function init() {
    const masterWallet = generateWallet()
    const paymentWallet = generateWallet();

    // to have enough balance
    await airDropSol(masterWallet.publicKey)
    await airDropSol(paymentWallet.publicKey)

    // const walletPublicKey = readlineSync.question('Please input your wallet Public Key: ');
    // if (!walletPublicKey) {
    //     console.warn('No public key given! Aborting sacred mission');
    //     process.exit(0)
    // }
    // const walletSecretKey = readlineSync.question('Please input your wallet Secret Key: ');
    // if (!walletSecretKey) {
    //     console.warn('No secret key given! Aborting sacred mission');
    //     process.exit(0)
    // }
    const amountOfStake = readlineSync.question('Please input your amount of stake (max 2.5): ');
    if (!amountOfStake) {
        console.warn('Amount of stake empty! Aborting sacred mission');
        process.exit(0)
    } else if (amountOfStake > 2.5) {
        console.warn('Max amount of stake 2.5!');
        process.exit(0)
    }
    const ratioOfStake = readlineSync.question('Please input your ratio of stake: ');
    if (!ratioOfStake) {
        console.warn('Ratio of stake empty! Aborting sacred mission');
        process.exit(0)
    }
    const guessNumber = readlineSync.question('Please input your number of guess (between 1 - 5): ');
    if (!guessNumber) {
        console.warn('Guess number empty! Aborting sacred mission');
        process.exit(0)
    }

    const amountReturn = getReturnAmount(amountOfStake, ratioOfStake);
    console.log(`You will get ${amountReturn} if you WIN!`)

    // let userWalletBalance = await getWalletBalance(walletPublicKey);
    // if (!userWalletBalance) {
    //     console.error('Invalid wallet public key provided! Wallet not found');
    //     process.exit(0);
    // } else if (userWalletBalance < amountOfStake) {
    //     console.log('You wallet balance insufficient!');
    //     return;
    // }

    // Air drop to add more balance
    // await airDropSol(fromWalletPublicKey);

    // Processing Payment
    console.log('--- processing payment --');
    const paymentSignature = await transferSOL(paymentWallet, masterWallet, 1);
    console.log(`--- payment processed with signature ${paymentSignature} --`);
    console.log('--- generating number --');
    const numberGenerated = randomNumber();
    console.log(`--- generated number: ${numberGenerated} --`);
    if (numberGenerated == guessNumber) {
        console.log('^_^ CONGRATS! YOU WIN ^_^');
    } else {
        console.log('>_< Sorry! Please try again >_<');
        process.exit(0)
    }
    console.log('--- processing price --');
    const priceSignature = await transferSOL(masterWallet, paymentWallet, 1);
    console.log(`--- price processed with signature ${priceSignature} --`);
}

init();