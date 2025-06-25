import { hash, compare } from "bcryptjs"
import { createHmac } from "crypto"

const doHash = (value, saltValue) => {
    return hash(value, saltValue);
}

const doHashValidation = (value, hashedValue) => {
    return compare(value, hashedValue);
}

const hmacProcess = (value, key) => {
    return createHmac('sha256', key).update(value).digest('hex');
}

export default { doHash, doHashValidation, hmacProcess };