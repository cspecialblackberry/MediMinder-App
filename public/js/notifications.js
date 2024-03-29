

const returnUserId = async () => {
    let userResponse = await fetch(`/user/session`);
    let userData = await userResponse.json();
    let userId = parseInt(userData.user.id);
    return userId;
}

const returnMedData = async () => {
    let userId = await returnUserId();
    const medResponse = await fetch(`/medication/${userId}`);
    const medData = await medResponse.json();
    return medData;
}

//if end_date has passed, remove med from the database
const removeMedPastEndDate = async () => {
    let medData = await returnMedData();
    for (let i in medData) {
        if (dayjs().format('MM/DD/YYYY') > dayjs(medData[i].end_date).format('MM/DD/YYYY')) {
            const removeExpiredDate = await fetch(`/medication/${medData[i].id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
}

const checkMissed = async () => {
    let userId = await returnUserId();
    let medData = await returnMedData();

    for (let i in medData) {
        if (medData[i].instance_date) {
            if (medData[i].instance_date != dayjs().format('MM/DD/YYYY')) {
                if (!medData[i].date_checked) {
                    const postToCalendar = await fetch('/api/calendar', {
                        method: 'POST',
                        body: JSON.stringify({
                            day: dayjs(medData[i].instance_date).format('D'),
                            month: dayjs(medData[i].instance_date).format('M'),
                            year: dayjs(medData[i].instance_date).format('YYYY'),
                            medication: medData[i].name,
                            user_id: userId,
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const nullInstanceDate = await fetch(`/medication/${medData[i].id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            instance_date: null,
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
            }
        }
    }
}

//if date_checked is not equal to today's date, set it to null using a put request
const resetDateChecked = async () => {
    let medData = await returnMedData();

    for (let i in medData) {
        if (medData[i].date_checked != dayjs().format('MM/DD/YYYY')) {
            const setDateChecked = await fetch(`/medication/${medData[i].id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    date_checked: null,
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
}
let isFirstNotification = true;
//if by "instances" logic there are currently any active instances, send a notification
const findInstancesForNotifications = async () => {
    let medData = await returnMedData();
    let userId = await returnUserId();
    let userMealResponse = await fetch(`/user/${userId}`);
    let userMealData = await userMealResponse.json();

    for (let i in medData) {
        //determine if today is an "every other" day from start date
        let startDate = dayjs(medData[i].start_date).format('MM/DD/YYYY');
        let daysSince = dayjs().diff(startDate, 'day');
        let isEveryOther = false;
        if (daysSince % 2 == 0) {
            isEveryOther = true;
        }

        //determine if today is one of the custom selected days
        let isCustomDay = false;
        if (medData[i].custom_schedule.includes(dayjs().day())) {
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
        }

        //determines if today is a day you take the medication                        
        let todayIsMedDay = false;
        if (medData[i].is_daily) {
            todayIsMedDay = true;
        } else if (medData[i].is_every_other && isEveryOther) {
            todayIsMedDay = true;
        } else if (isCustomDay) {
            todayIsMedDay = true;
        }

        if(!pastStartDate){
            todayIsMedDay = false;
        }

        //logic for sending notifications
        if (todayIsMedDay) { //if today is a med day
            if (dayjs().format('HH:mm:ss') > medAdminTime) { //if med time has passed
                const setInstanceDate = await fetch(`/medication/${medData[i].id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        instance_date: dayjs().format('MM/DD/YYYY'),
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!medData[i].date_checked) { //if med instance hasn't already been checked off
                    //send user a notification, and set current date to instance_date in db
                    if (medData[i].has_notifications && isFirstNotification) {
                        Notification.requestPermission().then(perm => {
                            if (perm === "granted") {
                                const notification = new Notification("New Medicine Admin Time", {
                                    body: "You have pending medication times. Click to mark taken or missed",
                                })
                                notification.addEventListener("click", () => {
                                    document.location.replace('/instances')
                                })
                            }
                        })
                        isFirstNotification = false;
                    }
                }
            }
        }
    }
}
checkMissed()
resetDateChecked()
removeMedPastEndDate()
findInstancesForNotifications()
