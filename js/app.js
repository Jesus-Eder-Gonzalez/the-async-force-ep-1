'use strict';

function setVar(request, variableToSet1, variableToSet2, attribute1, attribute2) {
  if (request.currentTarget.responseURL.includes('people')) {
    document.getElementById(variableToSet1).innerText = JSON.parse(request.currentTarget.response)[attribute1];
    this.open('GET', JSON.parse(request.currentTarget.response)[attribute2]);
    this.send();

  } else {
    document.getElementById(variableToSet2).innerText = JSON.parse(request.currentTarget.response)['name'];
    () => this.removeEventListener('load', setVar);
  }
}


function getRequest(apiStr, variable1, variable2, attribute1, attribute2) {
  let pageRequest = new XMLHttpRequest();

  pageRequest.addEventListener('load', function (event) {
    setVar.call(pageRequest, event, variable1, variable2, attribute1, attribute2);
  });

  pageRequest.open('GET', apiStr);
  pageRequest.send();
}

getRequest('https://swapi.co/api/people/4/', 'person4Name', 'person4HomeWorld', 'name', 'homeworld');
getRequest('https://swapi.co/api/people/14/', 'person14Name', 'person14Species', 'name', 'species');

function getFilms(url, parser) {
  let filmRequest = new XMLHttpRequest();
  filmRequest.addEventListener('load', function (event) {
    parseFilmData(parser.call(filmRequest, event));
  });
  filmRequest.open('GET', url);
  filmRequest.send();
}

function getRequestSingle(url, parser, variable) {
  let filmRequest = new XMLHttpRequest();
  filmRequest.addEventListener('load', function (event) {
    variable.innerText = parser.call(filmRequest, event);
  });
  filmRequest.open('GET', url);
  filmRequest.send();
}

function printResponse(response) {
  let resulting = JSON.parse(response.currentTarget.response)['results'];
  return resulting;
}

function getResponse(response) {
  let resulting = JSON.parse(response.currentTarget.response)['name'];
  return resulting;
}

function parseFilmData(response) {
  let filmList = document.getElementById('filmList');
  let makeLi = function (elementToAppendTo, liClass, h2Class, ulClass, liPlanet, h4Class, data) {

    let topLi = document.createElement('li');
    topLi.className = liClass;
    let h2 = document.createElement('h2');
    h2.className = h2Class;
    h2.innerText = data['title']
    let h3 = document.createElement('h3');
    h3.innerText = 'Planets';
    let ul = document.createElement('ul');
    ul.className = ulClass;

    for (let i = 0; i < data['planets']['length']; i++) {
      let bottomLi = document.createElement('li');
      bottomLi.className = liPlanet;

      let h4 = document.createElement('h4');
      h4.className = h4Class;
      getRequestSingle(data['planets'][i], getResponse, h4);
      bottomLi.appendChild(h4);
      ul.appendChild(bottomLi);
    }

    h3.appendChild(ul);
    topLi.appendChild(h2);
    topLi.appendChild(h3);
    elementToAppendTo.appendChild(topLi);
  }

  for (let i = 0; i < response['length']; i++) {
    makeLi(filmList, 'film', 'filmTitle', 'filmPlanets', 'planet', 'planetName', response[i]);
  }

}

getFilms('https://swapi.co/api/films/', printResponse, 'filmList');