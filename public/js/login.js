const login = async () => {
    const username = document.getElementById('user-input').value.trim()
    const password = document.getElementById('pass-input').value.trim()

    if (username && password) {
        const userData = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: { 'Content-Type': 'application/json' }
        })

        if(userData.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to log in.')
        }
    }
}


document.getElementById('login-btn').addEventListener('click', login)