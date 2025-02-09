document.addEventListener('DOMContentLoaded', () => {
  // Get all users when page is loaded
  fetchUsers() // Todo

  // Handle form submit to create a new user
  const $form = document.querySelector('.create-user-form')
  $form.addEventListener('submit', (event) => {
    event.preventDefault()
    const $name = document.querySelector('.user-name').value
  })
})