const saveBtn = document.getElementById('save');

saveBtn.addEventListener('click', () => {
    alert("Hi!");
})


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
        autocompleteSection.removeAttribute('class', 'hidden')
        const autoFills = autoValues.map((med, index) => {
            if(index > 10){return}
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

