function searchImages(event) {
  event.preventDefault();
  let search = document.getElementById('search').value.trim();
  let queries = search.split(',');

  let results = '';
  for (let query of queries) {
    query = query.trim();
    let url = `https://www.google.com/search?q=${query}&tbm=isch&tbo=u&source=univ&sa=X&ved=0ahUKEwi0gYz-1Y7tAhXSK80KHdCtDkoQsAQINQ&biw=1920&bih=969`;
    fetch(url)
      .then(response => response.text())
      .then(data => {
        let doc = new DOMParser().parseFromString(data, 'text/html');
        let imageURL = doc.querySelector('img').getAttribute('src');

        let tableRow = `
          <tr>
            <td>${query}</td>
            <td><img src="${imageURL}" alt="${query}"></td>
          </tr>
        `;
        results += tableRow;

        document.getElementById('results').innerHTML = `
          <table>
            <thead>
              <tr>
                <th>Search Query</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              ${results}
            </tbody>
          </table>
        `;
      })
      .catch(error => console.error(error));
  }
}
