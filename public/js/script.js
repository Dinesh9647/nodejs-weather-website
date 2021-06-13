console.log('Site is up on localhost server');

document.querySelector('.weather-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const address = document.querySelector('input').value;
    fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
        if(data.error) {
            document.querySelector('#message-1').innerHTML = data.error;
            document.querySelector('#message-2').innerHTML = '';
        }
        else {
            document.querySelector('#message-1').innerHTML = data.location;
            document.querySelector('#message-2').innerHTML = data.forecast;
        }
    })
})
})