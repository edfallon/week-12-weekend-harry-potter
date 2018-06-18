
const app = function(){
 const url = "http://hp-api.herokuapp.com/api/characters";
 makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback){
 const request = new XMLHttpRequest();
 request.open("GET", url);
 request.addEventListener("load", callback);
 request.send();

}

const requestComplete = function(){
 if(this.status !== 200) return;
 const characters = JSON.parse(this.response);
 console.log(characters);
 // populateList(characters);
 populateDropdown(characters);
  const select = document.querySelector('select');
  select.addEventListener('change', function(){
    var character = characters[select.value];
    handleSelectChange(character)
  });

}

const handleSelectChange = function(character){
  const ul = document.querySelector('#selected-character');
  const nameLi = document.querySelector('#nameLi');
  nameLi.textContent = character.name;
  var imageLi = document.querySelector("#imageLi");
  imageLi.innerHTML = ""
  var image = document.createElement("img");
  image.width = "200";
  image.src = character.image;
  const houseLi = document.querySelector('#houseLi');
  houseLi.textContent = character.house;
  const ancestryLi = document.querySelector('#ancestryLi');
  ancestryLi.textContent = character.ancestry;

  imageLi.appendChild(image);
  ul.appendChild(nameLi)
  ul.appendChild(imageLi)
  ul.appendChild(houseLi);
  ul.appendChild(ancestryLi);

}

const populateDropdown = function(characters){
   const dropdown = document.querySelector('#characters');
   characters.forEach(function(character){
     const option = document.createElement('option');
     option.value = characters.indexOf(character);
     option.textContent = character.name;
     dropdown.appendChild(option);
     });

 }

const populateList = function(characters){
 const ul = document.querySelector('#character-list');
 characters.forEach(function(character){
   const li = document.createElement('li');
   li.textContent = character.name;
   ul.appendChild(li);
 });
 }



window.addEventListener('load', app);
