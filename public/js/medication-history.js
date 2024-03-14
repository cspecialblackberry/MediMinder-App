const left = document.querySelector('#left')
const right = document.querySelector('#right')
const sunday = document.querySelector('#sunday')
const monday = document.querySelector('#monday')
const tuesday = document.querySelector('#tuesday')
const wednesday = document.querySelector('#wednesday')
const thursday = document.querySelector('#thursday')
const friday = document.querySelector('#friday')
const saturday = document.querySelector('#saturday')
const monthText = document.querySelector('#month')
const calendar = document.querySelector('#calendar')

left.textContent = '<<'
right.textContent = '>>'

const actualMonth = dayjs().month() + 1
const actualYear = dayjs().year()
let month = actualMonth
let year = actualYear
let today = dayjs().date()

const getMonth = async(user, year, month) => {
    const response = await fetch(`api/calendar/${user}/${year}/${month}`)
    const currentMonth = await response.json()
    return currentMonth
}

const initialize = async (year, month) => {
    const response = await fetch(`/user/session`)
    const data = await response.json()
    const user = data.user.id
    monthText.textContent = dayjs(year + '-' + month + '-01', 'YYYY MM DD').format('MMM YYYY')
    let first = dayjs(year + '-' + month + '-01', 'YYYY MM DD').day() //gets what day of the week the first day of the month is
    let last = parseInt(dayjs(year + '-' + (month+1) + '-01', 'YYYY MM DD').subtract(1, 'day').format('DD')) //gets the last day of the month
    const calendarArr= []
    for(let i = 0; i < first; i++){
        calendarArr.push(1)
    }
    const currentMonth = await getMonth(user, year, month)
    for(i in currentMonth){
        if(calendarArr[currentMonth[i].day + first -1]){
            calendarArr[currentMonth[i].day + first -1] = calendarArr[currentMonth[i].day + first -1] + ', ' + currentMonth[i].medication
        }else{
            calendarArr[currentMonth[i].day + first -1] = currentMonth[i].medication
        }
    }
    let j = 0
    while(j < first + last || j%7 != 0){
        const p = document.createElement('p')
        //adjusts for months where the first day is a sunday
        if(j + first === 0){
            first++
        }
        //set all values of an array that correspond to future days or days outside of the selected month to 1. These will be left blank in the calendar
        if((j > today && month === actualMonth && year === actualYear) || j > last || year > actualYear || (month > actualMonth && year === actualYear)){
            calendarArr[j + first -1] = 1
        }
        if(!calendarArr[j]){
            p.className = 'check'
        }else if(calendarArr[j] != 1){
            const contents = calendarArr[j]
            p.className = 'red'
            p.textContent = j - first + 1
            p.addEventListener('click', () => {
                const message = document.createElement('p')
                let plural = ''
                if(contents.includes(',')){
                    plural = 's'
                }
                message.textContent = `You missed the following medication${plural} on ${month}/${p.textContent}/${year}: ${contents}.`
                message.className = 'alert'
                calendar.appendChild(message)
                const button = document.createElement('button')
                button.textContent = 'X'
                button.className = 'X'
                message.appendChild(button)
                const close = () => {
                    calendar.removeChild(message)
                    left.removeEventListener('click', close)
                    right.removeEventListener('click', close)
                }
                button.addEventListener('click', close)
                left.addEventListener('click', close)
                right.addEventListener('click', close)
            })
        }
        switch(j%7){
            case 0:
                sunday.appendChild(p)
                break
            case 1:
                monday.appendChild(p)
                break
            case 2:
                tuesday.appendChild(p)
                break
            case 3:
                wednesday.appendChild(p)
                break
            case 4:
                thursday.appendChild(p)
                break
            case 5:
                friday.appendChild(p)
                break
            case 6:
                saturday.appendChild(p)
                break
        }
        j++
    }
}

initialize(year, month)

left.addEventListener('click', () => {
    month--
    if(month === 0){
        month = 12
        year--
    }
    sunday.replaceChildren()
    monday.replaceChildren()
    tuesday.replaceChildren()
    wednesday.replaceChildren()
    thursday.replaceChildren()
    friday.replaceChildren()
    saturday.replaceChildren()
    initialize(year, month)
})

right.addEventListener('click', () => {
    month++
    if(month === 13){
        month = 1
        year++
    }
    sunday.replaceChildren()
    monday.replaceChildren()
    tuesday.replaceChildren()
    wednesday.replaceChildren()
    thursday.replaceChildren()
    friday.replaceChildren()
    saturday.replaceChildren()
    initialize(year, month)
})