const logout = async () => {
    const response = await fetch('/login/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    console.log(response)
    if (response.ok) {
        document.location.replace('/')
    } else {
        alert('Failed to log out')
    }

}


document.getElementById('logout-btn').addEventListener('click', logout)