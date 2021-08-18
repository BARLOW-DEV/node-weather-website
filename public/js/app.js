

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {  // (e) is the event object provided
    e.preventDefault() //default behavior of forms is to completely refresh the page. This made sense in the old days,
    // but now we have access to good client side javascript. preventDefault() prevents this default behavior.

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location ).then( (response) => {
        response.json().then( (data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

