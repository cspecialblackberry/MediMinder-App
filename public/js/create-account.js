const createUser = async (event) => {
    console.log('hello')
    const email = document.getElementById('email-input').value.trim()
    const username = document.getElementById('user-input').value.trim()
    const password = document.getElementById('pass-input').value.trim()

    if(email && username && password) {
        console.log(email, username, password)
    }



}

(document.getElementById('create-btn')).addEventListener('click', createUser)