import "./FileContract.sol";

contract User {

    address[] ForgeFoxContracts;
    address Owner;
    bool vetted;

    bytes32 FirstName;
    bytes32 LastName;
    bytes32 Company;
    bytes32 Website;

    event UserRequested(
        address forgeFoxContract,
        address indexed _owner,
        address indexed _id
    );

    function ForgeFoxUser(address forgeFoxContract, bytes32 name, bytes32 company, bytes32 website) public payable {
        Owner = msg.sender;
        vetted = false;

        ForgeFoxContract = forgeFoxContract;

        Name    = name;
        Company = company;
        Website = website;

        UserRequested(forgeFoxContract, msg.sender, this);
    }

    function isVetted() constant public returns (bool) {
        return (vetted);
    }

    function getUser() constant public returns (address, bool, bytes32, bytes32, bytes32) {

        return (Owner, vetted, FirstName, LastName, Company, Website);
    }

    function vet() public returns (bool success) {
      // Get ForgeFox contract
      address AdminId = ForgeFox(ForgeFoxContract).getAdmin();
      address sender = msg.sender;

      if (sender == AdminId) {
        vetted = true;
        return true;
      }
      
      return false;
    }
}