function DeleteElement(event) {
	var Item = event.target.parentElement;
	Item.remove();
}
function SetTime() {
	milliseconds++;
	milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

	if (milliseconds === 100) {
		seconds++;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		milliseconds = '0' + 0;
	}
	if (seconds === 60) {
		minutes++;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = '0' + 0;
	}
	if (minutes === 60) {
		hours++;
		hours = hours < 10 ? '0' + hours : hours;
		minutes = '0' + 0;
	}
	updateValue();
}
function SetLap() {
	lapMili++;
	lapMili = lapMili < 10 ? '0' + lapMili : lapMili;

	if (lapMili === 100) {
		lapSec++;
		lapSec = lapSec < 10 ? '0' + lapSec : lapSec;
		lapMili = '0' + 0;
	}
	if (lapSec === 60) {
		lapMin++;
		lapMin = lapMin < 10 ? '0' + lapMin : lapMin;
		lapSec = '0' + 0;
	}
	if (lapMin === 60) {
		lapHr++;
		lapHr = lapHr < 10 ? '0' + lapHr : lapHr;
		lapMin = '0' + 0;
	}
}

//
//
//

var lapHr = (lapMin = lapSec = hours = minutes = seconds = '0' + 0),
	lapMili = (milliseconds = '0' + 0),
	startedCountring = false,
	Timer,
	Lap;

updateValue();

var startAndStop = document.querySelector('.start'),
	lap = document.querySelector('.lap'),
	reset = document.querySelector('.reset');

startAndStop.addEventListener('click', function (e) {
	startedCountring = !startedCountring;
	startAndStop.innerText = startedCountring ? 'Stop' : 'Start';

	if (startedCountring) {
		Timer = setInterval(() => SetTime(), 10);
		Lap = setInterval(() => SetLap(), 10);
	} else {
		clearInterval(Timer);
		clearInterval(Lap);
	}
});

var listLap = document.querySelector('.list_lap'),
	count = 0;

lap.addEventListener('click', function (e) {
	const uuid = (Math.random() * Math.random()).toString(36).substring(2);
	count++;
	var lapItem = document.createElement('li'),
		lapItemHeader = document.createElement('p'),
		lapItemTrashCan = document.createElement('p'),
		lapItemInfo = document.createElement('p');

	lapItem.setAttribute('id', uuid);
	lapItem.classList.add('lap_items');
	lapItemHeader.innerText = `Lap ${count}`;
	lapItemTrashCan.innerText = String.fromCodePoint(128465);
	lapItemTrashCan.classList.add('lap_items_delete');
	lapItemInfo.innerText = `${lapHr}:${lapMin}:${lapSec}.${lapMili}`;
	lapItemInfo.setAttribute('id', 'lap_items_info');

	lapItemTrashCan.addEventListener('click', DeleteElement);
	lapItem.appendChild(lapItemHeader);
	lapItem.appendChild(lapItemTrashCan);
	lapItem.appendChild(lapItemInfo);

	listLap.appendChild(lapItem);

	lapHr = lapMin = lapSec = '0' + 0;
	lapMili = '0' + 0;
});
reset.addEventListener('click', function (e) {
	count = 0;
	listLap.replaceChildren();

	startedCountring = !startedCountring;
	startAndStop.innerText = 'Start';
	clearInterval(Timer);
	clearInterval(Lap);
	(lapHr = lapMin = lapSec = hours = minutes = seconds = '0' + 0),
		(lapMili = milliseconds = '0' + 0);
	updateValue();
});

function updateValue() {
	document.querySelector(
		'.time'
	).innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
