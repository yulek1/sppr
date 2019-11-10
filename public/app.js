const CreateVector = document.querySelector('.CreateVector')
CreateVector.addEventListener('submit', (e) => {
    e.preventDefault()

    let element = CreateVector.querySelector('.manufacturers');
    const manufacturer = element.options[element.selectedIndex].value;
    element = CreateVector.querySelector('.deviceTypes');
    const deviceType = element.options[element.selectedIndex].value;
    element = CreateVector.querySelector('.geographicDistribution');
    const geographicDistribution = element.options[element.selectedIndex].value;
    element = CreateVector.querySelector('.addUserFrequency');
    const addUserFrequency = element.options[element.selectedIndex].value;
    element = CreateVector.querySelector('.usersQuantity');
    const usersQuantity = element.options[element.selectedIndex].value;
    element = CreateVector.querySelector('.mobility');
    const mobility = element.options[element.selectedIndex].value;
    element = CreateVector.querySelector('.realTime');
    const realTime = element.options[element.selectedIndex].value;
    element = CreateVector.querySelector('.analytics');
    const analytics = element.options[element.selectedIndex].value;
    element = CreateVector.querySelector('.preferred');
    const preferred = element.options[element.selectedIndex].value;

    post('/createVector', {
        manufacturer,
        deviceType,
        geographicDistribution,
        addUserFrequency,
        usersQuantity,
        mobility,
        realTime,
        analytics,
        preferred
    }).then(response => {
        let outputPlaceholder = document.getElementById('responseVector');
        response.json().then(
            data => outputPlaceholder.innerHTML = JSON.stringify(data)
        );
    })
});

function post (path, data) {
    return window.fetch(path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
