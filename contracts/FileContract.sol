contract FileContract {

  address FileContractAdmin;

  struct File {
    address creator;
    bytes32 hash;
    bytes32 metadataHash;
    bytes32 ipfsPath;
    uint addedAt; 
  }

  //TODO: DO RESEARCH ON STORAGE OF FILES AS MAPPING OR ARRAY
  mapping ( bytes32 => File ) FileVersions; //Different versions of the same file
  bytes32[] filesByHashes;


  function FileContract() public payable {
    FileContractAdmin = msg.sender;
  }

  modifier onlyAdmin() {
      if (msg.sender != FileContractAdmin)
        revert();
      // Do not forget the "_;"! It will be replaced by the actual function body when the modifier is used.
      _;
  }

  function addFile(bytes32 hash, bytes32 metadataHash) public returns (bool success) {
    address creator = msg.sender;

    File storage file = FileVersions[hash];

    // don't overwrite existing entries, and make sure handle isn't null
    if(file.hash == 0 && metadataHash.length != 0){
      FileVersions[hash].creator = creator;
      FileVersions[hash].hash = hash;
      FileVersions[hash].metadataHash = metadataHash;
      FileVersions[hash].addedAt = block.timestamp;

      filesByHashes.push(hash);  // adds an entry for this user to the user 'whitepages'
      return true;
    } else {
      return false; // either handle was null, or a user with this handle already existed
    }
  }

  function getAdmin() constant public returns (address) { return FileContractAdmin; }

  function getFiles() constant public returns (bytes32[]) { return filesByHashes; }

  function getFile(bytes32 hash) constant public returns (address,bytes32,bytes32,bytes32,uint) {
    File storage file = FileVersions[hash];

    return (file.creator, file.hash, file.ipfsPath, file.metadataHash, file.addedAt);
  }

}
