let candidates = JSON.parse(localStorage.getItem("candidates")) || [];

// Initialize a set to track voted candidates by user
let votedCandidates = new Set(JSON.parse(localStorage.getItem("votedCandidates")) || []);

// Function to save candidates data to local storage
function saveCandidatesToLocalStorage() {
    localStorage.setItem("candidates", JSON.stringify(candidates));
}

// Function to save voted candidates data to local storage
function saveVotedCandidatesToLocalStorage() {
    localStorage.setItem("votedCandidates", JSON.stringify(Array.from(votedCandidates)));
}

// Function to delete a candidate
function deleteCandidate(candidateIndex) {
    candidates.splice(candidateIndex, 1); // Remove candidate from the array
    saveCandidatesToLocalStorage(); // Save updated candidate list to local storage
    renderCandidates(); // Re-render the candidate list
}

// Function to render the list of candidates
function renderCandidates() {
    const candidateList = document.getElementById("candidateList");
    candidateList.innerHTML = ""; // Clear previous list
    
    candidates.forEach((candidate, index) => {
        const candidateItem = document.createElement("div");
        candidateItem.className = "candidate-item";
        candidateItem.innerHTML = `
            <div class="candidate-name">${candidate.name}</div>
            <img src="${candidate.image}" alt="${candidate.name}" class="candidate-image">
            <div class="vote-count">${candidate.votes} votes</div>
            <button class="vote-btn" id="vote-${index}" ${votedCandidates.has(index) ? "disabled" : ""}>
                ${votedCandidates.has(index) ? "Already Voted" : "Vote"}
            </button>
        `;
        // Add event listener for vote button
        candidateItem.querySelector(`#vote-${index}`).addEventListener("click", () => vote(index));
        candidateList.appendChild(candidateItem);
    });
}
// Function to add a new candidate
function addCandidate(name, image) {
    const newCandidate = { name: name, image: image, votes: 0 };
    candidates.push(newCandidate);
    saveCandidatesToLocalStorage(); // Save candidates data to local storage
    renderCandidates();
}

// Function to handle the voting process
function vote(candidateIndex) {
    if (!votedCandidates.has(candidateIndex)) { // Check if user hasn't voted for this candidate
        candidates[candidateIndex].votes++;
        votedCandidates.add(candidateIndex); // Add candidate to voted set
        saveCandidatesToLocalStorage(); // Save updated votes to local storage
        saveVotedCandidatesToLocalStorage(); // Save voted candidates data to local storage
        renderCandidates();
    } else {
        alert("You have already voted for this candidate.");
    }
}

// Event listener for the add candidate form submission
document.getElementById("addCandidateForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const candidateName = document.getElementById("candidateName").value;
    const candidateImage = document.getElementById("candidateImage").value;
    addCandidate(candidateName, candidateImage);
    // Clear the form fields
    document.getElementById("candidateName").value = "";
    document.getElementById("candidateImage").value = "";
});

// Initial rendering of candidates
renderCandidates();
