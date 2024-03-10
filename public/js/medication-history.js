const left = document.querySelector('#left')
const right = document.querySelector('#right')
const sunday = document.querySelector('#sunday')
const monday = document.querySelector('#monday')
const tuesday = document.querySelector('#tuesday')
const wednesday = document.querySelector('#wednesday')
const thursday = document.querySelector('#thursday')
const friday = document.querySelector('#friday')
const saturday = document.querySelector('#saturday')

left.textContent = '<<'
right.textContent = '>>'

let user = 1
let month = 3
let year = 2024
let first = 5
let last = 31
let today = 10
const calendarArr= []
for(let i = 0; i < first; i++){
    calendarArr.push(1)
}

const initialize = async (user, year, month) => {
    const response = await fetch(`api/calendar/${user}/${year}/${month}`)
    const currentMonth = await response.json()
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
        if(j > today){
            calendarArr.push(1)
        }
        if(!calendarArr[j]){
            p.className = 'check'
        }else if(calendarArr[j] != 1){
            const contents = calendarArr[j]
            p.className = 'red'
            p.addEventListener('click', () => {
                alert('You missed the following medications on that day: ' + contents)
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

initialize(user, year, month)