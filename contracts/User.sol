import "./FileContract.sol";

contract User {

    address[] FileContracts;
    address Owner;
    bool vetted;

    bytes32 FirstName;
    bytes32 LastName;
    bytes32 Company;
    bytes32 Website;

    event UserRequested(
        address fileContract,
        address indexed _owner,
        address indexed _id
    );

    function User(address fileContract, bytes32 firstName, bytes32 lastName, bytes32 company, bytes32 website) public payable {
        Owner = msg.sender;
        vetted = false;

        FileContracts.push(fileContract);

        FirstName  = firstName;
        LastName   = lastName;
        Company = company;
        Website = website;

        UserRequested(fileContract, msg.sender, this);
    }

    function isVetted() constant public returns (bool) {
        return (vetted);
    }  

    function getAllFileContracts() {

    }

    function getUser() constant public returns (address, bool, bytes32, bytes32, bytes32, bytes32) {

        return (Owner, vetted, FirstName, LastName, Company, Website);
    }

    function vet(uint index) public returns (bool success) {
      // Get ForgeFox contract
      address AdminId = FileContract(FileContracts[index]).getAdmin();
      address sender = msg.sender;

      if (sender == AdminId) {
        vetted = true;
        return true;
      }
      
      return false;
    }
}
