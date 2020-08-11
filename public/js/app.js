$(document).ready(() => {
  $('form').submit((e) => {
    e.preventDefault()
    const location = $('input').val()
    const successMessage = $('.successMessage')
    const errorMessage = $('.errorMessage')
    fetch(`/weather/?address=${location}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          errorMessage.append(data.error)
        } else {
          successMessage.append(data.loc)
          successMessage.append('<br>')
          successMessage.append(data.forecast)
        }
      })
    })
  })
})


