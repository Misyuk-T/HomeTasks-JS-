//timer
//================================

function timer() {
    let deadline = '2021-5-19:14:11';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.now(),
            days = Math.floor((t / 1000 / 60 / 60 / 24)),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours,
            'days': days
        };
    }

    getTimeRemaining(deadline);

    setClock(deadline);

    function setClock(endtime) {
        let timer = document.querySelector(`.timer`),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            let t = getTimeRemaining(endtime);

            days.textContent = formatTime(t.days);
            hours.textContent = formatTime(t.hours);
            minutes.textContent = formatTime(t.minutes);
            seconds.textContent = formatTime(t.seconds);

            if (t.total <= 0) {
                days.innerHTML = '0';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    function formatTime(time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }

}

module.exports = timer();