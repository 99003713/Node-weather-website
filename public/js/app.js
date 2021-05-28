

console.log('Client side java script is loaded!')





const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg_1 = document.getElementById('msg-1')
const msg_2 = document.getElementById('msg-2')



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = searchElement.value
     
    msg_1.textContent = 'Loading......'
    msg_2.textContent = ''

    // console.log(location)

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {

            if (data.error) {

                msg_1.textContent = data.error
                console.log(data.error)

            }
            else {
                console.log(data.location)
                console.log(data.forecast)
                msg_1.textContent = data.location
                msg_2.textContent = data.forecast
            }

        })
    })
})