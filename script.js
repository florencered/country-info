console.log("working");  
let countries; //will contain fetched data,simiar to let countries={}
//event listener for change 
document.getElementById("countries").addEventListener('change',(event)=>{ 

	console.log(event.target.value);
	displayCountryInfo(event.target.value);
})
fetch("https://restcountries.com/v3.1/all")
.then(function (response){ 
	return response.json()

})

.then(function (data){
	console.log(data) 
	initialise(data);
}) 
.catch(function(err){
	console.log("Error:",err);
});

function initialise(countriesData){ 
	countries=countriesData //variable for all the country names obtained through fetch api
	console.log(countriesData); 
	let options="" //will add the country names as options in the inner html 
	//for loop to rank options 
	/*for(let j=0;j<countries.length;j++){
		options+=`<option value= "${countries[j].cca3}">${countries[j].name.official}</option>`
	} */  
	//using for each to iterate through the whole arrray stored in countries
	countries.forEach(country=>options+=`<option value= "${country.cca3}">${country.name.official}</option>`)

	//access and change the text of options tag 
	document.getElementById('countries').innerHTML=options; 
	//to show the info of the selected country 
	


} 
function displayCountryInfo(countryCode){
	const countryData=countries.find(cinfo=>cinfo.cca3===countryCode)
//.find works similar .forEach  
console.log(countryData); 
document.getElementById('flagImg').src=countryData.flags.png;


var language=Object.values(countryData.languages); 
console.log(language);
document.getElementById('location').innerHTML=countryData.latlng[0]+" °N"+" ,"+countryData.latlng[1]+" °E";
document.getElementById('lang').innerHTML=language.join(", ");
//document.getElementById('location').innerHTML=countryData. 
document.getElementById('capital').innerHTML=countryData.capital; 
document.getElementById('population').innerHTML=countryData.population; 
console.log(countryData.currencies)
console.log(Object.values(countryData.currencies)) 
var currencies=Object.values(countryData.currencies); 
var filter=currencies.filter(c=>c.name);
var map=filter.map(c=>`${c.name} (${c.symbol})`); 

document.getElementById('currencies').innerHTML=map.join(", ")
//.map(c=>`${c.name}(${c.symbol})`).join(", "); 
//document.getElementById('dcode').innerHTML= 
document.getElementById('region').innerHTML= countryData.region;
document.getElementById('lat').innerHTML= countryData.latlng[0]+" °N";
document.getElementById('long').innerHTML=countryData.latlng[1]+" °E";

} 


 



