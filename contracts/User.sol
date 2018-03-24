import "./FileContract.sol";

contract User {

    address[] FileContracts;
    address Owner;
    bool vetted;

    bytes32 FirstName;
    bytes32 LastName;

    function User(bytes32 firstName, 
                  bytes32 lastName) public payable {
        Owner = msg.sender;
        vetted = false;

       // FileContracts.push(fileContract);

        FirstName  = firstName;
        LastName   = lastName;

    }

    function addFileContract(address fileContract) public returns (bool success) {
        FileContracts.push(fileContract);
    }


    function isVetted() constant public returns (bool) {
        return (vetted);
    }  

    function getAllFileContracts() {

    }

    function getUser() constant public returns (address, bool, bytes32, bytes32) {

        return (Owner, vetted, FirstName, LastName);
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
