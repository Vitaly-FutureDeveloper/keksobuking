
(function(){

	function onError(message){
		console.error(message);
	}

	function onSuccess(data){
		console.log(data);

		var fragment = document.createDocumentFragment();

		for(var i = 0; i < data.length; i++){
			fragment.appendChild(window.renderCards(data[i]));
		}
		window.mapPins.appendChild(fragment);

	}

	var dataMapFilter = new FormData(window.MapFilterForm);
	var dataOffert = new FormData(window.offertForm);

	var mapFilresSelect = window.MapFilterForm.querySelectorAll('.map__filter'),
		mapFilresFuture = window.MapFilterForm.querySelectorAll('input[name="features"]');

	mapFilresSelect.forEach( function(item) {
		item.addEventListener('change', (evt) => {
			evt.preventDefault();
			window.load(onSuccess, onError);
		});
	});
	mapFilresFuture.forEach( function(item) {
		item.addEventListener('change', (evt) => {
			evt.preventDefault();
			window.load(onSuccess, onError);
		});
	});

	window.load = function(onSuccess, onError){
		var xhr = new XMLHttpRequest();
		var URL = 'https://js.dump.academy/keksobooking/data';

		xhr.responseType = 'json';

		xhr.addEventListener('load', function() {
			if( xhr.status === 200 ){
				onSuccess(xhr.response);
			}

			else{
				onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
			}
		});

		xhr.addEventListener('error', function(){
			onError("Произошла ошибка соединения");
		});
		xhr.addEventListener('timeout', () => {
			onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
		});

		xhr.timeout = 10000;

		xhr.open('GET', URL);
		xhr.send(dataMapFilter);

	};

	//window.load(onSuccess, onError);

	window.upload = function(data, onSuccess){
		var xhr = new XMLHttpRequest();
		var URL = 'https://js.dump.academy/keksobooking';

		xhr.responseType = 'json';

		xhr.addEventListener('load', function(){
			onSuccess(xhr.response);
		});

		xhr.open('POST', URL);
		xhr.send(data);
	};


})();

