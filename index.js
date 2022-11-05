var lapHr = (lapMin = lapSec = hours = minutes = seconds = 0),
	lapMili = (milliseconds = 0),
	startedCountring = false,
	Timer;
var prevTime,
	elapsedTime = 0;

function DeleteElement(event) {
	var Item = event.target.parentElement;
	Item.remove();
}
function SetTime() {
	if (!prevTime) {
		prevTime = Date.now();
	}

	elapsedTime += Date.now() - prevTime;
	prevTime = Date.now();

	var tempTime = elapsedTime;
	milliseconds = tempTime % 1000;
	tempTime = Math.floor(tempTime / 1000);
	seconds = tempTime % 60;
	tempTime = Math.floor(tempTime / 60);
	minutes = tempTime % 60;
	tempTime = Math.floor(tempTime / 60);
	hours = tempTime % 60;

	updateValue();
}

//
//
//

var startAndStop = document.querySelector('.start'),
	lap = document.querySelector('.lap'),
	reset = document.querySelector('.reset');

startAndStop.addEventListener('click', function (e) {
	startedCountring = !startedCountring;
	startAndStop.innerText = startedCountring ? 'Stop' : 'Start';

	if (startedCountring) {
		Timer = setInterval(() => SetTime(), 50);
	} else {
		clearInterval(Timer);
		prevTime = null;
	}
});

var listLap = document.querySelector('.list_lap'),
	count = 0;

lap.addEventListener('click', function (e) {
	lapMili = Number(milliseconds) + 1000 - lapMili;
	lapMili < 1000 ? (lapSec += 1) : (lapMili -= 1000);
	lapSec = Number(seconds) + 60 - lapSec;
	lapSec < 60 ? (lapMin += 1) : (lapSec -= 60);
	lapMin = Number(minutes) + 60 - lapMin;
	lapMin < 60 ? (lapHr += 1) : (lapMin -= 60);
	lapHr = Number(hours) - lapHr;

	lapMili =
		lapMili < 10 ? '00' + lapMili : lapMili < 100 ? '0' + lapMili : lapMili;
	lapSec = lapSec < 10 ? '0' + lapSec : lapSec;
	lapMin = lapMin < 10 ? '0' + lapMin : lapMin;
	lapHr = lapHr < 10 ? '0' + lapHr : lapHr;

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

	lapMili = Number(milliseconds);
	lapSec = Number(seconds);
	lapMin = Number(minutes);
	lapHr = Number(hours);
});
reset.addEventListener('click', function (e) {
	count = 0;
	listLap.replaceChildren();

	startedCountring = !startedCountring;
	startAndStop.innerText = 'Start';
	clearInterval(Timer);
	elapsedTime = null;
	prevTime = null;
	(lapHr = lapMin = lapSec = hours = minutes = seconds = 0),
		(lapMili = milliseconds = 0);
	updateValue();
});

function updateValue() {
	milliseconds =
		milliseconds < 10
			? '00' + milliseconds
			: milliseconds < 100
			? '0' + milliseconds
			: milliseconds;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	hours = hours < 10 ? '0' + hours : hours;

	document.querySelector(
		'.time'
	).innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
