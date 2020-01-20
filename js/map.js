window.addEventListener("DOMContentLoaded", function(){
	'use strict';

	var map = document.querySelector('.map');
	var mapPin = document.querySelector('.map__pin'),
		mapPins = document.querySelector('.map__pins');
	var MAP_FILTER_CONTAINER = document.querySelector('.map__filters-container');
	var maxPinsIteration = 8;

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
		
		"location": {
			x: 390,
			y: 400
		}

	};

	map.classList.remove('map--faded');

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

	//Поиск значения в массиве и показ опций преимуществ 
	function featureOned(templateCard){
		var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
		for(var feature in features){
			if(advertArr.offer.features.includes(features[feature])){
				templateCard.querySelector(`.feature--${features[feature]}`).
							style.backgroundColor = 'lightgreen';
			}
		}
	}

	//Формирование строки тегов из массива со ссылками на фотографии
	function popapPicsRender(){
		var images = advertArr.offer.photos,
			imgTags = [];
		for(var image in images){
			imgTags.push(`<li><img src="${images[image]}"></li>`);
		}
		return imgTags.join('\n');
	}

	//Отрисовка стрелок-указателей на карте из массива данных
	function renderCards(iteration){
		var mapPiner = mapPin.cloneNode(true);
			mapPin.remove();

	//Временные данные для отрисовки стрелок 
	//по координатам из случайных чисел
		advertArr.location.x = mt_rand(100,800);
		advertArr.location.y = mt_rand(200,600);
	//

		mapPiner.style = `left: ${advertArr.location.x - 31}px; top: ${advertArr.location.y - 31}px;`;
			
		mapPiner.querySelector('img').
			setAttribute('src', advertArr.author.avatar);
		mapPiner.querySelector('img').
			setAttribute('alt', advertArr.offer.title);

		return mapPiner;
	}

	//Процедура отрисовки данных в виде окошка
	function renderTemplate(templateCard, templatePin){
		templateCard.style = `left: ${advertArr.location.x - 31}px; top: ${advertArr.location.y - 31}px;`;
		templateCard.querySelector('img').
			setAttribute('src', advertArr.author.avatar);
		templateCard.querySelector('img').
			setAttribute('alt', advertArr.offer.title);

		templateCard.querySelector('.popup__title').textContent = advertArr.offer.title;
		templateCard.querySelector('.popup__text--address').textContent = advertArr.offer.address;
		templateCard.querySelector('.popup__text--price').textContent = advertArr.offer.price;
		templateCard.querySelector('.popup__type').textContent = advertArr.offer.type;
		templateCard.querySelector('.popup__text--rooms').textContent = advertArr.offer.rooms;
		templateCard.querySelector('.popup__text--guests').textContent = advertArr.offer.guests;
		templateCard.querySelector('.popup__text--timein').textContent = advertArr.offer.checkin;
		templateCard.querySelector('.popup__text--timeout').textContent = advertArr.offer.checkout;
		featureOned(templateCard);
		templateCard.querySelector('.popup__description').textContent = advertArr.offer.description;
		templateCard.querySelector('.popup__pictures').innerHTML = popapPicsRender();

		map.insertBefore(templateCard, MAP_FILTER_CONTAINER);
	}

	//Процедура отображения на странице карточки данных
	//Помещение, циклом, стрелок-указателей на карте
	function createContentCards(){
		var templateCard = document.querySelector('template').content;

		var	templatePin = templateCard.querySelector('.map__pin').cloneNode(true);
		var templateCard = templateCard.querySelector('.map__card').cloneNode(true);

		renderTemplate(templateCard, templatePin);

		var fragment = document.createDocumentFragment();
		for(var i = 0; i < maxPinsIteration; i++){
			fragment.appendChild(renderCards());
		}
		mapPins.appendChild(fragment);
	}

createContentCards();

});