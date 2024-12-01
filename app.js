const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".message");


for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name == "from" && currCode == "USD"){
            newOption.selected = true;
        }
        else if(select.name == "to" && currCode == "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    })
}
const updateFlag = (element)=>{
    let currCode = element.value;
    //console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    //console.log(amtVal);
    if(amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }
    //console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let test = data[fromCurr.value.toLowerCase()];
    let rate = test[toCurr.value.toLowerCase()];
    //console.log(response);
    //console.log(data);
    //console.log(test);
    //console.log(rate);
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${Math.floor(finalAmount)} ${toCurr.value}`;
}
window.addEventListener('load',()=>{
    updateExchangeRate();
});