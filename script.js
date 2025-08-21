let loc_decider = document.querySelector(".location");
let input = document.querySelector(".find_country");
let search = document.querySelector(".search");
let countryname = document.querySelector(".country")
let time = document.querySelector(".time")
let temp_c = document.querySelector(".temperature")
let feel = document.querySelector(".feeltem")
let invalid = document.querySelector(".invalid")
let main = document.querySelector(".main_content")
let allow = document.querySelector(".allow")
let not_found = document.querySelector(".location_error")
let wait = document.querySelector(".wait_request")
function del() {
    loc_decider.remove()
}
async function getloc(position) {
    res = await get(position.coords.latitude, position.coords.longitude)
    countryname.innerHTML = `${res.location.name},${res.location.country},${res.location.region}`;
    time.innerHTML = res.location.localtime;
    temp_c.innerHTML = `Real Temperature : ${res.current.temp_c} C°`;
    feel.innerHTML = `Feels like : ${res.current.feelslike_c} C°`;
    invalid.style.display = "none"
    main.style.display = "flex"
    not_found.style.display = "none"
}
function notget() {
    not_found.style.display = "flex"
    invalid.style.display = "none"
    main.style.display = "none"
}
async function get(lat, long) {
    const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=6ff1ceed938b4e4b8e5102542251008&q=${lat},${long}&aqi=yes`);
    return await promise.json()
}
allow.addEventListener("click",async () => {
    navigator.geolocation.getCurrentPosition(getloc,notget)
})
async function weather(city) {
    const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=6ff1ceed938b4e4b8e5102542251008&q=${city}&aqi=yes`);
    return await promise.json()
}
search.addEventListener("click", async () => {
    try {
        const country = input.value;
        const result = await weather(country)
        console.log(weather(country))
        countryname.innerHTML = `${result.location.name},${result.location.country},${result.location.region}`;
        time.innerHTML = result.location.localtime;
        temp_c.innerHTML = `Real Temperature : ${result.current.temp_c} C°`;
        feel.innerHTML = `Feels like : ${result.current.feelslike_c} C°`;
        invalid.style.display = "none"
        main.style.display = "flex"
        not_found.style.display = "none"
    }
    catch (x) {
        invalid.style.display = "flex"
        main.style.display = "none"
        not_found.style.display = "none"
    }
})



