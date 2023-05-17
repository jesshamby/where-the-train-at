//#region - declair variables and get data immediately

let platform = "Eastbound%20-%20Platform%201";
let stopPointId = "940GZZLULVT"
let arrivals = [];
let dataPosition = 1;
let time = '';
let refreshData = false;
let conveyor = document.getElementById("animate");

getData();
cycleData();

//#endregion

//#region - update time and fetch data
setInterval(() => {
  let currentdate = new Date(); 
  let newTime = currentdate.toLocaleTimeString("en-GB");
  if (time !== newTime) {
    time = newTime;
    document.querySelector('.row-time').textContent = time;
  }
}, 100)

setInterval(() => {
  conveyor.classList.toggle("scroll-in");
  refreshData = !refreshData;
  if (refreshData) {
    getData();
    cycleData();
  }
}, 2500)

//#endregion

//#region - navigation

let timeButton = document.querySelector(".row-time");
timeButton.onclick = () => {
  window.location.href = "./pick-a-station.html"
}

//#endregion

//#region - functions
async function getData() {
  fetch(`http://127.0.0.1:5000/arrivals?stopPointId=${stopPointId}&platformName=${platform}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
      arrivals = data;
      document.querySelector('.destination1').textContent = data[0]["towards"];
      document.querySelector('.arrival1').textContent = data[0]["timeToStation"] + " mins";
    })
}

function changePosition() {
  if (dataPosition ==  3) {
    dataPosition = 1;
  } else {
    dataPosition++;
  }
}

function cycleData() {
  try{
    document.querySelector('.position2').textContent = (dataPosition + 1);
    document.querySelector('.destination2').textContent = arrivals[dataPosition]["towards"];
    document.querySelector('.arrival2').textContent = arrivals[dataPosition]["timeToStation"] + " mins";
    changePosition();
  }
  catch {
    console.log("Could not get other times.");
  }
}

//#endRegion