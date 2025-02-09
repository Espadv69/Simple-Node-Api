document.addEventListener('DOMContentLoaded', () => {
  // ToogleTheme
  let isDarkMode = false
  const $themeToogleBtn = document.querySelector('.themeToogle')
  $themeToogleBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode
    document.body.className = isDarkMode ? 'dark' : 'light'
  })

  // Get all users when page is loaded
  fetchUsers()

  // Handle form submit to create a new user
  const $form = document.querySelector('.create-user-form')
  $form.addEventListener('submit', (event) => {
    event.preventDefault()
    const $name = document.querySelector('.user-name').value
    createUser($name)
  })

  // Function to get all users from the API
  async function fetchUsers() {
    const response = await fetch('/users')
    const users = await response.json()

    const $userList = document.querySelector('.users-list')
    $userList.innerHTML = '' // Clean up before add new users

    users.forEach((user) => {
      const $li = document.createElement('li')
      $li.textContent = `${user.name} (ID: ${user.id})`

      // Delete button
      const $deleteBtn = document.createElement('button')
      $deleteBtn.textContent = '❌'
      $deleteBtn.addEventListener('click', deleteUser) // ToDo

      $li.appendChild($deleteBtn)
      $userList.appendChild($li)
    })
  }

  // Function to create a new user
  async function createUser(name) {
    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })

    if (response.ok) {
      const newUser = await response.json()
      console.log('User created:', newUser)
      fetchUsers() // Update user list
    }
  }
})
