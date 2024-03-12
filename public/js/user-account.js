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


  //call a db method
  const userData = await fetch('/user', {
    method: 'PUT',
    body: JSON.stringify({ 
      wake_up_time,
      breakfast_time,
      lunch_time,
      dinner_time,
      bed_time, 
    }),
    headers: { 'Content-Type': 'application/json' }
  })

  localStorage.setItem('userTimes', JSON.stringify(times));

  alert('Times saved successfully!');

});


async function reloadUserData() {

  const user = await fetch('/user/session')
  console.log(await user.json())

 


  // Retrieve the saved data from local storage
  const userData = JSON.parse(localStorage.getItem('userTimes'));

  // Get the entered times
  const wake = document.getElementById('wake');
  const bTime = document.getElementById('eatB');
  const lTime = document.getElementById('eatL');
  const dTime = document.getElementById('eatD');
  const sleep = document.getElementById('sleep');
  // Check if there is saved user data
  if (userData) {
    console.log(userData);

    wake.value = userData.wake;
    bTime.value = userData.bTime;
    lTime.value = userData.lTime;
    dTime.value = userData.dTime;
    sleep.value = userData.sleep;
  }
}

window.onload = function () {
  reloadUserData();

};