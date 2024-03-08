document.getElementById('saveBtn').addEventListener('click', function() {
  // Get the entered times
  const wake= document.getElementById('wake').value;
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

  localStorage.setItem('userTimes', JSON.stringify(times));

  alert('Times saved successfully!');
  
});
