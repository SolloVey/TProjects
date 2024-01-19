import './styles/reset.css';
import './styles/main.scss';

import Chart from 'chart.js/auto';

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import ru from 'air-datepicker/locale/ru';

let taskDp = new AirDatepicker('#task-calendar', {
	locale: ru,
	inline: false,
	visible: false,
	range: true,
});

taskDp.hide();

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

// const subMenuBtn = document.querySelector('.open-sub-menu');
// const subMenuBtns = document.querySelectorAll('.open-sub-menu');
const fillColorSVG = document.querySelector('#fillColor');
// const fillColorsSVG = document.querySelectorAll('#fillColor');
const activeItemsSubMenu = document.querySelectorAll('.sub-menu__item');
const subMenu = document.querySelectorAll('.sub-menu');
const subMenuSvgFooter = document.querySelector('.sub-menu__svg');
const sideBarMenuBTN = document.querySelector('.sidebar__item__todo');
const sideBarMenuList = document.querySelector('.sidebar-menu');
const sideBarMenuCloseBTN = document.querySelector(
	'.sidebar-menu__header__content__close-btn'
);
// const widgetHeaderWrapper = document.querySelector('.widget__header__wrapper');
// const widgetHeaderDesc = document.querySelector('.widget__header__desc');
const widget = document.querySelector('.widget__active');

// console.log(subMenu);

// ***** calendar *****
const inputTaskCalendar = document.querySelector('.widget__header__desc__date');
const calendar = document.querySelector('.task-calendar');
// ********************
// ***** set-user *****
const userBtn = document.querySelector('.sidebar__item__logo');
const userMenu = document.querySelector('.set-user');
// ********************
// ***** support *****
const support = document.querySelector('.user-support');
const supportBtn =
	document.querySelector('.sidebar__question').firstElementChild;
const closeSupportBtn = document.querySelector('.user-support__header__close');
const supportImg = document.querySelectorAll('.user-support__item__icon__img');
// **********************
// ***** popup *****
const popupLinks = document.querySelectorAll('.popup-open');
const deleteWidgetBtn = document.querySelector('.delete-widget');
// const removeWidget = document.querySelectorAll('.popup-close');
const closePopupBtn = document.querySelector('.close-popup');
// *****************

function showCalendar() {
	calendar.classList.toggle('none');
	// console.log(taskDp);
	// taskDp.hide();
}

if (popupLinks.length > 0) {
	for (let i = 0; i < popupLinks.length; i++) {
		const popupLink = popupLinks[i];
		popupLink.addEventListener('click', function (e) {
			e.preventDefault;
			const curentPopup = document.querySelector('#popup');

			showPopup(curentPopup);
		});
	}
}

function showPopup(curentPopup) {
	curentPopup.classList.add('popup__open');
}

function popupClose() {
	let curentPopup = document.querySelector('.popup__open');
	curentPopup.classList.remove('popup__open');
}

function removeWidget() {
	widget.closest('.widget__active').classList.add('widget__remove');
	widget.closest('.widget__active').classList.add('widget__dashed-border');
	widget.closest('.widget__active').classList.remove('widget__active');
	popupClose();
	console.log(widget.closest('.widget').className);
}

// ***** ПЕРВЫЙ ГРАФИК *****
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
// *************************

document.querySelector('body').addEventListener('click', e => {
	if (!e.target.closest('.open-sub-menu')) {
		closeSubMenu();
		return;
	} else {
		toggleSubMenu(e);
	}
});

function toggleSubMenu(e) {
	// console.log(e.target);

	document
		.querySelector(
			`.sub-menu[data-sub-menu=${
				e.target.closest('.open-sub-menu').dataset.subMenu
			}]`
		)
		.classList.toggle('sub-menu__open');
	changeColorSvg(e);
}

function closeSubMenu(item) {
	subMenu.forEach(item => {
		item.classList.remove('sub-menu__open');
		// console.log(item);

		// changeColorSvg(item);
	});
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

function changeColorSvg(e) {
	// console.log(e.target);
	// fillColorsSVG.forEach(function (e) {
	// if (e.parentElement.firstElementChild.style.fill == 'rgb(255, 255, 255)') {
	// 	e.parentElement.firstElementChild.style.fill = 'rgb(31, 142, 250)';
	// } else {
	// 	e.parentElement.firstElementChild.style.fill = 'rgb(255, 255, 255)';
	// }
	// });
	// if (e.style.fill == 'rgb(255, 255, 255)') {
	// 	e.style.fill = 'rgb(31, 142, 250)';
	// } else {
	// 	e.style.fill = 'rgb(255, 255, 255)';
	// }
}

function showSubMenuList(e) {
	closeUserMenu();
	// console.log(e.target);

	if (e.target.classList.contains('sidebar__item__todo')) {
	}

	// console.log(e.target.firstElementChild);
	// console.log(e.target.firstElementChild.style.fill);
	sideBarMenuList.classList.add('sidebar-menu_action');
	// changeColorSvg();
	// e.target.firstElementChild.style.fill = '#1F8EFA';

	// console.log(e.target.classList.contains('sidebar__item__img-size'));
	// style = 'fill: rgb(255, 255, 255)';
}

function closeSubMenuList() {
	sideBarMenuList.classList.remove('sidebar-menu_action');
}

function toggleSupport() {
	support.classList.toggle('user-support__open');
}

function closeSupport() {
	support.classList.remove('user-support__open');
}

function closeUserMenu() {
	userMenu.classList.remove('set-user__open');
}

function toggleUserMenu() {
	userMenu.classList.toggle('set-user__open');
}

// function toggleColorSupportImg() {}

createCircleChart(name, volume);
sideBarMenuBTN.addEventListener('click', showSubMenuList);
sideBarMenuCloseBTN.addEventListener('click', closeSubMenuList);
supportBtn.addEventListener('click', toggleSupport);
closeSupportBtn.addEventListener('click', closeSupport);
userBtn.addEventListener('click', toggleUserMenu);
closePopupBtn.addEventListener('click', popupClose);
deleteWidgetBtn.addEventListener('click', removeWidget);
inputTaskCalendar.addEventListener('click', showCalendar);
