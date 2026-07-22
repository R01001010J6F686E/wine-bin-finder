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
        w.name.toLowerCase().includes(q) || 
        w.bin.toString().includes(q)
    );

    if (matches.length === 0) {
        resultsDiv.innerHTML = "<p>No wines found. Try another search.</p>";
        return;
    }

    if (matches.length > 20) {
        resultsDiv.innerHTML = "<h3>Too many matches. Refine search.</h3>";
        return;
    }

    matches.forEach(w => {
        resultsDiv.innerHTML += `
            <div class="result">
                <div class="bin">${w.bin}</div>
                <div>${w.name}</div>
                <div>
                    Price: $${w.price}
                    &nbsp;&nbsp;
                    Cost: $${w.cost}
                </div>
            </div>
        `;
    });
});
