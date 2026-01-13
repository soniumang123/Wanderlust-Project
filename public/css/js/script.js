

(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // Trim all input and textarea values before validation
      const inputs = form.querySelectorAll('input, textarea')
      inputs.forEach(input => {
        if (input.type !== 'file') {  // don’t mess with image uploads
          input.value = input.value.trim()
        }
      })

      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // Trim all input and textarea values before validation
      const inputs = form.querySelectorAll('input, textarea')
      inputs.forEach(input => {
        if (input.type !== 'file') {  // don’t mess with image uploads
          input.value = input.value.trim()
        }
      })

      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

