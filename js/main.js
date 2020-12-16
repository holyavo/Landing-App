// DOM Elements
const time = document.getElementById('time')
const greeting = document.getElementById('greeting')
const name = document.getElementById('name')
const focus = document.getElementById('focus')

// Options

const showAmPm = false
let stillTyping = false

//Show Time
function showTime(){
    let today = new Date()
    let hours = today.getHours()
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()

    // Set AM or PM
    const amPm = hours >= 12 ? 'PM' : 'AM'

    // 12hr Format check
    hours = (showAmPm ? (hours % 12 || 12) : hours)

    // Output Time
    time.innerHTML = `${hours}<spann>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)} <span>${(showAmPm ? amPm : '')}</span`

    setTimeout(showTime, 1000)

    setBgGreet()
}

// Add zero
function addZero(num){
    return num < 10 ? `0${num}` : num
}

//Set Background and Greeting
function setBgGreet(){
    let today = new Date()
    let hours = today.getHours()
    let sec = today.getSeconds()
    

    if(hours < 12 && hours > 4){
        //Morning
        document.body.style.backgroundImage = 'url(./img/morning.jpg)'
        greeting.textContent = 'Good Morning'
        document.body.style.color = 'white'
    }else if(hours < 18 && hours > 12){
        //Afternoon
        document.body.style.backgroundImage = 'url(./img/afternoon.jpg)'
        greeting.textContent = 'Good Afternoon'
        document.body.style.color = 'black'
    }else{
        //Evening
        document.body.style.backgroundImage = 'url(./img/evening.jpg)'
        greeting.textContent = 'Good Evening'
        document.body.style.color = 'white '
    }
}

// Get Name
function getName(){
    if(localStorage.getItem('name') == null){
        name.textContent = '[Enter name]'
    }else{
        name.textContent = localStorage.getItem('name')
    }
}

//Get focus
function getFocus(){
    if(localStorage.getItem('focus') == null){
        focus.textContent = '[Enter focus]'
    }else{
        focus.textContent = localStorage.getItem('focus')
    }
}

// Set name
function setName(e){
    if(e.type === 'keypress'){
        //Delete textContent after the key press first time
            stillTyping ? '' : e.target.textContent = '' 
            stillTyping = true
        //Make sure enter is pressed
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem('name', e.target.innerText)
            stillTyping = false
            name.blur()
        }
    }else{
        localStorage.setItem('name', e.target.innerText)
        stillTyping = false
    }
}

// Set focus
function setFocus(e){
    if(e.type === 'keypress'){
        //Delete textContent after the key press first time
        stillTyping ? '' : e.target.textContent = '' 
        stillTyping = true
        //Make sure enter is pressed
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem('focus', e.target.innerText)
            focus.blur()
        }
    }else{
        localStorage.setItem('focus', e.target.innerText)
        stillTyping = false
    }
}

name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)
focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)

// Run
showTime()
getName()
getFocus()