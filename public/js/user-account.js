document.getElementById('saveBtn').addEventListener('click', async function () {
  // Get the entered times
  const wake = document.getElementById('wake').value;
  const bTime = document.getElementById('eatB').value;
  const lTime = document.getElementById('eatL').value;
  const dTime = document.getElementById('eatD').value;
  const sleep = document.getElementById('sleep').value;


  // Save times users enter to localStorage
  const times = {
    wake,
    bTime,
    lTime,
    dTime,
    sleep
  };


  //call a db method
  const userData = await fetch('/user', {
    method: 'PUT',
    body: JSON.stringify({ times }),
    headers: { 'Content-Type': 'application/json' }
  })

  localStorage.setItem('userTimes', JSON.stringify(times));

  alert('Times saved successfully!');

});


function reloadUserData() {
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