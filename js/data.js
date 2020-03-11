'use strict';

window.MapFilterForm = document.querySelector('.map__filters');
window.offertForm = document.querySelector('.notice__form');

	//Временные данные(имитация данных от сервера)
	var advertArr = {
		"author": {
			"avatar" : `img/avatars/user02.png`
		},

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
			"features": ["wifi", "dishwasher", "washer", "elevator", "conditioner"],
			"description": '',
			"photos": [
				"http://o0.github.io/assets/images/tokyo/hotel1.jpg",
				"http://o0.github.io/assets/images/tokyo/hotel2.jpg",
				"http://o0.github.io/assets/images/tokyo/hotel3.jpg",
				],
		},
		
		"location": { //"{{location.x}}, {{location.y}}" нужно прибавлять OT x + 31, OT y - 82
			x: 390,
			y: 400
		}

	};

	//Генератор случайных чисел для подстановки данных
	function mt_rand(min, max){
		try{
			var arifm = max - min;
				arifm = Math.floor(Math.random() * Math.floor(arifm));
			return min + arifm;
		} catch {
			console.log("Ошибка в указании данных для генератора случайных чисел");
		}
	}