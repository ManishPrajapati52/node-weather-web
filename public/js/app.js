console.log('Client Side JavaScript')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const res = document.getElementById('result')
weatherForm.addEventListener('submit',(e)=>{
    res.innerHTML = 'loading....'
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
            res.innerHTML = data.error
        else
        {
            res.innerHTML = '<br>' + data.location + '<br><br>' + data.forecast
        }
    })
})
})