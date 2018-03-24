import Hashes from 'jshashes';

export const fileHash = hashObject => new Hashes.SHA512().b64(hashObject)
