let wines = [];

// Fetch wine data with error handling
fetch("wines.json")
    .then(r => {
        if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
        return r.json();
    })
    .then(data => {
        wines = data;
        console.log(`Loaded ${wines.length} wines`);
    })
    .catch(error => {
        console.error("Failed to load wines.json:", error);
        document.getElementById("results").innerHTML = 
            "<p style='color: #722f37;'>Error loading wine data. Please refresh the page.</p>";
    });

// PDF Modal functionality
const pdfModal = document.getElementById("pdf-modal");
const pdfIframe = document.getElementById("pdf-iframe");
const closePdfBtn = document.getElementById("close-pdf-btn");

// Open PDF modal
function openPdfModal(pdfUrl) {
    pdfIframe.src = pdfUrl;
    pdfModal.classList.add("active");
}

// Close PDF modal
function closePdfModal() {
    pdfModal.classList.remove("active");
    pdfIframe.src = "";
}

// Close modal when clicking the close button
closePdfBtn.addEventListener("click", closePdfModal);

// Close modal on Escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closePdfModal();
    }
});

// Search functionality
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function() {
    let q = this.value.trim().toLowerCase();
    const resultsDiv = document.getElementById("results");
    
    resultsDiv.innerHTML = "";

    if (q === "") return;

    if (wines.length === 0) {
        resultsDiv.innerHTML = "<p>Loading wine data...</p>";
        return;
    }

    let matches = wines.filter(w =>
        w.Description.toLowerCase().includes(q) || 
        w.BIN.toString().includes(q)
    );

    if (matches.length === 0) {
        resultsDiv.innerHTML = "<p>No wines found. Try another search.</p>";
        return;
    }

    if (matches.length > 20) {
        // Show nothing if more than 20 matches
        return;
    }

    matches.forEach(w => {
        resultsDiv.innerHTML += `
            <div class="result">
                <div class="bin">${w.BIN}</div>
                <div>${w.Description}</div>
                <div class="result-details">
                    <span>💰 Price: $${w.Price}</span>
                    <span>📊 Cost: $${w.Cost}</span>
                    <button onclick="openPdfModal('pdf/${w.BIN}.pdf')" class="view-details-btn">View Details</button>
                </div>
            </div>
        `;
    });
});

// Hide keyboard on Return key
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        this.blur();
    }
});
