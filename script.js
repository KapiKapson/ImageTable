const form = document.querySelector('form');
const queries = document.querySelector('#queries');
const submit = document.querySelector('#submit');
const results = document.querySelector('#results');

submit.addEventListener('click', e => {
  e.preventDefault();
  
  // Split queries by colons
  const queryList = queries.value.split(':').map(q => q.trim());
  
  // Clear results div
  results.innerHTML = '';
  
  // Loop through each query and fetch image
  queryList.forEach(query => {
    fetch(`https://www.google.com/search?q=${query}&tbm=isch`)
      .then(response => response.text())
      .then(text => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(text, 'text/html');
        const imgSrc = htmlDoc.querySelector('img').src;
        
        // Add query and image to results table
        const row = document.createElement('tr');
        const queryCell = document.createElement('td');
        const imgCell = document.createElement('td');
        const img = document.createElement('img');
        
        queryCell.textContent = query;
        img.src = imgSrc;
        imgCell.appendChild(img);
        
        row.appendChild(queryCell);
        row.appendChild(imgCell);
        
        results.appendChild(row);
      })
      .catch(error => {
        console.error(`Error fetching image for query "${query}":`, error);
      });
  });
});
