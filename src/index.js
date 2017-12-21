function component() {
  const element = document.createElement("pre");

  fetch(
    "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  ).then(response => {
    return response.json().then(json => {
      element.innerHTML = JSON.stringify(json.data, null, 2);
    });
  });

  return element;
}

document.body.appendChild(component());
