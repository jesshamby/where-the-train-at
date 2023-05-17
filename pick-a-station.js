//#region - Set select field values
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

function stationSelected () {
    let stopPointId = document.getElementById('stops').value;
    window.location.href = "./sign.html?stopPointId=" + encodeURIComponent(stopPointId);
}
//#endregion