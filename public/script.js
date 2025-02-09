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
      $deleteBtn.addEventListener('click', () => deleteUser(user.id))

      // Update button
      const $updateBtn = document.createElement('button')
      $updateBtn.textContent = '✏️'
      $updateBtn.addEventListener('click', () => updateUser(user.id, user.name)) // ToDo

      $li.appendChild($updateBtn)
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

      const $nameInput = document.querySelector('.user-name')
      $nameInput.value = ''
    }
  }

  async function updateUser(id, currentName) {
    const newName = prompt('Enter new Name:', currentName)

    if (newName) {
      const response = await fetch(`/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      })

      if (response.ok) {
        const updateUser = await response.json()
        console.log('User updated:', updateUser)
        fetchUsers()
      } else {
        console.error('Error updating user')
      }
    }
  }

  async function deleteUser(id) {
    const response = await fetch(`/users/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      fetchUsers() // Reload users list
    } else {
      console.error('Error deleting user')
    }
  }
})
