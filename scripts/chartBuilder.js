const trendIcons = {
    up: "../images/uparrow.png",
    down: "../images/downarrow.png",
    same: "../images/equalarrow.png",
    new: "../images/new.png",
    re_entry: "../images/re_entry.png"
}

function loadChart(fileName) {
    fetch(`./charts/${fileName}`)
        .then(response => response.json())
        .then(data => buildChart(data))
        .catch(e => console.error("Error:", e));
}

const select = document.getElementById("chart-select"); 
select.value = "september.json";
loadChart(select.value);

select.addEventListener("change", (e) => {
    loadChart(e.target.value);
})

function getPositionClass(pos) {
    if (pos === 1) return "gold";
    if (pos === 2) return "silver";
    if (pos === 3) return "bronze";
    return "";
}

function buildChart(entries) {
    const container = document.getElementById("chart-entries");
    container.innerHTML = "";

    entries.forEach(entry => {
        const div = document.createElement("div");
        div.classList.add("entry");

        let trendHTML = "";

        if (entry.trend === "up" || entry.trend === "down") {
            trendHTML = 
                `<span class="delta">
                    <img class="delta-img" src="${trendIcons[entry.trend]}">
                    <span>${entry.trendChange}</span>
                </span>`;
        } else if(entry.trend === "same") {
            trendHTML = 
                `<span class="delta">
                    <img class="delta-img equal" src="${trendIcons[entry.trend]}">
                </span>`;
        } else if(entry.trend === "new" || entry.trend === "re_entry") {
            trendHTML = `<span class="delta">
                <img class="new" src="${trendIcons[entry.trend]}" alt="${entry.trend}">
            </span>`;
        }

        div.innerHTML = `
            <span class="position ${getPositionClass(entry.position)}">${entry.position}</span>
            <div class="combine">
                <img class="cover-art" src="${entry.cover}" alt="${entry.title}">
                <div class="song">
                    <span class="title ${getPositionClass(entry.position)}">${entry.title}</span>
                    <span class="artist">${entry.artist}</span>
                </div>
            </div>
            <span class="points">${entry.points}</span>
            ${trendHTML}
            <span class="peak">${entry.peak}</span>
            <span class="number-ones">${entry.numberOnes}</span>
            <span class="months">${entry.months}</span>
        `;

        container.appendChild(div);
    })
}


