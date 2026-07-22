let wines = [];

fetch("wines.json")
.then(r => r.json())
.then(data => {
    wines = data;
});

search.addEventListener("input", function() {

    let q = search.value.trim().toLowerCase();

    results.innerHTML = "";

    if (q === "")
        return;

    let matches = wines.filter(w =>

        w.name.toLowerCase().includes(q)

        ||

        w.bin.toString().includes(q)

    );

    if (matches.length > 20) {

        results.innerHTML =
        "<h3>Too many matches. Refine search.</h3>";

        return;
    }

    matches.forEach(w => {

        results.innerHTML += `

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