import './styles/reset.css';
import './styles/main.scss';

import Chart from 'chart.js/auto';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

// tooltip
tippy('[data-tippy-content]', {
	arrow: true,
	delay: [300, 0],
});

console.log('STARTED');

const firstCanvas = document
	.querySelector('.widget__main__canvas')
	.getContext('2d');
const fillColorSVG = document.querySelector('#fillColor');
const moreBtn = document.querySelector('.header__nav__item__link_more');
const addBtn = document.querySelector('.sidebar-horizontal__action__add');
const activeItemsSubMenu = document.querySelectorAll('.sub-menu__item');
const subMenu = document.querySelectorAll('.sub-menu');
const subMenuSvgFooter = document.querySelector('.sub-menu__svg');
const sideBarMenuBTN = document.querySelector('.sidebar__item__todo');
const sideBarMenuList = document.querySelector('.sidebar-menu');
const sideBarMenuCloseBTN = document.querySelector(
	'.sidebar-menu__header__content__close-btn'
);

// ПЕРВЫЙ ГРАФИК
const dataTasks = [
	{ name: 'Александра', volume: 55, units: '%' },
	{ name: 'Владимир', volume: 5, units: '%' },
	{ name: 'Тимур', volume: 10, units: '%' },
	{ name: 'Денис', volume: 10, units: '%' },
	{ name: 'Ангелина Сейт', volume: 20, units: '%' },
];
let name = dataTasks.map(item => `${item.name} (${item.volume}${item.units})`);
let volume = dataTasks.map(item => item.volume);
const createCircleChart = (name, volume) => {
	const firstData = {
		labels: name,
		datasets: [
			{
				data: volume,
				backgroundColor: [
					'rgb(58, 158, 255)',
					'rgb(0, 188, 212)',
					'rgb(255, 179, 0)',
					'rgb(16, 171, 79)',
					'rgb(103, 58, 183)',
				],
				hoverOffset: 4,
				rotation: 72,
			},
		],
	};

	const firstConfig = {
		type: 'doughnut',
		data: firstData,
		options: {
			plugins: {
				legend: {
					display: true,
					position: 'bottom',
					align: 'start',
					labels: {
						boxWidth: 18,
						boxHeight: 18,
						padding: 13,
						usePointStyle: true,
						pointStyle: 'circle',
						useBorderRadius: true,
						borderRadius: 0,
					},
				},
			},
		},
	};
	let chart = new Chart(firstCanvas, firstConfig);
};

// console.log(firstCanvas);

function toggleSubMenu() {
	subMenu.forEach(item => {
		changeColorSvg();
		item.classList.toggle('sub-menu__open');
	});
}

function closeSubMenu() {
	subMenu.forEach(item => {
		item.classList.remove('sub-menu__open');
		item.classList.add('sub-menu__close');
		changeColorSvg();
	});
}

function escapeDown(element) {
	subMenu.forEach(item => {
		if (
			element.code === 'Escape' &&
			item.className === 'sub-menu sub-menu__close sub-menu__open'
		) {
			closeSubMenu();
		}
	});
}

function changeColorSvg() {
	if (fillColorSVG.style.fill == 'rgb(255, 255, 255)') {
		fillColorSVG.style.fill = '#1F8EFA';
	} else {
		fillColorSVG.style.fill = 'rgb(255, 255, 255)';
	}
}

function showSubMenuList() {
	sideBarMenuList.classList.add('sidebar-menu_action');
}

function closeSubMenuList() {
	sideBarMenuList.classList.remove('sidebar-menu_action');
}

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
	elem.addEventListener('click', () => closeSubMenu());
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

createCircleChart(name, volume);
moreBtn.addEventListener('click', toggleSubMenu);
document.addEventListener('keydown', escapeDown);
sideBarMenuBTN.addEventListener('click', showSubMenuList);
sideBarMenuCloseBTN.addEventListener('click', closeSubMenuList);
