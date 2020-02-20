'use strict';

(function(){

	window.map = document.querySelector('.map');
	window.mapPin = document.querySelector('.map__pin');
	window.mapPins = document.querySelector('.map__pins');


	mapPin.addEventListener('mousedown', function(evt){
		evt.preventDefault();

		var startCoords = {
			x: evt.clientX,
			y: evt.clientY
		};

		function onMouseMove(moveEvt){
			moveEvt.preventDefault();

			if(window.mapPins.offsetTop > -250 && window.mapPins.offsetTop < 280 && window.mapPins.offsetLeft > -600 && window.mapPins.offsetLeft < 600){

			var shift = {
				x: startCoords.x - moveEvt.clientX,
				y: startCoords.y - moveEvt.clientY
			};

			startCoords = {
				x: moveEvt.clientX,
				y: moveEvt.clientY
			};

			window.mapPins.style.top = (window.mapPins.offsetTop - shift.y) + 'px';
			window.mapPins.style.left = (window.mapPins.offsetLeft - shift.x) + 'px';

			} else {
				startCoords = {
					x: 0,
					y: 0
				};
			}
		}

		function onMouseUp(upEvt){
			upEvt.preventDefault();

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});


})();