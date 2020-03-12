window.addEventListener("DOMContentLoaded", function(){
	'use strict';

(function(){
	var MAP_FILTER_CONTAINER = document.querySelector('.map__filters-container');

	//Отрисовка стрелок-указателей на карте из массива данных
	window.renderCards = function(data){
		try{
		var mapPiner = window.mapPin.cloneNode(true);

			window.mapPin.remove();

		map.classList.remove('map--faded');

		mapPiner.style = `left: ${data.location.x + 31}px; top: ${data.location.y - 82}px;`;
			
		mapPiner.querySelector('img').
			setAttribute('src', data.author.avatar);
		mapPiner.querySelector('img').
			setAttribute('alt', data.offer.title);

		} catch { console.log('Нет данных для отрисовки пинов'); }

		return mapPiner;
	};

	window.eventCards = function(dataPinks, dataTemps){
		dataPinks.forEach( (item, index) => {
			var data = [];
			data = dataTemps[index];
			item.addEventListener('mouseover', (evt) => {
				renderTemplate(data, index);
			});
		});
		dataPinks.forEach( (item, index) => item.addEventListener('mouseout', removeTemplate) );
	};
	
	
	//Процедура отрисовки данных в виде окошка
	function renderTemplate(data, index){

		//Формирование строки тегов из массива со ссылками на фотографии
		function popapPicsRender(){
			var images = data.offer.photos,
				imgTags = [];
			for(var image in images){
				imgTags.push(`<li><img src="${images[image]}"></li>`);
			}
			return imgTags.join('\n');
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

		try{

		var templateCard = document.querySelector('template').content;
		var templateCard = templateCard.querySelector('.map__card').cloneNode(true);

		if(data.location.x >= 950 || data.location.y >= 450){
			templateCard.style = `left: ${data.location.x + 31 - 250}px; top: ${data.location.y - 82 - 200}px;`;
		}
		/*	
		 else if (data.location.x >= 950 && data.location.y <= 350) {
			templateCard.style = `left: ${data.location.x + 31 - 250}px; top: ${data.location.y - 82}px;`;
		}else if (data.location.x <= 950 && data.location.y >= 350) {
			templateCard.style = `left: ${data.location.x + 31}px; top: ${data.location.y - 82 - 200}px;`;
		}
		*/
		else{
			templateCard.style = `left: ${data.location.x + 31}px; top: ${data.location.y - 82}px;`;
		}
		

		templateCard.querySelector('.popup__avatar').setAttribute('src', data.author.avatar);
		templateCard.querySelector('.popup__avatar').setAttribute('alt', data.offer.title);

		templateCard.querySelector('.popup__title').textContent = data.offer.title;
		templateCard.querySelector('.popup__text--address').textContent = data.offer.address;
		templateCard.querySelector('.popup__text--price').textContent = data.offer.price;
		templateCard.querySelector('.popup__type').textContent = data.offer.type;
		templateCard.querySelector('.popup__text--rooms').textContent = data.offer.rooms;
		templateCard.querySelector('.popup__text--guests').textContent = data.offer.guests;
		templateCard.querySelector('.popup__text--timein').textContent = data.offer.checkin;
		templateCard.querySelector('.popup__text--timeout').textContent = data.offer.checkout;
		featureOned(templateCard);
		templateCard.querySelector('.popup__description').textContent = data.offer.description;
		templateCard.querySelector('.popup__pictures').innerHTML = popapPicsRender();

		window.map.insertBefore(templateCard, MAP_FILTER_CONTAINER);

	} catch { console.log('Нет данных для отрисовки пинов'); }

	}

	function removeTemplate(){
		var article = document.querySelector('.map__card.popup');
		article.remove();
	}

		
})();

});