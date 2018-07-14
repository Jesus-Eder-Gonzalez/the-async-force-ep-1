'use strict';

function setVar(request, variableToSet1, variableToSet2, attribute1, attribute2) {
  console.log(request);
  console.log(request.currentTarget.responseURL.includes('people'));
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
