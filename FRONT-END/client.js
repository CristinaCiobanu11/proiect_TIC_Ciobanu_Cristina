let url = 'http://127.0.0.1:3000/data';
let data = {};

document
  .getElementById('submit')
  .addEventListener('click', (event) => {
      data.value = document.getElementById('data').value;
      postData();
      event.preventDefault();
  });

function postData() {
    console.log('Trying to send data to server app: ', data);
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(response => console.log('Server response:', response))
    .catch(error => console.error('Error:', error));
}
