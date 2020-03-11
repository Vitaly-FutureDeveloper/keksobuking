'use strict';

window.MapFilterForm = document.querySelector('.map__filters');
window.offertForm = document.querySelector('.notice__form');

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