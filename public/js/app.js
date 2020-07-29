$(document).ready(() => {
  $('form').submit((e) => {
    e.preventDefault()
    const location = $('input').val()
    fetch(`http://localhost:3000/weather/?address=${location}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.loc);
          console.log(data.forecast);
        }
      })
    })
  })
})


