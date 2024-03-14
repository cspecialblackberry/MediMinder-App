const listSection = document.getElementById("list");

const displayList = async () => {
    let userResponse = await fetch(`/user/session`);
    let userData = await userResponse.json();
    let userId = userData.user.id;

    const medResponse = await fetch(`/medication/${userId}`)
    const medData = await medResponse.json()

    console.log(medData[0])
    
    for (i in medData){
        let medDiv = document.createElement("div");

        let medNameP = document.createElement("p");
        medNameP.textContent = `${medData[i].name}`;
        medDiv.appendChild(medNameP);

        let whenTakenP = document.createElement("p");
        whenTakenP.textContent = `Taken ${medData[i].when_taken.toLowerCase()}`;
        medDiv.appendChild(whenTakenP);

        let startEndP = document.createElement("p");
        startEndP.textContent = `From ${dayjs(medData[i].start_date).format('MM/DD/YYYY')} to ${dayjs(medData[i].end_date).format('MM/DD/YYYY')}`;
        medDiv.appendChild(startEndP);

        let scheduleP = document.createElement("p");
        if(i.is_daily){
            scheduleP.textContent = "Daily";
        } else if (i.is_every_other){
            scheduleP.textContent = "Every Other Day";
        } else {
            scheduleP.textContent = `${medData[i].custom_schedule}`;
        }
        medDiv.appendChild(scheduleP);

        let notificationP = document.createElement("p");
        if(medData[i].has_notifications){
            notificationP.textContent = "Notifications enabled";
        } else {
            notificationP.textContent = "Notifications disabled";
        }
        medDiv.appendChild(notificationP);

        listSection.appendChild(medDiv);
    }
};

displayList();