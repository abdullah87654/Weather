let loc=document.querySelector(".location");
let input=document.querySelector(".find_country");
let sear=document.querySelector(".search");
let countryname=document.querySelector(".country")
let time=document.querySelector(".time")
let tem=document.querySelector(".tem")
let feel=document.querySelector(".feeltem")
let inva=document.querySelector(".invalid")
let main=document.querySelector(".main_content")
let all=document.querySelector(".allow")
let ca=document.querySelector(".cancel")
let not=document.querySelector(".ft")
function del(){
    loc.remove()
}
async function getloc(position){
    res= await get(position.coords.latitude,position.coords.longitude)
    countryname.innerHTML= `${res.location.name},${res.location.country},${res.location.region}`;
      time.innerHTML= res.location.localtime;
      tem.innerHTML= `Real Temperature : ${res.current.temp_c} C°`;
      feel.innerHTML=`Feels like : ${res.current.feelslike_c} C°`;
      inva.style.display="none"
      main.style.display="flex"
    not.style.display="none"
}
function notget(){
not.style.display="flex"
inva.style.display="none"
      main.style.display="none"
}
async function get(lat,long) {
    const promise=await fetch( `https://api.weatherapi.com/v1/current.json?key=6ff1ceed938b4e4b8e5102542251008&q=${lat},${long}&aqi=yes`);
    return await promise.json()
}
all.addEventListener("click", async ()=>{
    navigator.geolocation.getCurrentPosition(getloc,notget)
})
async function weather(city) {
    const promise=await fetch( `https://api.weatherapi.com/v1/current.json?key=6ff1ceed938b4e4b8e5102542251008&q=${city}&aqi=yes`);
    return await promise.json()
}
console.log(weather())
 sear.addEventListener("click", async ()=>{
    try{
     const country=input.value;
     const result= await weather(country)
     console.log(weather(country))
     countryname.innerHTML= `${result.location.name},${result.location.country},${result.location.region}`;
      time.innerHTML= result.location.localtime;
      tem.innerHTML= `Real Temperature : ${result.current.temp_c} C°`;
      feel.innerHTML=`Feels like : ${result.current.feelslike_c} C°`;
      inva.style.display="none"
      main.style.display="flex"
    not.style.display="none"}
    catch(x){
        inva.style.display="flex"
      main.style.display="none"
      not.style.display="none"
    }
    
 })



