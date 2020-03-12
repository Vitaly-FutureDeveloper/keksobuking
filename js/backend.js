
(function(){

	function onError(message){
		console.error(message);

		var div = document.createElement('div');
		var header = document.createElement('h3');
		var text = document.createElement('p');
		var errorWidth = 1;
		var errorHeight = 0.5;
		var errorOpacity = 0;

		function renderText(time){
			setTimeout( () => {
				header.style.opacity = errorOpacity;
				text.style.opacity = errorOpacity;

				header.textContent = "Произошла ошибка, попробуйте позже!";
				text.innerHTML = message;

				for (var i = 0; i <= 80; i++){
					setTimeout( () => {
						header.style.opacity = errorOpacity;
						text.style.opacity = errorOpacity;

						errorOpacity += 0.0125;
					}, 8 * ( i + 10 ) );
				}

			}, time);
		}

		function animationOpen(){
			
			var iterationTime = 0;

			for (var i = 0; i <= 80; i++){
				setTimeout( () => {
					div.style.width = `${errorWidth}vw`;
					div.style.height = `${errorHeight}vh`;

					header.style.opacity = 'inherit';
					text.style.opacity = 'inherit';

					errorWidth += 0.5;
					errorHeight += 12/80;
				}, iterationTime = 8 * ( i + 10 ) );
			}
			return iterationTime;
		}


		window.map.appendChild(div);
		div.appendChild(header);
		div.appendChild(text);

		div.style.width = `${errorWidth}vw`;
		div.style.height = `${errorHeight}vh`;
		div.style.background = 'pink';
		div.style.borderLeft = '2vw solid red';
		div.style.borderRight = '2vw solid red';
		div.style.borderRadius = '1vw';
		div.style.position = 'fixed';
		div.style.top = '15vh';
		div.style.left = '40%';
		div.style.zIndex = '1000';
		
		header.style.textAlign = 'center';
		text.style.textAlign = 'center';

		renderText(animationOpen());

		setTimeout( () => {
			text.remove();
			header.remove();
			div.remove();
		}, 8000);
	}

	function onSuccess(data){

		window.mapPink = [];
		window.dataTemps = [];
		var fragment = document.createDocumentFragment();

		for(var i = 0; i < data.length; i++){
			fragment.appendChild(window.mapPink[i] = window.renderCards(window.dataTemps[i] = data[i]));
		}
		window.mapPins.appendChild(fragment);
		window.eventCards(window.mapPink, window.dataTemps);
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
		var URL = 'https://js.dump.academy/keksobooking/dat';

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

	window.upload = function(data){
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

