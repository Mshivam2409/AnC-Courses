import { Duplex } from "stream" // Native Node Module 

const bufferToStream = (myBuuffer: Buffer) => {
    let tmp = new Duplex();
    tmp.push(myBuuffer);
    tmp.push(null);
    return tmp;
}

export default bufferToStream