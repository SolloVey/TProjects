import './styles/reset.css';
import './styles/main.scss';

import Chart from 'chart.js/auto';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

// tooltip
tippy('[data-tippy-content]', {
	arrow: true,
	delay: [300, 50],
});

console.log('STARTED');

const firstCanvas = document.querySelector('.widget__main__canvas');
const fillColorSVG = document.querySelector('#fillColor');
const moreBtn = document.querySelector('.header__nav__item__link_more');
const activeItemsSubMenu = document.querySelectorAll('.sub-menu__item');
const subMenuSvgFooter = document.querySelector('.sub-menu__svg');

// console.log(subMenuSvgFooter);

activeItemsSubMenu.forEach(elem => {
	elem.addEventListener('mouseenter', () => {
		elem.classList.add('sub-menu__item_active');
		elem.firstElementChild.classList.add('sub-menu__item__link_active');
		if (elem.firstElementChild.lastElementChild) {
			elem.firstElementChild.lastElementChild.classList.add(
				'sub-menu__item__link_active'
			);
			if (
				subMenuSvgFooter.firstElementChild.style.fill == 'rgb(127, 143, 164)'
			) {
				subMenuSvgFooter.firstElementChild.style.fill = '#1F8EFA';
			}
		}
	});
	elem.addEventListener('mouseleave', () => {
		elem.classList.remove('sub-menu__item_active');
		elem.firstElementChild.classList.remove('sub-menu__item__link_active');
		if (elem.firstElementChild.lastElementChild) {
			elem.firstElementChild.lastElementChild.classList.remove(
				'sub-menu__item__link_active'
			);
			if (
				subMenuSvgFooter.firstElementChild.style.fill == 'rgb(31, 142, 250)'
			) {
				subMenuSvgFooter.firstElementChild.style.fill = 'rgb(127, 143, 164)';
			}
		}
	});
});

function changeColorSvg() {
	if (fillColorSVG.style.fill == 'rgb(255, 255, 255)') {
		fillColorSVG.style.fill = '#1F8EFA';
	} else {
		fillColorSVG.style.fill = 'rgb(255, 255, 255)';
	}
}

// fill = '#1F8EFA';

// const firstData = [
// 	{ name: 'Александра', volume: 55 },
// 	{ name: 'Ангелина Сейт', volume: 20 },
// 	{ name: 'Денис', volume: 10 },
// 	{ name: 'Тимур', volume: 10 },
// 	{ name: 'Владимир', volume: 5 },
// ];

// const firstData = {
// 	labels:
// };
// const firstConfig = {
// 	type: 'doughnut',
// 	data: firstData,
// };

// let circleChart = new Chart(firstCanvas, firstConfig);

// console.log(firstCanvas);

moreBtn.addEventListener('click', changeColorSvg);
