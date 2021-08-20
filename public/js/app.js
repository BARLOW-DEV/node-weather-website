

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

    fetch('/weather?address=' + location ).then( (response) => { //not node, fetch() is part of the browser
        response.json().then( (data) => {             // fetch works like this -> fetch() data from provided url, .then() 'then'
            if (data.error) {                         // send that data, in this case a json object, and run the call back function.
                messageOne.textContent = data.error   //callback works like this -> response given to call back, rendered as json with
            } else {                                  // .json() and .then() is called which takes the json object now called given by .json()
                messageOne.textContent = data.location // data in another callback which assignes the attributes of the data object 
                messageTwo.textContent = data.forecast // to specific printouts 'messageOne, messageTwo etc.' 
            }
        })
    })
})

