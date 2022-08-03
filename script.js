console.log("working");  
let countryNames=[]; //array
const searchInput = document.getElementById('search');
const searchWrapper = document.querySelector('.wrapper');
const resultsWrapper = document.querySelector('.results');
let countries; //will contain fetched data,simiar to let countries={}
//event listener for change 
/*document.getElementById("countries").addEventListener('change',(event)=>{ 

	console.log(event.target.value);
	displayCountryInfo(event.target.value);
})*/ 

/**************fetching data**************/
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
/***************pushing country names from array to api*******************/
function initialise(countriesData){ 
	countries=countriesData //variable for all the country names obtained through fetch api
	console.log(countriesData);
	let items="" //will add the country names as options in the inner html 
	countries.forEach(country=>(countryNames.push(country.name.official)) )
	//document.getElementById('countries').innerHTML=items; 
	//to show the info of the selected country 
	


} 
let fun=(randomw)=>console.log(randomw);

/************searchbar*********************/

searchInput.addEventListener('keyup', () => {
  let results = [];
  let input = searchInput.value;
  if (input.length) {
    results = countryNames.filter((item) => {
      return item.toLowerCase().includes(input.toLowerCase()); 

    });
  }
  renderResults(results);
});

function renderResults(results) {
  if (!results.length) {
    return searchWrapper.classList.remove('show');
  }

  const content = results
    .map((item) => { 
    	console.log(typeof item) 

      return `<li onclick=fun("${item}") class="countries">${item}</li>`;
    })
    .join(''); 
    

  searchWrapper.classList.add('show');
  resultsWrapper.innerHTML = `<ul >${content}</ul>`;
} 
/******************register input on searchbar************************/ 

/*document.querySelector("countries").addEventListener('click',(event)=>{ 

	console.log(event.target);
	//displayCountryInfo(event.target.value);
}) */

/********************display the content******************/
function displayCountryInfo(countryCode){
	const countryData=countryNames.find(cinfo=>cinfo.cca3===countryCode)
//.find works similar .forEach  
console.log(countryData); 
document.getElementById('flagImg').src=countryNames.flags.png;


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
/********************************google maps***********************************************************************/ 
function initMap(){ 
		//map features 
			var options={
				zoom:10, //zooming length
				center:{lat:28.7041, lng: 77.1025} //adding directions

		} 
		//generating new map
		var map= new google.maps.Map(document.getElementById("map"),options) 
		//add a new marker 
		const marker = new google.maps.Marker({
    position:{lat:28.7041, lng: 77.1025},
    map: map,//name of the variable for which the new map was created 
   icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' //change the icon type
  }); 
		//to get info as soon as we click on the symbol 
		var infoWindow=new google.maps.InfoWindow({content:"<h4>DELHI</h4"}); //displays content in the h1 font size on click
		marker.addListener("click",function(){
			infoWindow.open(map,marker);
		})
} 


 



