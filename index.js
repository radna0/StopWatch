function DeleteElement(event) {
	var Item = event.target.parentElement;
	Item.remove();
}

//
//
//

var hours = (minutes = seconds = milliseconds = '0' + 0),
	startedCountring = false,
	Timer;

updateValue();

var startAndStop = document.querySelector('.start'),
	lap = document.querySelector('.lap'),
	reset = document.querySelector('.reset');

startAndStop.addEventListener('click', function (e) {
	startedCountring = !startedCountring;
	startAndStop.innerText = startedCountring ? 'Stop' : 'Start';

	if (startedCountring) {
		Timer = setInterval(() => {
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
		}, 10);
	} else {
		clearInterval(Timer);
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
	lapItemInfo.innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
	lapItemInfo.setAttribute('id', 'lap_items_info');

	lapItemTrashCan.addEventListener('click', DeleteElement);
	lapItem.appendChild(lapItemHeader);
	lapItem.appendChild(lapItemTrashCan);
	lapItem.appendChild(lapItemInfo);

	listLap.appendChild(lapItem);
});
reset.addEventListener('click', function (e) {
	count = 0;
	listLap.replaceChildren();

	startedCountring = !startedCountring;
	startAndStop.innerText = 'Start';
	clearInterval(Timer);
	hours = minutes = seconds = milliseconds = '0' + 0;
	updateValue();
});

function updateValue() {
	document.querySelector('.milliseconds').innerText = milliseconds;
	document.querySelector('.seconds').innerText = seconds;
	document.querySelector('.minutes').innerText = minutes;
	document.querySelector('.hours').innerText = hours;
}
