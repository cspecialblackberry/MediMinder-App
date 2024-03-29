const logout = async () => {
    const response = await fetch('/login/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        //send users back to login
        document.location.replace('/login')
    } else {
        alert('Failed to log out')
    }

}

document.getElementById('logout').addEventListener('click', logout)
document.getElementById('logout-btn').addEventListener('click', logout)