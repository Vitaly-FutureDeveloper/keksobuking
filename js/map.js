window.addEventListener("DOMContentLoaded", function(){
	'use strict';
(function(){
	var MAP_FILTER_CONTAINER = document.querySelector('.map__filters-container');
	var maxPinsIteration = 8; //mock кол-во массивов данных от сервера

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
	function renderCards(){
		var mapPiner = window.mapPin.cloneNode(true);

			window.mapPin.remove();

		//window.mapPink = mapPiner;//document.querySelectorAll(".map__pin");

		map.classList.remove('map--faded');

	//mock Временные данные для отрисовки стрелок 
	//по координатам из случайных чисел
		advertArr.location.x = mt_rand(100,800);
		advertArr.location.y = mt_rand(200,600);
	//

		mapPiner.style = `left: ${advertArr.location.x + 31}px; top: ${advertArr.location.y - 82}px;`;
			
		mapPiner.querySelector('img').
			setAttribute('src', advertArr.author.avatar);
		mapPiner.querySelector('img').
			setAttribute('alt', advertArr.offer.title);

		return mapPiner;
	}

	//Процедура отрисовки данных в виде окошка
	function renderTemplate(){
		templateCard.style = `left: ${advertArr.location.x + 31}px; top: ${advertArr.location.y - 82}px;`;
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

		window.map.insertBefore(templateCard, MAP_FILTER_CONTAINER);
	}

	function removeTemplate(){
		var article = document.querySelector('.map__card.popup');

		document.removeEventListener('mouseover', renderTemplate);
		article.remove();
	}

	//Отображение на странице карточки данных
	//Помещение, циклом, стрелок-указателей на карте
		window.mapPink = [];

		var templateCard = document.querySelector('template').content;

		var	templatePin = templateCard.querySelector('.map__pin').cloneNode(true);
		var templateCard = templateCard.querySelector('.map__card').cloneNode(true);

		var fragment = document.createDocumentFragment();
		for(var i = 0; i < maxPinsIteration; i++){
			fragment.appendChild( window.mapPink[i] = renderCards() );
		}
		window.mapPins.appendChild(fragment);

		console.log(window.mapPink);

		window.mapPink.forEach( (item) => item.addEventListener('mouseover', renderTemplate));
		window.mapPink.forEach( (item) => item.addEventListener('mouseout', removeTemplate));


})();

});