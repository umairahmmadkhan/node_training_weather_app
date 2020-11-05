const webForm = document.querySelector('form')
const input = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')

webForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = input.value
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                msgOne.textContent = data.error
                msgTwo.textContent = ''
            }else{
                msgOne.textContent = data.location
                msgTwo.textContent = data.temperature
            }
        })
    })
})
