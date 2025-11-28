let input = document.getElementById("demo");

// -------------------------------------------------------------

let today = document.getElementById("today");
let todayDate = document.getElementById("todayDate");
let countryName = document.getElementById("countryName");
let todayTemb = document.getElementById("todayTemb");
let todayImg = document.getElementById("todayImg");
let clear = document.getElementById("clear");

// -------------------------------------------------------------

let tomorrow = document.getElementsByClassName("tomorrow");
let tomorrowImg = document.getElementsByClassName("tomorrowImg");
let tembSun = document.getElementsByClassName("tembSun");
let tembMoon = document.getElementsByClassName("tembMoon");
let sunny = document.getElementsByClassName("sunny");

console.log(tembMoon);

async function weather(y) {
  let respond = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=cab3527d7d404091986144719252711&q=${y}&days=3`
  );
  if (respond.ok) {
    let data = await respond.json();
    console.log(data);
    return data;
  }
}

weather();

function display(weatherFun) {
  let todayData = new Date();
  today.innerHTML = todayData.toLocaleDateString("en-US", { weekday: "long" });
  todayDate.innerHTML = todayData.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  //    -----------------------------
  countryName.innerHTML = weatherFun.location.name;
  todayTemb.innerHTML = weatherFun.current.temp_c;
  todayImg.setAttribute("src", weatherFun.current.condition.icon);
  clear.innerHTML = weatherFun.current.condition.text;
}

function displayNext(weatherFun) {
  let forecast = weatherFun.forecast.forecastday;
  console.log(forecast);

  for (let i = 0; i < 2; i++) {
    let nextData = new Date(forecast[i + 1].date);
    tomorrow[i].innerHTML = nextData.toLocaleDateString("en-US", {
      weekday: "long",
    });
    tomorrowImg[i].setAttribute("src", forecast[i + 1].day.condition.icon);
    tembSun[i].innerHTML = forecast[i + 1].day.mintemp_c + "<sub>o</sub>C";
    tembMoon[i].innerHTML = forecast[i + 1].day.maxtemp_c + "<sub>o</sub>";
    sunny[i].innerHTML = forecast[i + 1].day.condition.text;
  }
}

async function all(x="cairo") {
  let weatherFun = await weather(x);
  display(weatherFun);

  displayNext(weatherFun);
}

all();





input.addEventListener("input",function(){
all(input.value)

})
