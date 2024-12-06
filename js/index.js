const emptyInput= document.getElementById('empty-input');
const searchBtn= document.getElementById('search-button');
const searchCity= document.getElementById('search-city');
const container= document.getElementById('container');

searchCity.addEventListener('keypress',(event)=>{
    if(event.key === "Enter"){
        searchBtn.click();
    }
})

function searchButton(){
    const searchvalue = searchCity.value.trim();
    // console.log(searchvalue);
    emptyInput.textContent = '';
    if(searchvalue === ''){
        emptyInput.innerHTML = `<h4 class="text-start text-danger mt-2">Please enter a city name to search....</h4>`;
        return;
    }
    searchCity.value = '';
    loadSearch(searchvalue);

}
async function loadSearch(city){
    const apiKey='b8b9a4968877dd238f31e0b38240592f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    const result = await response.json();
    displayWeather(result);
}
function displayWeather(result){
    // console.log(result.message)
    if(result.message === 'city not found'){
        emptyInput.innerHTML = `<h4 class="text-start text-danger mt-2">City not found.</h4>`;       
    }
    container.textContent='';
    const localDate= convertUnixTimeToLocal(result.dt);
    const sunriseTime= convertUnixTimeToLocal(result.sys.sunrise);
    const sunsetTime= convertUnixTimeToLocal(result.sys.sunset);
    const div = document.createElement('div');
    div.classList=' text-center text-white py-2';
    div.innerHTML =`<h4 class="fs-2">${result.name},${result.sys.country}</h4>
    <h6>${localDate.fullDate}</h6>
    <img src="http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png" alt="">
    <h5 class="fs-1">${result.main.temp} &deg;C</h5>
    <h5>${result.weather[0].main}</h5>
    <h5><span class="me-3">Sunrise: ${sunriseTime.time12h}</span> & <span class="me-3"> Sunset: ${sunsetTime.time12h}</span></h5> `
    container.appendChild(div);

}


function convertUnixTimeToLocal(time){
    const miliSeconds =time *1000;
    const humanDateFormat = new Date(miliSeconds);
    const convertedTimeObject ={
        fullDate:humanDateFormat.toLocaleString('en-US',{
            day: "numeric",
            month:"short",
            year:"numeric",
        }),
        time12h:humanDateFormat.toLocaleString('en-US',{
            hour: "numeric",
            minute:"numeric",
            hour12:true,
        }), 
    }
    return convertedTimeObject;
}

loadSearch("Rangamati");