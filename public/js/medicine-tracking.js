const medNameField = document.getElementById('med-name');
const medicationTimesField = document.getElementById('medication-times');
const startDateField = document.getElementById('start-date');
const endDateField = document.getElementById('end-date');
const dailyCheck = document.getElementById('daily');
const everyOtherCheck = document.getElementById('every-other');
const customSchedule = document.getElementById('custom-schedule');
const notifications = document.getElementById('notifications');
const saveBtn = document.getElementById('save');
const checkboxSection = document.getElementById('checkbox-section');
let isCustom = false;

const monCheck = document.createElement('input');
const tueCheck = document.createElement('input');
const wedCheck = document.createElement('input');
const thuCheck = document.createElement('input');
const friCheck = document.createElement('input');
const satCheck = document.createElement('input');
const sunCheck = document.createElement('input');

const customScheduleView = () => {
    dailyCheck.checked = false;
    everyOtherCheck.checked = false;
    document.getElementById('checkbox-section').removeChild(
        document.getElementById('checkbox-section').children[0]
    );
    const customSchedDiv = document.createElement('div');

    const monCheckLabel = document.createElement('label');
    monCheckLabel.textContent = "Mo";
    monCheck.type = "checkbox";
    monCheck.setAttribute('id', 'mon-check');
    monCheck.setAttribute('class', 'custom-check');
    monCheckLabel.setAttribute('class', 'custom-label');
    monCheckLabel.setAttribute('for', 'mon-check');
    const monCustomDiv = document.createElement('div');
    monCustomDiv.appendChild(monCheckLabel);
    monCustomDiv.appendChild(monCheck);
    customSchedDiv.appendChild(monCustomDiv);

    const tueCheckLabel = document.createElement('label');
    tueCheckLabel.textContent = "Tu";
    tueCheck.type = "checkbox";
    tueCheck.setAttribute('id', 'tue-check');
    tueCheck.setAttribute('class', 'custom-check');
    tueCheckLabel.setAttribute('class', 'custom-label');
    tueCheckLabel.setAttribute('for', 'tue-check');
    const tueCustomDiv = document.createElement('div');
    tueCustomDiv.appendChild(tueCheckLabel);
    tueCustomDiv.appendChild(tueCheck);
    customSchedDiv.appendChild(tueCustomDiv);

    const wedCheckLabel = document.createElement('label');
    wedCheckLabel.textContent = "We";
    wedCheck.type = "checkbox";
    wedCheck.setAttribute('id', 'wed-check');
    wedCheck.setAttribute('class', 'custom-check');
    wedCheckLabel.setAttribute('class', 'custom-label');
    wedCheckLabel.setAttribute('for', 'wed-check');
    const wedCustomDiv = document.createElement('div');
    wedCustomDiv.appendChild(wedCheckLabel);
    wedCustomDiv.appendChild(wedCheck);
    customSchedDiv.appendChild(wedCustomDiv);

    const thuCheckLabel = document.createElement('label');
    thuCheckLabel.textContent = "Th";
    thuCheck.type = "checkbox";
    thuCheck.setAttribute('id', 'thu-check');
    thuCheck.setAttribute('class', 'custom-check');
    thuCheckLabel.setAttribute('class', 'custom-label');
    thuCheckLabel.setAttribute('for', 'thu-check');
    const thuCustomDiv = document.createElement('div');
    thuCustomDiv.appendChild(thuCheckLabel);
    thuCustomDiv.appendChild(thuCheck);
    customSchedDiv.appendChild(thuCustomDiv);

    const friCheckLabel = document.createElement('label');
    friCheckLabel.textContent = "Fr";
    friCheck.type = "checkbox";
    friCheck.setAttribute('id', 'fri-check');
    friCheck.setAttribute('class', 'custom-check');
    friCheckLabel.setAttribute('class', 'custom-label');
    friCheckLabel.setAttribute('for', 'fri-check');
    const friCustomDiv = document.createElement('div');
    friCustomDiv.appendChild(friCheckLabel);
    friCustomDiv.appendChild(friCheck);
    customSchedDiv.appendChild(friCustomDiv);

    const satCheckLabel = document.createElement('label');
    satCheckLabel.textContent = "Sa";
    satCheck.type = "checkbox";
    satCheck.setAttribute('id', 'sat-check');
    satCheck.setAttribute('class', 'custom-check');
    satCheckLabel.setAttribute('class', 'custom-label');
    satCheckLabel.setAttribute('for', 'sat-check');
    const satCustomDiv = document.createElement('div');
    satCustomDiv.appendChild(satCheckLabel);
    satCustomDiv.appendChild(satCheck);
    customSchedDiv.appendChild(satCustomDiv);

    const sunCheckLabel = document.createElement('label');
    sunCheckLabel.textContent = "Su";
    sunCheck.type = "checkbox";
    sunCheck.setAttribute('id', 'sun-check');
    sunCheck.setAttribute('class', 'custom-check');
    sunCheckLabel.setAttribute('class', 'custom-label');
    sunCheckLabel.setAttribute('for', 'sun-check');
    const sunCustomDiv = document.createElement('div');
    sunCustomDiv.appendChild(sunCheckLabel);
    sunCustomDiv.appendChild(sunCheck);
    customSchedDiv.appendChild(sunCustomDiv);

    customSchedDiv.setAttribute('id', 'checkbox-section-left1');
    checkboxSection.prepend(customSchedDiv);
}
customSchedule.addEventListener('click', customScheduleView);

const checkIsCustom = () => {
    if (monCheck.checked) {
        isCustom = true;
    }
    if (tueCheck.checked) {
        isCustom = true;
    }
    if (wedCheck.checked) {
        isCustom = true;
    }
    if (thuCheck.checked) {
        isCustom = true;
    }
    if (friCheck.checked) {
        isCustom = true;
    }
    if (satCheck.checked) {
        isCustom = true;
    }
    if (sunCheck.checked) {
        isCustom = true;
    }
}

let customDaysArray = [];
const makeCustomDaysString = () => {
    if (typeof customDaysArray === "string") {
        customDaysArray = customDaysArray.split(",");
    }
    if (monCheck.checked) {
        customDaysArray.push("1")
    }
    if (tueCheck.checked) {
        customDaysArray.push("2")
    }
    if (wedCheck.checked) {
        customDaysArray.push("3")
    }
    if (thuCheck.checked) {
        customDaysArray.push("4")
    }
    if (friCheck.checked) {
        customDaysArray.push("5")
    }
    if (satCheck.checked) {
        customDaysArray.push("6")
    }
    if (sunCheck.checked) {
        customDaysArray.push("0")
    }
    customDaysArray = customDaysArray.toString();
    return customDaysArray;
}

const getUserId = async () => {
    let userResponse = await fetch(`/user/session`);
    let userData = await userResponse.json();
    return userData.user.id;
}

const postMedication = async () => {
    checkIsCustom();
    let medName = medNameField.value;
    let medicationTimes = medicationTimesField.value;
    let startDate = dayjs(startDateField.value).format('MM/DD/YYYY');
    let endDate = dayjs(endDateField.value).format('MM/DD/YYYY');
    let isDaily = dailyCheck.checked;
    let isEveryOther = everyOtherCheck.checked;
    let hasNotifications = notifications.checked;
    let customDaysString = makeCustomDaysString();
    let userId = await getUserId();

    if ((!dailyCheck.checked) && (!everyOtherCheck.checked) && (!isCustom)) {
        alert("Please select a schedule before saving")
        console.log("Select one or more days")
        return;
    }

    if (medName && (medicationTimes != "default") && (startDate != "Invalid Date") && (endDate != "Invalid Date")) {
        const medData = await fetch('/medication', {
            method: 'POST',
            body: JSON.stringify({
                name: medName,
                when_taken: medicationTimes,
                start_date: startDate,
                end_date: endDate,
                is_daily: isDaily,
                is_every_other: isEveryOther,
                custom_schedule: customDaysString,
                has_notifications: hasNotifications,
                user_id: userId,
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        alert("Posted new medication")
        medNameField.value = ''
        medicationTimesField.value = ''
        startDateField.value = ''
        endDateField.value = ''
        notifications.checked = false
        dailyCheck.checked = true
        everyOtherCheck.checked = false
        
    } else {
        alert("Please ensure all fields are filled.")
        return;
    }
}
saveBtn.addEventListener('click', postMedication);

/*AutoComplete Code*/
const autocompleteSection = document.getElementById('drop-down-list')
const input = document.getElementById('med-name')


const autocompleteInput = async () => {

    const value = input.value
    autocompleteSection.innerText = ''
    if (!value.length) {
        autocompleteSection.setAttribute('class', 'hidden')
        return
    }
    const autoValues = options.filter((med) => {
        const medSlice = med.slice(0, value.length)
        if (medSlice.toLowerCase() === value.toLowerCase()) {
            return med
        }
    })
    if (autoValues) {
        //removes extra medicines if there are more than 10
        if (autoValues.length > 10) {
            autoValues.splice(10, autoValues.length - 10)
        }
        autocompleteSection.removeAttribute('class', 'hidden')
        const autoFills = autoValues.map((med) => {
            const div = document.createElement('div')
            div.textContent = med
            div.addEventListener('click', (event) => {
                autocompleteSection.innerText = ''
                input.value = event.target.textContent
                autocompleteSection.setAttribute('class', 'hidden')
            })
            autocompleteSection.appendChild(div)
        })
    }
}

input.addEventListener('keyup', autocompleteInput)

window.addEventListener('click', (event) => {
    if (!event.target.value) {
        autocompleteSection.setAttribute('class', 'hidden')
    }
})

