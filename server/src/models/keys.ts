import { generateKeyPairSync } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import correctPath from "utils/correctPath";

var keys;

try {
    const privateKey = readFileSync(correctPath(`secure/private.pem`));
    const publicKey = readFileSync(correctPath(`secure/public.pem`));
    keys = { private: privateKey, public: publicKey };
} catch (error) {
    // console.log(chalk.red("KEYS NOT FOUND LOCALLY!!!"));
    // console.log(chalk.green("GENERATING RSA KEYS!!"));
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        }
    });
    keys = { private: privateKey, public: publicKey };
    try {
        writeFileSync(correctPath(`secure/private.pem`), privateKey, 'utf8')
        writeFileSync(correctPath(`secure/public.pem`), publicKey, 'utf8')
    } catch (error) {
        // console.log(chalk.red("FAILED TO WRITE KEYS!. CONTINUING WITH KEYS IN MEMORY.."));
        console.log(error)
    }
}


const privateKey = keys.private
const publicKey = keys.public

export { privateKey, publicKey }