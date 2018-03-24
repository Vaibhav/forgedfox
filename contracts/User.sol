import "./FileContract.sol";

contract User {

    address[] FileContracts;
    address Owner;
    bool vetted;

    bytes32 FirstName;
    bytes32 LastName;
    bytes32 Email;

    function User(bytes32 firstName, 
                  bytes32 lastName,
                  bytes32 email) public payable {
        Owner = msg.sender;
        vetted = false;

       // FileContracts.push(fileContract);

        FirstName  = firstName;
        LastName   = lastName;
        Email = email;
    }

    function addFileContract(address fileContract) public returns (bool success) {
        FileContracts.push(fileContract);
    }


    function isVetted() constant public returns (bool) {
        return (vetted);
    }  

    function getContractAmount() public constant returns(uint count) {
        return FileContracts.length;
    }

    function getFile(uint index) public constant returns(address) {
        return FileContracts[index];
    }

  /*  function getAllFileContracts() {
        uint len = getFileContractsLength();
        address[] memory fileContracts = new address[](len);
        

        for (uint id = 1; id <= len; id++) {
            fileContracts.push(FileContracts[id]);
        }

        return fileContracts;   
    }*/
    
    

    function getUser() constant public returns (address, bool, bytes32, bytes32, bytes32) {

        return (Owner, vetted, FirstName, LastName, Email);
    }

    function vet(uint index) public returns (bool success) {
      // Get ForgeFox contract
      address adminId = FileContract(FileContracts[index]).getAdmin();
      address sender = msg.sender;

      if (sender == adminId) {
        vetted = true;
        return true;
      }
      
      return false;
    }
}
