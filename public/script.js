document.addEventListener('DOMContentLoaded', () => {
  // Get all users when page is loaded
  fetchUsers() // ToDo

  // Handle form submit to create a new user
  const $form = document.querySelector('.create-user-form')
  $form.addEventListener('submit', (event) => {
    event.preventDefault()
    const $name = document.querySelector('.user-name').value
    createUser($name) // ToDo
  })

  // Function to get all users from the API
  async function fetchUsers() {
    const response = await fetch('/users')
    const users = await response.json()

    const $userList = document.querySelector('.users-list')
    $userList.innerHTML = '' // Clean up before add new users

    users.forEach(user => {
      const $li = document.createElement('li')
      $li.textContent = `${user.name} (ID: ${user.id})`
      $userList.appendChild($li)
    })
  }
})