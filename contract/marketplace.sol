// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Voting {
    struct Candidate {
        string name;
        string image;
        uint votes;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;

    event CandidateAdded(string name, string image);
    event Voted(uint candidateId);

    constructor() {
        // Initialize candidates array
        candidates.push();
    }

    function addCandidate(string memory _name, string memory _image) public {
        candidates.push(Candidate(_name, _image, 0));
        emit CandidateAdded(_name, _image);
    }

    function vote(uint _candidateId) public {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        require(!hasVoted[msg.sender], "You have already voted");

        candidates[_candidateId].votes++;
        hasVoted[msg.sender] = true;

        emit Voted(_candidateId);
    }

    function getCandidate(
        uint _candidateId
    )
        public
        view
        returns (string memory name, string memory image, uint votes)
    {
        require(_candidateId < candidates.length, "Invalid candidate ID");

        Candidate memory candidate = candidates[_candidateId];
        return (candidate.name, candidate.image, candidate.votes);
    }

    function getCandidatesCount() public view returns (uint) {
        return candidates.length;
    }
}
