const listSection = document.getElementById("list");

const getMedications = async(userId) => {
    const response = await fetch(`/medications/${userId}`)
    const data = await response.json()
    return(data)
}

//need to access the current user id
//let userId = 

const displayList = async (userId) => {
    const object = await getMedications(userId);
    for (i in object){
        let medDiv = document.createElement(div);

        let medNameP = document.createElement(p);
        medNameP.textContent = `${i.name}`;
        medDiv.appendChild(medNameP);

        let whenTakenP = document.createElement(p);
        whenTakenP.textContent = `Taken ${i.when_taken}`;
        medDiv.appendChild(whenTakenP);

        let startEndP = document.createElement(p);
        startEndP.textContent = `From ${i.start_date} to ${i.end_date}`;
        medDiv.appendChild(startEndP);

        let scheduleP = document.createElement(p);
        if(i.is_daily){
            scheduleP.textContent = "Daily";
        } else if (i.is_every_other){
            scheduleP.textContent = "Every Other Day";
        } else {
            scheduleP.textContent = `${custom_schedule}`;
        }
        medDiv.appendChild(scheduleP);

        let notificationP = document.createElement(p);
        if(i.has_notifications){
            notificationP.textContent = "Notifications enabled";
        } else {
            notificationP.textContent = "Notifications disabled";
        }
        medDiv.appendChild(notificationP);

        listSection.appendChild(medDiv);
    }
};

displayList();