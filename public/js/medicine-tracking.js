const medName = document.getElementById('med-name');
const medicationTimes = document.getElementById('medication-times');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const dailyCheck = document.getElementById('daily');
const everyOtherCheck = document.getElementById('every-other');
const customSchedule = document.getElementById('custom-schedule');
const notifications = document.getElementById('notifications');
const saveBtn = document.getElementById('save');

const checkboxSection = document.getElementById('checkbox-section');

const customScheduleView = () => {
    document.getElementById('checkbox-section').removeChild(
        document.getElementById('checkbox-section').children[0]
    );
    const customSchedDiv = document.createElement('div');

    const monCheck = document.createElement('input');
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
    customSchedDiv.appendChild(monCustomDiv)

    const tueCheck = document.createElement('input');
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

    const wedCheck = document.createElement('input');
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

    const thuCheck = document.createElement('input');
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

    const friCheck = document.createElement('input');
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

    const satCheck = document.createElement('input');
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

    const sunCheck = document.createElement('input');
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

    customSchedDiv.setAttribute('id','checkbox-section-left1');
    checkboxSection.prepend(customSchedDiv);
}

customSchedule.addEventListener('click', customScheduleView);






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
        if(autoValues.length > 10){
            autoValues.splice(10, autoValues.length - 10)
        }
        autocompleteSection.removeAttribute('class', 'hidden')
        const autoFills = autoValues.map((med) => {
            const div = document.createElement('div')
            div.textContent = med
            div.addEventListener('click', (event) => {
                autocompleteSection.innerText = ''
                input.value=event.target.textContent
                autocompleteSection.setAttribute('class', 'hidden')
            })
            autocompleteSection.appendChild(div)
        })
    }
}

input.addEventListener('keyup', autocompleteInput)

window.addEventListener('click', (event) => {
    if(!event.target.value) {
        autocompleteSection.setAttribute('class', 'hidden')
    }
})

