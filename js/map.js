window.addEventListener("DOMContentLoaded", function(){
	'use strict';

	var map = document.querySelector('.map');
	var mapPin = document.querySelector('.map__pin');

	var advertArr = [
		{
			"author": {
				"avatar" : `img/avatars/user02.png`
			}
		},
		{
			"offer": {
				"title": "Красивый гостевой домик",
				"address": [ //"{{location.x}}, {{location.y}}"
					600,
					350
				],
				"price": 1000000,
				"type": "flat",
				"rooms": 5,
				"guests": 8,
				"checkin": '14:00',
				"checkout": '12:00',
				"features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
				"description": '',
				"photos": [
					"http://o0.github.io/assets/images/tokyo/hotel1.jpg",
					"http://o0.github.io/assets/images/tokyo/hotel2.jpg",
					"http://o0.github.io/assets/images/tokyo/hotel3.jpg",
					],
			}
		},
		{
			"location": {
				x: 390,
				y: 400
			}
		},
	];

	map.classList.remove('map--faded');

	mapPin.style = `left: ${advertArr[2].location.x - 31}px; top: ${advertArr[2].location.y - 31}px;`;
		
		mapPin.querySelector('img').
			setAttribute('src', advertArr[0].author.avatar);
		mapPin.querySelector('img').
			setAttribute('alt', advertArr[1].offer.title);



});