import './styles/reset.css';
import './styles/main.scss';

import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// import Chart, { LinearScale, CategoryScale } from 'chart.js';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';

// register controller in chart.js and ensure the defaults are set
Chart.register(FunnelController, TrapezoidElement, ChartDataLabels);

// import AirDatepicker from 'air-datepicker';
// import 'air-datepicker/air-datepicker.css';
// import ru from 'air-datepicker/locale/ru';

// let taskDp = new AirDatepicker('#task-calendar', {
// 	locale: ru,
// 	inline: false,
// 	visible: false,
// 	range: true,
// });

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

// tooltip
tippy('[data-tippy-content]', {
	arrow: true,
	delay: [300, 0],
});

console.log('STARTED');

// ********************** ПЕРВЫЙ ГРАФИК ******************************************************
const firstCanvas = document
	.querySelector('.widget__main__canvas')
	.getContext('2d');

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
				datalabels: {
					labels: {
						title: null,
					},
				},
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
// *******************************************************************************************

// const subMenuBtn = document.querySelector('.open-sub-menu');
// const subMenuBtns = document.querySelectorAll('.open-sub-menu');

// ********************** ВТОРОЙ ГРАФИК ******************************************************
const secondFunnelCanvas = document
	.querySelector('.widget__main__canvas__funnel')
	.getContext('2d');

const dataFunnel = [
	{ deal: 'Новый лид:', quantity: 1, volume: 1.49 },
	{ deal: 'Взяли в работу:', quantity: 2, volume: 1.39 },
	{ deal: 'Квалифицирован:', quantity: 1, volume: 1.24 },
	{ deal: 'Бриф отправлен:', quantity: 0, volume: 1.14 },
	{ deal: 'Бриф согласован:', quantity: 1, volume: 1.14 },
	{ deal: 'Договор/счет выставлен:', quantity: 1, volume: 1.14 },
	{ deal: 'Предоплата получена:', quantity: 1, volume: 1.14 },
];
let nameFunnel = dataFunnel.map(item => `${item.deal}  ${item.quantity}`);
let volumeFunnel = dataFunnel.map(item => item.volume);
const createFunnelChart = (nameFunnel, volumeFunnel) => {
	const secondData = {
		labels: nameFunnel,
		datasets: [
			{
				data: volumeFunnel,
				backgroundColor: [
					'#00BCD4',
					'#3A9EFF',
					'#673AB7',
					'#FFB300',
					'#00BCD4',
					'#FFB300',
					'#FF3031',
				],
				borderColor: 'transparent',
				borderWidth: 0,
				align: 'center',
				shrinkAnchor: 'top',
			},
		],
	};

	// funnelLabelsLine plugin
	const funnelLabelsLine = {
		id: 'funnelLabelsLine',
		afterDraw(chart, args, options) {
			const {
				ctx,
				chartArea: { top, bottom, left, right, width, height },
			} = chart;
			chart.data.datasets.forEach((dataset, i) => {
				chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
					const { x, y } = datapoint.tooltipPosition();

					// Draw line
					// Line
					ctx.beginPath();
					ctx.moveTo(x, y);
					ctx.lineTo(x + 92, y);
					ctx.strokeStyle = dataset.backgroundColor[index];
					ctx.lineWidth = '2';
					ctx.stroke();

					// Text
					ctx.font = '13px Golos Text, sans-serif';

					// Control the position
					ctx.textBaseline = 'middle';
					ctx.fillText(chart.data.labels[index], x + 102, y);
					console.log(ctx);
				});
			});
		},
	};

	const secondConfig = {
		type: 'funnel',
		data: secondData,
		options: {
			layout: {
				padding: {
					top: 7,
					right: 358,
					left: 0,
				},
			},
			maintainAspectRatio: false,
			indexAxis: 'y',
			plugins: {
				tooltip: {
					enabled: false,
				},
				datalabels: {
					labels: {
						title: null,
					},
				},
			},
		},
		plugins: [ChartDataLabels, funnelLabelsLine],
	};
	let chart = new Chart(secondFunnelCanvas, secondConfig);
};
// *******************************************************************************************

// ***** header *****
const headerMoreBtn = document.querySelector('.header__nav__item__link_more');
// ******************

// ***** sub-menu *****
const activeItemsSubMenu = document.querySelectorAll('.sub-menu__item');
const subMenu = document.querySelectorAll('.sub-menu');
const sideBarMenuCloseBTN = document.querySelector(
	'.sidebar-menu__header__content__close-btn'
);
// ********************

// ***** widget *****
const widget = document.querySelector('.widget__active');
const widgetMoreBtns = document.querySelectorAll('.widget__header__more-btn');
const widgetHeaderWrapper = document.querySelectorAll(
	'.widget__header__wrapper'
);
const widgetHeaderDesc = document.querySelectorAll('.widget__header__desc');
// ******************

// ***** calendar *****
const inputTaskCalendar = document.querySelector('.widget__header__desc__date');
const calendar = document.querySelector('.task-calendar');
// ********************

// ***** sidebar *****
const sideBarMenuBTN = document.querySelector(
	'.sidebar__item__todo'
); /* картинка в элементе */
const sideBarItemList =
	document.querySelector('.sidebar__items'); /* весь список ul */
const sideBarItems =
	document.querySelectorAll('.sidebar__el'); /* все эл. в списке */
const sideBarItem = document.querySelector('.sidebar__el'); /* эл. в списке */
// ********************

// ***** set-user *****
const userBtn = document.querySelector('.sidebar__item__logo');
const userMenu = document.querySelector('.set-user');
// ********************

// ***** side-bar *****
const sideBarMenuList = document.querySelector('.sidebar-menu');
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

// ***** horizontal side bar *****
const sideBarMoreBtn = document.querySelector(
	'.sidebar-horizontal__action__more'
);
const sideBarMoreList = document.querySelector('.sidebar-horizontal-sub');
const horizontalSideBarList = document.querySelector(
	'.sidebar-horizontal__menu__sub__list'
);
// *******************************

// ********************** HORISONTAL SIDE-BAR ************************************************
function openHorizontalSideBarMenu() {
	sideBarMoreList.classList.add('sidebar-horizontal-sub__open');
}

function closeHorizontalSideBarMenu() {
	sideBarMoreList.classList.remove('sidebar-horizontal-sub__open');
}

function selectedItemHorizontalSideBar(e) {
	let itemActive = document.querySelector('.__active');
	let newActiveItem = e.target.closest('.sidebar-horizontal__menu__sub__item');

	if (horizontalSideBarList === e.target || itemActive === newActiveItem)
		return;
	newActiveItem.classList.add('__active');
	if (newActiveItem.classList.contains('__active')) {
		itemActive.classList.remove('__active');
	}
	closeHorizontalSideBarMenu();
}
// *******************************************************************************************

// ********************** CALENDAR ***********************************************************
function showCalendar() {
	calendar.classList.toggle('none');
}
// *******************************************************************************************

// ********************** POP-UP**************************************************************
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
// *******************************************************************************************

function removeWidget() {
	widget.closest('.widget__active').classList.add('widget__remove');
	widget.closest('.widget__active').classList.add('widget__dashed-border');
	widget.closest('.widget__active').classList.remove('widget__active');
	popupClose();
	console.log(widget.closest('.widget').className);
}

// ********************** WIDGET *************************************************************
function removePositionWrapper() {
	widgetHeaderWrapper.forEach(e => e.classList.remove('position-sub'));
}
function togglePositionWrapper() {
	widgetHeaderWrapper.forEach(e => e.classList.toggle('position-sub'));
}
function addPositionWrapper() {
	widgetHeaderWrapper.forEach(e => e.classList.add('position-sub'));
}
function togglePositionRelative() {
	widgetHeaderDesc.forEach(e => {
		e.classList.toggle('position-sub');
	});
}
function removePositionRelative() {
	widgetHeaderDesc.forEach(e => {
		e.classList.remove('position-sub');
	});
}
function addPositionRelative() {
	widgetHeaderDesc.forEach(e => {
		e.classList.add('position-sub');
	});
}
// *******************************************************************************************

// ********************** SUB-MENU ***********************************************************
document.querySelector('body').addEventListener('click', e => {
	if (!e.target.closest('.open-sub-menu')) {
		closeSubMenu(e);
		return;
	} else {
		toggleSubMenu(e);
	}
});

function toggleSubMenu(e) {
	document
		.querySelector(
			`.sub-menu[data-sub-menu=${
				e.target.closest('.open-sub-menu').dataset.subMenu
			}]`
		)
		.classList.toggle('sub-menu__open');

	activeColorIcon(e);
}

function closeSubMenu() {
	whiteColorIcon(headerMoreBtn);
	addPositionWrapper();
	addPositionRelative();

	subMenu.forEach(item => {
		item.classList.remove('sub-menu__open');
	});

	widgetMoreBtns.forEach(item => {
		greyColorIcon(item);
		item.classList.remove('widget__header__more-btn_active');
	});
	// добавить remove e.target.closest('.svg-el').classList.add('btn-active');
}
// *********************************************************************************************

// ********************** СМЕНА ЦВЕТА SVG ******************************************************
activeItemsSubMenu.forEach(elem => {
	elem.addEventListener('mouseenter', () => {
		elem.classList.add('sub-menu__item_active');
		elem.firstElementChild.classList.add('sub-menu__item__link_active');
		if (elem.firstElementChild.lastElementChild) {
			elem.firstElementChild.lastElementChild.classList.add(
				'sub-menu__item__link_active'
			);
			if (
				elem.firstElementChild.firstElementChild.firstElementChild.style.fill ==
				'rgb(127, 143, 164)'
			) {
				elem.firstElementChild.firstElementChild.firstElementChild.style.fill =
					'#1F8EFA';
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
				elem.firstElementChild.firstElementChild.firstElementChild.style.fill ==
				'rgb(31, 142, 250)'
			) {
				elem.firstElementChild.firstElementChild.firstElementChild.style.fill =
					'rgb(127, 143, 164)';
			}
		}
	});
});

function activeColorIcon(e) {
	// ****** Click moreBtn in WIDGET *****
	if (e.target.closest('.widget__header__more-btn')) {
		let fillSvg = document.querySelector(
			`.fill-color[data-fill-color=${
				e.target.closest('.svg-el').dataset.fillColor
			}]`
		).style.fill;

		e.target
			.closest('.widget__header__more-btn')
			.classList.toggle('widget__header__more-btn_active');

		if (fillSvg === 'rgb(81, 97, 115)') {
			document.querySelector(
				`.fill-color[data-fill-color=${
					e.target.closest('.svg-el').dataset.fillColor
				}]`
			).style.fill = 'rgb(58, 158, 255)';
		}

		if (fillSvg === 'rgb(58, 158, 255)') {
			document.querySelector(
				`.fill-color[data-fill-color=${
					e.target.closest('.svg-el').dataset.fillColor
				}]`
			).style.fill = 'rgb(81, 97, 115)';
		}
	}
	// ****** Click moreBtn in HEADER *****
	if (e.target.closest('.header__nav__item__link_more')) {
		togglePositionWrapper();
		togglePositionRelative();

		let fillSvg = document.querySelector(
			`.fill-color[data-fill-color=${
				e.target.closest('.svg-el').dataset.fillColor
			}]`
		).style.fill;

		if (fillSvg === 'rgb(255, 255, 255)') {
			document.querySelector(
				`.fill-color[data-fill-color=${
					e.target.closest('.svg-el').dataset.fillColor
				}]`
			).style.fill = 'rgb(58, 158, 255)';
		}

		if (fillSvg === 'rgb(58, 158, 255)') {
			document.querySelector(
				`.fill-color[data-fill-color=${
					e.target.closest('.svg-el').dataset.fillColor
				}]`
			).style.fill = 'rgb(255, 255, 255)';
		}
	}
	// ****** Click SIDE-BAR *****
	if (e.target.closest('.sidebar__el')) {
		// Ф-ия переклюцения цвета иконки в правом side-bar
		console.log('!!!TRUE!!!');
		// togglePositionWrapper();
	}
}

function whiteColorIconSideBar(e) {
	document.querySelector(
		`.fill-color[data-fill-color=${e.closest('.svg-el').dataset.fillColor}]`
	).style.fill = '#FFFFFF';
}

function whiteColorIcon(e) {
	document.querySelector(
		`.fill-color[data-fill-color=${e.closest('.svg-el').dataset.fillColor}]`
	).style.fill = '#FFFFFF';
}

function greyColorIcon(e) {
	document.querySelector(
		`.fill-color[data-fill-color=${e.closest('.svg-el').dataset.fillColor}]`
	).style.fill = '#516173';
}
// *********************************************************************************************

// ********************** ПРАВЫЙ SIDE-BAR ******************************************************

function selectedItemSideBar(e) {
	// ********************************************************************************
	// написать ф-ию работающую по всем элементам списка
	// console.log(e.target.closest('.sidebar__el'));

	let fillSvg = document.querySelector(
		`.fill-color[data-fill-color=${
			e.target.closest('.svg-el').dataset.fillColor
		}]`
	).style.fill;

	if (fillSvg === 'rgb(255, 255, 255)') {
		document.querySelector(
			`.fill-color[data-fill-color=${
				e.target.closest('.svg-el').dataset.fillColor
			}]`
		).style.fill = 'rgb(58, 158, 255)';
	}
	removePositionWrapper();

	// *************************************************
	// вкл. активного фона под иконкой sidebar и выкл. разделительной линии
	if (e.target.closest('.sidebar__item')) {
		closeUserMenu(e);
		e.target.closest('.sidebar__item').classList.add('sidebar__item__active');
		e.target.closest('.sidebar__el').classList.remove('sidebar__under-line');
		// console.log(e.target.closest('.sidebar__el'));
		activeColorIcon(e);
	}
	// ********************************************************************************
}

// ***** ADD ALERT *****
function addAlertIconSideBar(e) {
	e.target
		.closest('.sidebar__item__todo')
		.firstElementChild.classList.add('sidebar__alert_visible');
}
// *********************

// ***** Правое всплывающее sidebar-menu *****
function showSubMenuList(e) {
	// ***************** ПЕРЕПИСАТЬ Ф-ИЮ КЛИКА ПО ЭЛЕМЕНТА SIDE-BAR ****************************
	// if (e.target.closest('.sidebar__item')) {
	// 	e.target.closest('.sidebar__item').classList.add('sidebar__item__active');
	// 	e.target.closest('.sidebar__el').classList.remove('sidebar__under-line');
	// }
	selectedItemSideBar(e);
	// *******************************************************************************************
	// console.log(e.target);
	sideBarMenuList.classList.add('sidebar-menu_action');
	addAlertIconSideBar(e);
	// changeColorSvg();

	// e.target.firstElementChild.style.fill = '#1F8EFA';

	// console.log(e.target.classList.contains('sidebar__item__img-size'));
	// style = 'fill: rgb(255, 255, 255)';
}

function closeSubMenuList() {
	sideBarMenuList.classList.remove('sidebar-menu_action');
	sideBarItems.forEach(e => {
		if (e.classList.contains('sidebar__item__active')) {
			e.classList.remove('sidebar__item__active');
			e.classList.add('sidebar__under-line');
			whiteColorIconSideBar(e);
		}
	});
}
// *******************************************

// ***** Поддержка пользователя *****
function toggleSupport() {
	support.classList.toggle('user-support__open');
}

function closeSupport() {
	support.classList.remove('user-support__open');
}
// **********************************

// ***** Панель пользователя *****
function closeUserMenu() {
	userMenu.classList.remove('set-user__open');
}

function toggleUserMenu() {
	userMenu.classList.toggle('set-user__open');
}
// *******************************
// *********************************************************************************************

createCircleChart(name, volume);
createFunnelChart(nameFunnel, volumeFunnel);

sideBarMenuBTN.addEventListener('click', showSubMenuList);
sideBarMenuCloseBTN.addEventListener('click', closeSubMenuList);
supportBtn.addEventListener('click', toggleSupport);
closeSupportBtn.addEventListener('click', closeSupport);
userBtn.addEventListener('click', toggleUserMenu);
closePopupBtn.addEventListener('click', popupClose);
deleteWidgetBtn.addEventListener('click', removeWidget);
inputTaskCalendar.addEventListener('click', showCalendar);
sideBarMoreBtn.addEventListener('click', openHorizontalSideBarMenu);
horizontalSideBarList.addEventListener('click', selectedItemHorizontalSideBar);
