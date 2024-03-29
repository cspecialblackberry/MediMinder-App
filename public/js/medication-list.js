const listSection = document.getElementById("list");

const displayList = async () => {
    let userResponse = await fetch(`/user/session`);
    let userData = await userResponse.json();
    let userId = userData.user.id;

    const medResponse = await fetch(`/medication/${userId}`)
    const medData = await medResponse.json()

    for (i in medData) {
        let medDiv = document.createElement("div");
        medDiv.setAttribute('class', 'item-div');
        let medNameP = document.createElement("a");
        medNameP.href = '/medicine_editing'    
        medNameP.textContent = `${medData[i].name}`;
        const id = `${medData[i].id}`
        medNameP.addEventListener('click', () => {
            sessionStorage.setItem('medicationId', id)
        })
        medDiv.appendChild(medNameP);

        let whenTakenP = document.createElement("p");
        whenTakenP.textContent = `Taken ${medData[i].when_taken.toLowerCase()}`;
        medDiv.appendChild(whenTakenP);

        let startEndP = document.createElement("p");
        startEndP.textContent = `From ${dayjs(medData[i].start_date).format('MM/DD/YYYY')} to ${dayjs(medData[i].end_date).format('MM/DD/YYYY')}`;
        medDiv.appendChild(startEndP);

        let scheduleP = document.createElement("p");
        if (medData[i].is_daily) {
            scheduleP.textContent = "Daily";
        } else if (medData[i].is_every_other) {
            scheduleP.textContent = "Every Other Day";
        } else {
            scheduleP.textContent = `${medData[i].custom_schedule}`;
        }
        medDiv.appendChild(scheduleP);

        let notificationP = document.createElement("p");
        if (medData[i].has_notifications) {
            notificationP.innerHTML = "Notifications enabled &#10003;";
        } else {
            notificationP.innerHTML = "Notifications disabled &#10060";
        }
        medDiv.appendChild(notificationP);

        let deleteButton = document.createElement("button")
        deleteButton.setAttribute('id', medData[i].id)
        deleteButton.textContent = 'Delete Medication'
        deleteButton.addEventListener('click', async (event) => {
            const response = await fetch(`/medication/${event.target.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            listSection.removeChild(event.target.parentElement)
        })
        medDiv.appendChild(deleteButton)

        listSection.appendChild(medDiv);
    }
};

displayList();