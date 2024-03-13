const createUser = async (event) => {
    const email = document.getElementById('email-input').value.trim()
    const username = document.getElementById('user-input').value.trim()
    const password = document.getElementById('pass-input').value.trim()

    if(email && username && password) {
        const object = {username, email, password}
        const newUser = await fetch('/create_account', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: { 'Content-Type': 'application/json' }
        })
        
        if (newUser.ok) {
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
        } else {
            alert('Failed to create an account.')
        }
    }
   
   
}

(document.getElementById('create-btn')).addEventListener('click', createUser)