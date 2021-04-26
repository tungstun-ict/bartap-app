let key = 349323356;

export function encryptXor(value) {
    return value ^ key;
  }

export function decryptXor(value) {
    return key ^ value;
}
