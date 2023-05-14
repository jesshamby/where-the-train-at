let platform = "Northbound%20-%20Platform%201";
let stopPointId = "940GZZLUBLR"
let arrivals = [];
let dataPosition = 1;
let time = '';

// Initial requests
getData();
cycleData();

// Update time @ 10Hz
setInterval(() => {
  let currentdate = new Date(); 
  let newTime = currentdate.toLocaleTimeString("en-GB");
  if (time !== newTime) {
    time = newTime;
    document.querySelector('.row-time').textContent = time;
  }
}, 100)

// Fetch & cycle bottom row every 10 seconds 
setInterval(() => {
  getData();
  cycleData();
}, 10000)

async function getData() {
  fetch(`http://127.0.0.1:5000/arrivals?stopPointId=${stopPointId}&platformName=${platform}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
      arrivals = data;
      document.querySelector('.destination1').textContent = data[0]["towards"];
      document.querySelector('.arrival1').textContent = data[0]["timeToStation"] + " mins";
      //cycleData();
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
  document.querySelector('.position2').textContent = (dataPosition + 1);
  document.querySelector('.destination2').textContent = arrivals[dataPosition]["towards"];
  document.querySelector('.arrival2').textContent = arrivals[dataPosition]["timeToStation"] + " mins";
  changePosition();
}