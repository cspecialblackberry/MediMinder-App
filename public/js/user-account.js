document.getElementById('saveBtn').addEventListener('click', async function() {
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

//call a db method
const userData = await fetch('/user', {
  method: 'PUT',
  body: JSON.stringify ({times }),
  headers: { 'Content-Type': 'application/json' }
})

  localStorage.setItem('userTimes', JSON.stringify(times));

  alert('Times saved successfully!');
  
});



// write new function here and call it whenever they load the page
// if localStorage.userTime = (parse_
//   btime.value =)