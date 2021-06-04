const holidays = [
    '1-1',
    '6-1',
    '2-4',
    '1-5',
    '12-10',
    '1-11',
    '6-12',
    '8-12',
    '25-12'
]

const periods = {
	LOW: "low",
	MEDIUM: "medium",
	HIGH: "high"
}

function getPeriod() {
    const today = new Date();
    // Weekend, always low!
    if (today.getDay() === 0 || today.getDay() === 6) {
        return periods.LOW;
    }
    const todayString = today.getDate() + '-' +(today.getMonth() + 1).toString();
    // Holidays, low!
    if (holidays.includes(todayString)) {
        return periods.LOW;
    }

    if (today.getHours() >= 0 && today.getHours() < 8) {
        return periods.LOW;
    }

    if ((today.getHours() >= 10 && today.getHours() < 14)
    || (today.getHours() >= 18 && today.getHours() < 22)) {
        return periods.HIGH;
    }

    return periods.MEDIUM;
}

function updateHour() {
    switch(getPeriod()) {
        case periods.LOW:
            document.getElementById('text').textContent = 'Hora Valle';
            document.body.className = 'low';
            break;
        case periods.MEDIUM:
            document.getElementById('text').textContent = 'Hora Llana';
            document.body.className = 'medium';
            break;
        case periods.HIGH:
            document.getElementById('text').textContent = 'Hora Punta';
            document.body.className = 'high';
            break;
    }
}

// We compute on load
updateHour();

// We compute at the beggining of the next hour
setTimeout(function() {
    updateHour();
    // We compute each hour from that point
    setInterval(updateHour, 60 * 60 * 1000);
}, (62 - new Date().getMinutes()) * 60 * 1000);