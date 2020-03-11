'use strict';

(function(){
	
	var buttonMapPinMain = document.querySelector('.map__pin--main');

	var inputFormAddress = document.querySelector('#address'),
		inputFormTitle = document.querySelector('#title'),
		inputFormType = document.querySelector('#type'),
		inputFormPrice = document.querySelector('#price'),
		inputFormTimeIn = document.querySelector('#timein'),
		inputFormTimeOut = document.querySelector('#timeout'),
		inputFormRoom = document.querySelector('#room_number'),
		inputFormGuests = document.querySelector('#capacity'),
		inputFormFeatures = document.querySelectorAll('input[name=features]'),
		inputFormDescription = document.querySelector('#description');

	var noticeForm = document.querySelector('.notice__form');

	buttonMapPinMain.addEventListener('click', function(){ 
		window.map.classList.remove('map--faded');

		inputFormAddress.value = advertArr.offer.address;
	});

	noticeForm.addEventListener('mouseover', () => noticeForm.classList.remove('notice__form--disabled'));
	noticeForm.addEventListener('submit', function(evt){

		var inputGuestsValue = inputFormGuests.options[inputFormGuests.selectedIndex].value;
		var inputRoomValue = inputFormRoom.options[inputFormRoom.selectedIndex].value;

		if ( inputGuestsValue > inputRoomValue ){
			evt.preventDefault();
			document.querySelector('.errors').classList.remove('error--off');
			document.querySelector('.error__item-guests').classList.remove('error--off');
		}
	});

	window.offertForm.addEventListener('submit', (evt) => {
		evt.preventDefault();
		window.upload(new FormData(window.offertForm));
		alert('Форма отправлена');
	});
	
})();