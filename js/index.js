const day =document.getElementById("day")
const date =document.getElementById("date")
const todayMonthOfCity =document.getElementById("todayMonthOfCity")
const todayLocation = document.getElementById("todayLocation")
const todayTemp = document.getElementById("todayTemp")
const todayText = document.getElementById("todayText")
const todayConditionImg = document.getElementById("todayConditionImg")
const todayHumidity = document.getElementById("todayHumidity")
const todayWind = document.getElementById("todayWind")
const todayWindDirction = document.getElementById("todayWindDirction")


const nextDayName = document.getElementById("nextDayName")
const nextConditionImg = document.getElementById("nextConditionImg");
const nextMaxTemp = document.getElementById("nextMaxTemp")
const nextMinTemp = document.getElementById("nextMinTemp")
const nextConditionText = document.getElementById("nextConditionText")


const afterNextDayName = document.getElementById("afterNextDayName");
const afterNextConditionImg = document.getElementById("afterNextConditionImg");
const afterNextMaxTemp = document.getElementById("afterNextMaxTemp");
const afterNextMinTemp = document.getElementById("afterNextMinTemp");
const afterNextConditionText = document.getElementById("afterNextConditionText")


const search = document.getElementById("search");


navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position.coords)
    let mylatitude = position.coords.latitude;
    let mylongtude = position.coords.longtude;
    getWeatherData(`${mylatitude},${mylongtude}`)
})


search.addEventListener('input' , (e)=>{
    let currentValue = e.target.value; // cairo
    console.log(currentValue)
    getWeatherData(currentValue)
})


async function getWeatherData(query) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=393cbead3fb04eb28cf131301240410&q=${query}&days=3&aqi=no&alerts=no`);
    let data = await res.json()
    console.log(data)
    displayWeatherData(data)
    displayTomorrowData(data)
    displayAfterTommorrowData(data)
}

function displayWeatherData(data){
    let todayDate = data.current.last_updated
    console.log(todayDate)
    let myDateName = new Date(todayDate)
    let todayName =myDateName.toLocaleString('en-us',{weekday:'long'})
    day.innerHTML = todayName ;

    let todayMonth =myDateName.toLocaleString('en-us',{month:'long'})
    let todayDay = myDateName.getDate()
    date.innerHTML = todayDay;
    todayMonthOfCity.innerHTML = todayMonth;

    todayLocation.innerHTML= data.location.country;
    todayTemp.innerHTML=data.current.temp_c;

    todayText.innerHTML=data.current.condition.text;

    let currentImg = data.current.condition.icon;
    let currentSrc = `https:${currentImg}`;
    todayConditionImg.setAttribute('src', currentSrc)

    todayHumidity.innerHTML = data.current.humidity
    todayWind.innerHTML = data.current.wind_kph
    todayWindDirction.innerHTML = data.current.wind_dir
}


function displayTomorrowData(data){
    let tomorrowDate = data.forecast.forecastday[1]
    console.log(tomorrowDate)

    let myTomorrowDate = new Date(tomorrowDate.date)

    let myTomorrowDateName = myTomorrowDate.toLocaleString('en-us' , {weekday:'long'})

    nextDayName.innerHTML = myTomorrowDateName

    let tomorrowImg = tomorrowDate.day.condition.icon;
    let tomorrowSrc =  `https:${tomorrowImg}`

    nextConditionImg.setAttribute('src' , tomorrowSrc)

    nextMaxTemp.innerHTML = tomorrowDate.day.maxtemp_c
    nextMinTemp.innerHTML = tomorrowDate.day.mintemp_c
    
    nextConditionText.innerHTML = tomorrowDate.day.condition.text;

}


function displayAfterTommorrowData(data) {
    

    let afterTommorrowDate = data.forecast.forecastday[2];
    console.log(afterTommorrowDate);

    let myAfterTommorrowDate = new Date(afterTommorrowDate.date);

    let myAfterTommorrowDateName = myAfterTommorrowDate.toLocaleString("en-us", {weekday: "long",});

    afterNextDayName.innerHTML = myAfterTommorrowDateName;

    
    let myAfterTommorrowImg = afterTommorrowDate.day.condition.icon;
    let myAfterTommorrowSrc = `https:${myAfterTommorrowImg}`

    afterNextConditionImg.setAttribute('src' , myAfterTommorrowSrc);

    afterNextMaxTemp.innerHTML = afterTommorrowDate.day.maxtemp_c;
    afterNextMinTemp.innerHTML = afterTommorrowDate.day.mintemp_c

    afterNextConditionText.innerHTML = afterTommorrowDate.day.condition.text;
}

