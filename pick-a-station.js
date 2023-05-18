getStops();

async function getStops() {
    fetch(`http://127.0.0.1:5000/stops`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let selectTag = document.getElementById('stops');
        let stop_names = Object.keys(data);
        stop_names.forEach((key) => {
            let opt = document.createElement("option");
            opt.value = data[key];
            opt.innerHTML = key;
            selectTag.append(opt);
        });
    });
}

async function stationSelected () {
    let stopPointId = document.getElementById('stops').value;
    fetch(`http://127.0.0.1:5000/platforms?stopPointId=${stopPointId}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let platformSelectTag = document.getElementById('platforms');
        let platforms = Object.keys(data);
        platforms.forEach((key) => {
            let opt = document.createElement("option");
            opt.value = data[key];
            opt.innerHTML = data[key];
            platformSelectTag.append(opt);
        });
    });
}

function platformSelected () {
    let stopPointId = document.getElementById('stops').value;
    let platform = document.getElementById('platforms').value;
    window.location.href = "./sign.html?stopPointId=" + encodeURIComponent(stopPointId) + "&platform=" + encodeURIComponent(platform);
}