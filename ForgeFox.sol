pragma solidity ^0.4.17;

contract ForgeFox {

  address ForgeFoxAdmin;

  struct File {
    address creator;
    bytes32 hash;
    bytes32 metadataHash;
    uint addedAt;
  }
  mapping ( bytes32 => File ) Files;
  bytes32[] filesByHashes;


  function ForgeFox() public payable {
    ForgeFoxAdmin = msg.sender;
  }

  modifier onlyAdmin() {
      if (msg.sender != ForgeFoxAdmin)
        revert();
      // Do not forget the "_;"! It will be replaced by the actual function body when the modifier is used.
      _;
  }

  function addFile(bytes32 hash, bytes32 metadataHash) public returns (bool success) {
    address creator = msg.sender;

    File storage file = Files[hash];

    // don't overwrite existing entries, and make sure handle isn't null
    if(file.hash == 0 && metadataHash.length != 0){
      Files[hash].creator = creator;
      Files[hash].hash = hash;
      Files[hash].metadataHash = metadataHash;
      Files[hash].addedAt = block.timestamp;

      filesByHashes.push(hash);  // adds an entry for this user to the user 'whitepages'
      return true;
    } else {
      return false; // either handle was null, or a user with this handle already existed
    }
  }

  function getAdmin() constant public returns (address) { return ForgeFoxAdmin; }

  function getFiles() constant public returns (bytes32[]) { return filesByHashes; }

  function getFile(bytes32 hash) constant public returns (address,bytes32,bytes32,uint) {
    File storage file = Files[hash];

    return (file.creator, file.hash, file.metadataHash, file.addedAt);
  }

}
