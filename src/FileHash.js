import Hashes from 'jshashes';

export const fileHash = hashObject => new Hashes.MD5().hex(hashObject)

//IN THE SMART CONTRACT USE 3 OR 4 BYTES 32 FOR THE HASH FUNCTION.