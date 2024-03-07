const createUser = async (event) => {
    const email = document.getElementById('email-input').value.trim()
    const username = document.getElementById('user-input').value.trim()
    const password = document.getElementById('pass-input').value.trim()

    if(email && username && password) {
        console.log(email, username, password)
        const newUser = await fetch('/create_account', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    if (newUser.ok) {
        document.location.replace('/')
    } else {
        alert('Failed to create an account.')
    }
}

(document.getElementById('create-btn')).addEventListener('click', createUser)