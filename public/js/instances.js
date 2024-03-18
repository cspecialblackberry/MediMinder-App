const listDiv = document.getElementById('list');
const date = document.getElementById('date')
date.innerHTML = dayjs().format('dddd MMMM DD, YYYY')

const displayInstances = async() => {

    let userResponse = await fetch(`/user/session`);
    let userData = await userResponse.json();
    let userId = parseInt(userData.user.id);

    const medResponse = await fetch(`/medication/${userId}`)
    const medData = await medResponse.json()

    let userMealResponse = await fetch(`/user/${userId}`);
    let userMealData = await userMealResponse.json();

    for (let i in medData){
        //determine if today is an "every other" day from start date
        let startDate = dayjs(medData[i].start_date).format('MM/DD/YYYY');
        let daysSince = dayjs().diff(startDate, 'day');
        let isEveryOther = false;
        if (daysSince % 2 == 0) {
            isEveryOther = true;
        }

        //determine if today is one of the custom selected days
        let isCustomDay = false;
        if(medData[i].custom_schedule.includes(dayjs().day())){
            isCustomDay = true;
        }

        //get the exact med administration time specified by user based on meal times
        let medAdminTime;
        switch (medData[i].when_taken) {
            case "Upon waking up": medAdminTime = userMealData.wake_up_time;
            break;
            case "With breakfast": medAdminTime = userMealData.breakfast_time;
            break;
            case "With Lunch": medAdminTime = userMealData.lunch_time;
            break;
            case "With Dinner": medAdminTime = userMealData.dinner_time;
            break;
            case "At Bedtime": medAdminTime = userMealData.bed_time;
            break;
        }

        let pastStartDate;
        if(dayjs().format('MM/DD/YYYY') >= medData[i].start_date){
            pastStartDate = true;
            console.log(pastStartDate)
        }

        //determines if today is a day you take the medication                        
        let todayIsMedDay = false;
        if(medData[i].is_daily){
            todayIsMedDay = true;
        } else if (medData[i].is_every_other && isEveryOther){
            todayIsMedDay = true;
        } else if (isCustomDay){
            todayIsMedDay = true;
        }

        if(!pastStartDate){
            todayIsMedDay = false;
        }


        //logic for instances
        if(todayIsMedDay){ //if today is a med day
            if(dayjs().format('HH:mm:ss') > medAdminTime){ //if med time has passed
                if(!medData[i].date_checked){ //if med instance hasn't already been checked off
                    //Display the instance to the page (name, when_taken, ask if they took [YES/NO])
                    const instanceDiv = document.createElement('div');
                    listDiv.appendChild(instanceDiv);
                    instanceDiv.setAttribute('class', 'item-div');
                    const instanceP = document.createElement('p');
                    instanceDiv.appendChild(instanceP);
                    instanceP.textContent = `Did you take your ${medData[i].name} at ${medAdminTime}?`;
                    const yesButton = document.createElement('button');
                    instanceDiv.appendChild(yesButton);
                    yesButton.textContent = "TAKEN";
                    yesButton.addEventListener('click', async () => {

                        //change dateChecked to now via put request
                        const updateDateCheckedYes = await fetch(`/medication/${medData[i].id}`, {
                            method: 'PUT',
                            body: JSON.stringify({ 
                                date_checked: dayjs().format('MM/DD/YYYY'),
                            }),
                            headers: { 'Content-Type': 'application/json' }
                        });
                        alert("Successful medication administration confirmed");
                        listDiv.removeChild(instanceDiv);
                    });
                    const noButton = document.createElement('button');
                    instanceDiv.appendChild(noButton);
                    noButton.textContent = "MISSED";
                    noButton.addEventListener('click', async () => {

                        //change dateChecked to now
                        const updateDateCheckedNo = await fetch(`/medication/${medData[i].id}`, {
                            method: 'PUT',
                            body: JSON.stringify({ 
                                date_checked: dayjs().format('MM/DD/YYYY'),
                            }),
                            headers: { 'Content-Type': 'application/json' }
                        });
                        //post request to med calendar db
                        const postToCalendar = await fetch('/api/calendar', {
                            method: 'POST',
                            body: JSON.stringify({ 
                                day: dayjs().format('D'),
                                month: dayjs().format('M'),
                                year: dayjs().format('YYYY'),
                                medication: medData[i].name,
                                user_id: userId,
                            }),
                            headers: { 'Content-Type': 'application/json' }
                        });
                        alert("Missed administration time logged");
                        listDiv.removeChild(instanceDiv);
                    });
                }
            }
        }
    }
}
displayInstances()                        