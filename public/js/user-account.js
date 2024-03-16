document.getElementById('saveBtn').addEventListener('click', async function () {
  // Get the entered times
  const wake_up_time = document.getElementById('wake').value;
  const breakfast_time = document.getElementById('eatB').value;
  const lunch_time = document.getElementById('eatL').value;
  const dinner_time = document.getElementById('eatD').value;
  const bed_time = document.getElementById('sleep').value;


  // Save times users enter to localStorage
  const times = {
    wake_up_time,
    breakfast_time,
    lunch_time,
    dinner_time,
    bed_time,
  };

if(wake_up_time && breakfast_time && lunch_time && dinner_time && bed_time){
  //call a db method
  const userData = await fetch('/user', {
    method: 'PATCH',
    body: JSON.stringify({ 
      "wake_up_time": wake_up_time,
      "breakfast_time": breakfast_time,
      "lunch_time": lunch_time,
      "dinner_time": dinner_time,
      "bed_time": bed_time, 
    }),
    headers: { 'Content-Type': 'application/json' }
  })

  //console.log(userData)

  //localStorage.setItem('userTimes', JSON.stringify(times));

  alert('Times saved successfully!');
}

});


async function reloadUserData() {

  // Retrieve the saved data from local storage
  //const userData = JSON.parse(localStorage.getItem('userTimes'));
  const sessionResponse = await fetch('/user/session')
  const sessionData = await sessionResponse.json()
  const userId = sessionData.user.id
  const userResponse = await fetch(`/user/${userId}`)
  const userData = await userResponse.json()

  // Get the entered times
  const wake = document.getElementById('wake');
  const bTime = document.getElementById('eatB');
  const lTime = document.getElementById('eatL');
  const dTime = document.getElementById('eatD');
  const sleep = document.getElementById('sleep');
  // Check if there is saved user data
  if (userData) {
    console.log(userData);

    wake.value = userData.wake_up_time;
    bTime.value = userData.breakfast_time;
    lTime.value = userData.lunch_time;
    dTime.value = userData.dinner_time;
    sleep.value = userData.bed_time;
  }
}

window.onload = function () {
  reloadUserData();
};

const deleteButton = document.getElementById('delete')

const deleteUser = async () => {
  const response = await fetch('/user/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })

  document.location.replace('/login')
}

deleteButton.addEventListener('click', deleteUser)