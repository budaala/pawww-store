import { hash, compare } from "bcryptjs"

const doHash = (value, saltValue) => {
    return hash(value, saltValue);
}

const doHashValidation = (value, hashedValue) => {
    return compare(value, hashedValue);
}

export default { doHash, doHashValidation };