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
            "<p style='color: red;'>Error loading wine data. Please refresh the page.</p>";
    });

// Search functionality
document.getElementById("search").addEventListener("input", function() {
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
                <div>
                    Price: $${w.Price}
                    &nbsp;&nbsp;
                    Cost: $${w.Cost}
                </div>
            </div>
        `;
    });
});
