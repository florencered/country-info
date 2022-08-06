console.log("working");  
let countryNames=[]; 
//global variables
const searchInput = document.getElementById('search');
const searchWrapper = document.querySelector('.wrapper');
const resultsWrapper = document.querySelector('.results');
let countries; 
/**************fetching data**************/
/*fetch("https://restcountries.com/v3.1/all")
.then( function (response){ 
	return  response.json()

})

.then(function (data){
	console.log(data) 
	initialise(data);
}) 
.catch(function(err){
	console.log("Error:",err);
});*/ 
(async ()=>{
	try{
		let fetchData= await fetch("https://restcountries.com/v3.1/all"); 
		let result=await fetchData.json(); 
		initialise(result);
	} 
	catch(err){
		console.error(err);
	}
})();
/********pushing country names from array to api********/
function initialise(countriesData){ 
	countries=countriesData //variable for all the country names obtained through fetch api
	console.log(countriesData);
	let items="" //will add the country names as options in the inner html 
	countries.forEach(country=>(countryNames.push(country.name.official)) )
	


} 
let fun = (country) => {
	console.log(country);
	displayCountryInfo(country); 

	resultsWrapper.innerHTML = ``;
	resultsWrapper.style.padding="0px 0px";
	document.getElementById("search").value=country;
}

/************searchbar***************/

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

function renderResults(results){
	console.log("Results:",results);
	if (!results.length) {
		return searchWrapper.classList.remove('show');
	}

	const content = results
	.map((item) => { 
		return `<li onclick="fun('${item}')" class="countries">${item}</li>`;
	})
	.join(''); 


	searchWrapper.classList.add('show');
	resultsWrapper.innerHTML = `<ul >${content}</ul>`;
} 
/************register input on searchbar******************/ 

/**************display the content******************/
function displayCountryInfo(countryName){
	const countryData=countries.find(c=>c.name.official===countryName)
	console.log(countryData); 
	document.getElementById('flagImg').src=countryData.flags.png;


	var language=Object.values(countryData.languages); 
	console.log(language);
	document.getElementById('location').innerHTML=countryData.latlng[0]+" °N"+" ,"+countryData.latlng[1]+" °E";
	document.getElementById('lang').innerHTML=language.join(", ");
	document.body.style.backgroundImage =
	"url('https://source.unsplash.com/1920x1080/?" +countryData.name.official+ "')";
	document.getElementById('capital').innerHTML=countryData.capital; 
	document.getElementById('population').innerHTML=countryData.population; 
	console.log(countryData.currencies)
	console.log(Object.values(countryData.currencies)) 
	var currencies=Object.values(countryData.currencies); 
	var filter=currencies.filter(c=>c.name);
	var map=filter.map(c=>`${c.name} (${c.symbol})`); 
	document.getElementById('currencies').innerHTML=map.join(", ")
	document.getElementById('region').innerHTML= countryData.region;
	document.getElementById('lat').innerHTML= countryData.latlng[0]+" °N";
	document.getElementById('long').innerHTML=countryData.latlng[1]+" °E";
	initMap(countryData.latlng[0],countryData.latlng[1],countryData.name.official) 

}  
/********************************google maps***********************************************************************/ 
function initMap(lat=20,lng=77,name='Republic of India'){ 
		//map features 

		var options={
				zoom:5, //zooming length
				center:{lat,lng} //adding directions

			} 

			var map= new google.maps.Map(document.getElementById("map"),options) 

			const marker = new google.maps.Marker({
				position:{lat,lng},
				map: map,
   icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' //change the icon type
}); 

		var infoWindow=new google.maps.InfoWindow({content:`"<h4>'${name}'</h4"`}); //displays content in the h1 font size on click
		marker.addListener("click",function(){
			infoWindow.open(map,marker);
		})
	} 






