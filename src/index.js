import './styles/reset.css';
import './styles/main.scss';

// ********************** CALENDAR ***********************************************************
// import { easepick } from '@easepick/core';
import { easepick } from '@easepick/bundle';
import { RangePlugin } from '@easepick/range-plugin';
// *******************************************************************************************

// ********************** DIAGRAM ************************************************************
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
// register controller in chart.js and ensure the defaults are set
Chart.register(FunnelController, TrapezoidElement, ChartDataLabels);
// *******************************************************************************************

// ********************** TOOLTIP ************************************************************
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
tippy('[data-tippy-content]', {
	arrow: true,
	delay: [300, 0],
});
// *******************************************************************************************

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

					// Control the position
					ctx.textBaseline = 'middle';
					ctx.font = '13px Golos Text, sans-serif';
					ctx.fillText(chart.data.labels[index], x + 102, y);
					// console.log(ctx);
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
const termIcon =
	'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 1C16.5523 1 17 1.44772 17 2V2.00101H19C20.6569 2.00101 22 3.34415 22 5.00101V20.001C22 21.6579 20.6569 23.001 19 23.001H5C3.34315 23.001 2 21.6579 2 20.001V5.00101C2 3.34415 3.34315 2.00101 5 2.00101H7V2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2V2.00101H15V2C15 1.44772 15.4477 1 16 1ZM7 4.00101C7.00054 4.55283 7.44805 5 8 5C8.55195 5 8.99946 4.55283 9 4.00101H15C15.0005 4.55283 15.4481 5 16 5C16.5519 5 16.9995 4.55283 17 4.00101H19C19.5523 4.00101 20 4.44872 20 5.00101V7.00101H4V5.00101C4 4.44872 4.44772 4.00101 5 4.00101H7ZM4 9.00101H20V20.001C20 20.5533 19.5523 21.001 19 21.001H5C4.44772 21.001 4 20.5533 4 20.001V9.00101ZM7 11C6.44772 11 6 11.4477 6 12V14C6 14.5523 6.44772 15 7 15H9C9.55228 15 10 14.5523 10 14V12C10 11.4477 9.55228 11 9 11H7Z" fill="#354052"/></svg>';
const termStartFinishIcon =
	'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2V2.00101H9V2C9 1.44772 8.55228 1 8 1C7.44772 1 7 1.44772 7 2V2.00101H5C3.34315 2.00101 2 3.34415 2 5.00101V20.001C2 21.6579 3.34315 23.001 5 23.001H19C20.6569 23.001 22 21.6579 22 20.001V5.00101C22 3.34415 20.6569 2.00101 19 2.00101H17V2ZM8 5C7.44805 5 7.00054 4.55283 7 4.00101H5C4.44772 4.00101 4 4.44872 4 5.00101V7.00101H20V5.00101C20 4.44872 19.5523 4.00101 19 4.00101H17C16.9995 4.55283 16.5519 5 16 5C15.4481 5 15.0005 4.55283 15 4.00101H9C8.99946 4.55283 8.55195 5 8 5ZM20 9.00101H4V20.001C4 20.5533 4.44772 21.001 5 21.001H19C19.5523 21.001 20 20.5533 20 20.001V9.00101ZM6 16C6 15.4477 6.44772 15 7 15H10C10.5523 15 11 15.4477 11 16V18C11 18.5523 10.5523 19 10 19H7C6.44772 19 6 18.5523 6 18V16ZM13 11C12.4477 11 12 11.4477 12 12V14C12 14.5523 12.4477 15 13 15H17C17.5523 15 18 14.5523 18 14V12C18 11.4477 17.5523 11 17 11H13Z" fill="#516173"/></svg>';
const calendarCloseBtn =
	'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.00201416" y="0.000488281" width="24" height="24" rx="12" fill="#DFE3E9"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.7091 8.7076C17.0996 8.31707 17.0996 7.68391 16.7091 7.29338C16.3186 6.90286 15.6854 6.90286 15.2949 7.29338L12.002 10.5863L8.70912 7.29338C8.3186 6.90286 7.68543 6.90286 7.29491 7.29338C6.90438 7.68391 6.90438 8.31707 7.29491 8.7076L10.5878 12.0005L7.29491 15.2934C6.90438 15.6839 6.90438 16.3171 7.29491 16.7076C7.68543 17.0981 8.3186 17.0981 8.70912 16.7076L12.002 13.4147L15.2949 16.7076C15.6854 17.0981 16.3186 17.0981 16.7091 16.7076C17.0996 16.3171 17.0996 15.6839 16.7091 15.2934L13.4162 12.0005L16.7091 8.7076Z" fill="#354052"/></svg>';
const arrowPrevious =
	'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.7071 3.46056C11.0976 3.85108 11.0976 4.48425 10.7071 4.87477L6.58084 9.001H15.8333C16.3856 9.001 16.8333 9.44871 16.8333 10.001C16.8333 10.5533 16.3856 11.001 15.8333 11.001H6.58084L10.7071 15.1272C11.0976 15.5177 11.0976 16.1509 10.7071 16.5414C10.3165 16.932 9.68338 16.932 9.29285 16.5414L3.45952 10.7081C3.06899 10.3176 3.06899 9.68441 3.45952 9.29389L9.29285 3.46056C9.68338 3.07003 10.3165 3.07003 10.7071 3.46056Z" fill="#516173"/></svg>';
const arrowNext =
	'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.29487 3.46056C9.68539 3.07003 10.3186 3.07003 10.7091 3.46056L16.5424 9.29389C16.9329 9.68441 16.9329 10.3176 16.5424 10.7081L10.7091 16.5414C10.3186 16.932 9.68539 16.932 9.29487 16.5414C8.90434 16.1509 8.90434 15.5177 9.29487 15.1272L13.4211 11.001H4.16864C3.61636 11.001 3.16864 10.5533 3.16864 10.001C3.16864 9.44871 3.61636 9.001 4.16864 9.001H13.4211L9.29487 4.87477C8.90434 4.48425 8.90434 3.85108 9.29487 3.46056Z" fill="#516173"/></svg>';
// ********************

// ***** sidebar *****
const sideBarMenuBTN = document.querySelector(
	'.sidebar__item__todo'
); /* картинка в элементе */
// const sideBarItemList =
// 	document.querySelector('.sidebar__items'); /* весь список ul */
const sideBarItems =
	document.querySelectorAll('.sidebar__el'); /* все эл. в списке */
// const sideBarItem = document.querySelector('.sidebar__el'); /* эл. в списке */
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
// const supportImg = document.querySelectorAll('.user-support__item__icon__img');
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
const pickerTerm = new easepick.create({
	element: '#calendarTerm',
	// css: ['https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css'],
	css: function (s) {
		// console.log(s);
		const cssLinks = [
			'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css',
		];
		cssLinks.forEach(cssLink => {
			const link = document.createElement('link');
			link.href = cssLink;
			link.rel = 'stylesheet';
			const onReady = () => {
				this.cssLoaded++;

				if (this.cssLoaded === cssLinks.length) {
					this.ui.wrapper.style.display = '';
				}
			};
			link.addEventListener('load', onReady);
			link.addEventListener('error', onReady);
			// console.log(link);

			this.ui.shadowRoot.append(link);
			this.ui.container.classList.add('term-calendar');

			// console.log(this.ui.container);
		});

		/* append custom style css */
		const css = `
						:host {
							--color-bg-secondary: #ffffff;
							--color-fg-muted: #7F8FA4;
							--day-width: 32px;
							--day-height: 32px;
							--color-fg-selected: #fff;
							--color-fg-accent: #1F8EFA;
							--color-bg-inrange: #ECF6FF;
							--color-fg-primary: #ffffff;
							--color-btn-secondary-bg: #fff;
							--color-btn-secondary-border: #748194;
							--color-btn-secondary-fg: #748194;
							--color-fg-default: #516173;
							--color-btn-primary-disabled-bg: #1F8EFA;
							--color-btn-primary-bg: #1F8EFA;
							--color-btn-primary-hover-bg: #1F8EFA;
						}
						.term-calendar {
							position: fixed;
							top: 80px !important;
							left: 555px !important;
						}
						.container {
							font-family: 'Golos Text', sans-serif;
							font-weight: 500;
							font-size: 14px;
							line-height: 18px;
							width: 532px;
							box-shadow: 0px 5px 27px 0px rgba(27, 36, 49, 0.05), 0px 13px 20px 0px rgba(27, 36, 49, 0.15);
            }
						.container>header {
    					background-color: var(--color-bg-secondary) !important;
    					padding: 12px 16px;
							border-bottom: 2px solid #DFE3E9;
						}
						.container>footer {
							background-color: var(--color-bg-secondary) !important;
    					padding: 16px 16px;
							border-top: 1px solid #DFE3E9;
						}
						.calendar-header {
							display: flex;
							align-items: center;
							justify-content: space-between;
						}
						._active-term {
							color: #354052;
						}
						._active-term::after {
							content: '';
							position: absolute;
							display: block;
							width: 100%;
							height: 2px;
							background-color: #1F8EFA;
							bottom: -14px;
						}
            .calendar-header__term {
							display: flex;
							align-items: center;
							gap: 16px;
							font-size: 16px;
						}
						.calendar-header__term__wrap {
							position: relative;
							display: flex;
							align-items: center;
							gap: 6px;
							padding: 8px 4px;
							cursor: pointer;
						}
						.calendar-header__close {
							width: 24px;
							height: 24px;
							cursor: pointer;
						}
						.calendar>.header .month-name {
							font-weight: 400;
							line-height: 20px;
							font-size: 16px;
							color: #354052;
						}
						.calendar>.header .month-name>span {
							font-weight: 400;
						}
						.calendar>.header button {
							padding: 0px 0px;
							width: 20px;
							height: 20px;
						}
						.calendar>.header button>img, .calendar>.header button>svg {
							transform: none;
						}
						.calendar>.daynames-row>.dayname {
							font-weight: 400 !important;
							color: var(--color-fg-muted);
							padding: 7px 8px;
							line-height: 18px;
						}
						.calendar>.daynames-row>.day, .calendar>.daynames-row>.dayname, .calendar>.days-grid>.day, .calendar>.days-grid>.dayname {
							font-weight: 500;
							line-height: 16px;
							font-size: 14px;
						}
						.calendar>.days-grid>.day {
							border-radius: 50%;
							height: var(--day-height);
							max-height: var(--day-height);
							max-width: var(--day-width);
							min-height: var(--day-height);
							min-width: var(--day-width);
							padding: 10px;
							width: var(--day-width);
						}
						.calendar>.days-grid>.day.today {
							color: var(--color-fg-accent);
							background: #ECF6FF;
						}
						.calendar>.days-grid>.day:hover {
							color: var(--color-fg-primary);
							background: #0085F0
						}
						.container>footer .footer-buttons {
							-moz-column-gap: 5px;
							column-gap: 5px;
							display: flex;
							justify-content: flex-start;
						}
						.container>footer .footer-buttons>button {
							font-weight: 500;
							line-height: 16px;
							font-size: 14px;
							border: none;
							cursor: pointer;
							padding: 10px 12px;
						}
						.container>footer .footer-buttons>button.cancel-button {
							background-color: var(--color-btn-secondary-bg);
							border-color: var(--color-btn-secondary-border);
							color: var(--color-btn-secondary-fg);
							order: 1;
						}
						.container.range-plugin .calendar>.days-grid>.day.end,
						.container.range-plugin .calendar>.days-grid>.day.start {
							background-color: #0085F0;
							color: var(--color-fg-selected)
						}
						.container.range-plugin .calendar>.days-grid>.day.start:after,
						.container.range-plugin .calendar>.days-grid>.day.end:after {
							display: none;
						}
						.container>footer .footer-buttons>button.apply-button:disabled {
							background-color: var(--color-btn-primary-disabled-bg);
							cursor: default;
						}
						.container>footer .footer-buttons>button.apply-button {
							background-color: var(--color-btn-primary-bg);
							border-color: var(--color-btn-primary-border);
							color: #ffffff;
						}
						.container>footer .footer-buttons>button.apply-button:hover {
							background-color: var(--color-btn-primary-hover-bg);
						}
						.calendar>.days-grid>.day.selected {
							background-color: #0085F0;
							color: var(--color-fg-selected);
						}
        	`;

		const style = document.createElement('style');
		const styleText = document.createTextNode(css);
		style.appendChild(styleText);
		// console.log(this.ui.shadowRoot);
		// console.log(this.ui.wrapper);

		this.ui.shadowRoot.append(style);
		this.ui.wrapper.style.display = '';
	},
	setup(pickerTerm) {
		pickerTerm.on('select', evt => {
			// this.elementTarget.innerHTML = '';
			const { date } = evt.detail;
			console.log(date);
		});
	},
	zIndex: 10,
	lang: 'ru-RU',
	format: 'DD.MM.YY',
	inline: false,
	grid: 2,
	calendars: 2,
	readonly: true,
	autoApply: false,
	header: `<div class="calendar-header">
						<div class="calendar-header__term">
							<div class="calendar-header__term__wrap _active-term">${termIcon}<span>Срок</span></div><div class="calendar-header__term__wrap">${termStartFinishIcon}<span>Старт-Финиш</span></div>
						</div>
						<div class="calendar-header__close">${calendarCloseBtn}</div>
					</div>`,
	locale: {
		previousMonth: arrowPrevious,
		nextMonth: arrowNext,
		cancel: 'Сбросить',
		apply: 'Применить',
	},
});

const pickerTask = new easepick.create({
	element: '#datepickerTask',
	// css: ['https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css'],
	css: function (s) {
		// console.log(s);
		const cssLinks = [
			'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css',
		];
		cssLinks.forEach(cssLink => {
			const link = document.createElement('link');
			link.href = cssLink;
			link.rel = 'stylesheet';
			const onReady = () => {
				this.cssLoaded++;

				if (this.cssLoaded === cssLinks.length) {
					this.ui.wrapper.style.display = '';
				}
			};
			link.addEventListener('load', onReady);
			link.addEventListener('error', onReady);
			// console.log(link);

			this.ui.shadowRoot.append(link);
		});

		/* append custom style css */
		const css = `
						:host {
							--color-bg-secondary: #ffffff;
							--color-fg-muted: #7F8FA4;
							--day-width: 32px;
							--day-height: 32px;
							--color-fg-selected: #fff;
							--color-fg-accent: #1F8EFA;
							--color-bg-inrange: #ECF6FF;
							--color-fg-primary: #ffffff;
							--color-btn-secondary-bg: #fff;
							--color-btn-secondary-border: #748194;
							--color-btn-secondary-fg: #748194;
							--color-fg-default: #516173;
							--color-btn-primary-disabled-bg: #1F8EFA;
							--color-btn-primary-bg: #1F8EFA;
							--color-btn-primary-hover-bg: #1F8EFA;
						}
						.container {
							font-family: 'Golos Text', sans-serif;
							font-weight: 500;
							font-size: 14px;
							line-height: 18px;
							width: 532px;
							box-shadow: 0px 5px 27px 0px rgba(27, 36, 49, 0.05), 0px 13px 20px 0px rgba(27, 36, 49, 0.15);
            }
						.container>header {
    					background-color: var(--color-bg-secondary) !important;
    					padding: 12px 16px;
							border-bottom: 2px solid #DFE3E9;
						}
						.container>footer {
							background-color: var(--color-bg-secondary) !important;
    					padding: 16px 16px;
							border-top: 1px solid #DFE3E9;
						}
						.calendar-header {
							display: flex;
							align-items: center;
							justify-content: space-between;
						}
						._active-term {
							color: #354052;
						}
						._active-term::after {
							content: '';
							position: absolute;
							display: block;
							width: 100%;
							height: 2px;
							background-color: #1F8EFA;
							bottom: -14px;
						}
            .calendar-header__term {
							display: flex;
							align-items: center;
							gap: 16px;
							font-size: 16px;
						}
						.calendar-header__term__wrap {
							position: relative;
							display: flex;
							align-items: center;
							gap: 6px;
							padding: 8px 4px;
							cursor: pointer;
						}
						.calendar-header__close {
							width: 24px;
							height: 24px;
							cursor: pointer;
						}
						.calendar>.header .month-name {
							font-weight: 400;
							line-height: 20px;
							font-size: 16px;
							color: #354052;
						}
						.calendar>.header .month-name>span {
							font-weight: 400;
						}
						.calendar>.header button {
							padding: 0px 0px;
							width: 20px;
							height: 20px;
						}
						.calendar>.header button>img, .calendar>.header button>svg {
							transform: none;
						}
						.calendar>.daynames-row>.dayname {
							font-weight: 400 !important;
							color: var(--color-fg-muted);
							padding: 7px 8px;
							line-height: 18px;
						}
						.calendar>.daynames-row>.day, .calendar>.daynames-row>.dayname, .calendar>.days-grid>.day, .calendar>.days-grid>.dayname {
							font-weight: 500;
							line-height: 16px;
							font-size: 14px;
						}
						.calendar>.days-grid>.day {
							border-radius: 50%;
							height: var(--day-height);
							max-height: var(--day-height);
							max-width: var(--day-width);
							min-height: var(--day-height);
							min-width: var(--day-width);
							padding: 10px;
							width: var(--day-width);
						}
						.calendar>.days-grid>.day.today {
							color: var(--color-fg-accent);
							background: #ECF6FF;
						}
						.calendar>.days-grid>.day:hover {
							color: var(--color-fg-primary);
							background: #0085F0
						}
						.container>footer .footer-buttons {
							-moz-column-gap: 5px;
							column-gap: 5px;
							display: flex;
							justify-content: flex-start;
						}
						.container>footer .footer-buttons>button {
							font-weight: 500;
							line-height: 16px;
							font-size: 14px;
							border: none;
							cursor: pointer;
							padding: 10px 12px;
						}
						.container>footer .footer-buttons>button.cancel-button {
							background-color: var(--color-btn-secondary-bg);
							border-color: var(--color-btn-secondary-border);
							color: var(--color-btn-secondary-fg);
							order: 1;
						}
						.container.range-plugin .calendar>.days-grid>.day.end,
						.container.range-plugin .calendar>.days-grid>.day.start {
							background-color: #0085F0;
							color: var(--color-fg-selected)
						}
						.container.range-plugin .calendar>.days-grid>.day.start:after, 
						.container.range-plugin .calendar>.days-grid>.day.end:after {
							display: none;
						}
						.container>footer .footer-buttons>button.apply-button:disabled {
							background-color: var(--color-btn-primary-disabled-bg);
							cursor: default;
						}
						.container>footer .footer-buttons>button.apply-button {
							background-color: var(--color-btn-primary-bg);
							border-color: var(--color-btn-primary-border);
							color: #ffffff;
						}
						.container>footer .footer-buttons>button.apply-button:hover {
							background-color: var(--color-btn-primary-hover-bg);
						}
        	`;

		const style = document.createElement('style');
		const styleText = document.createTextNode(css);
		style.appendChild(styleText);
		// console.log(this.ui.shadowRoot);
		// console.log(this.ui.wrapper);

		this.ui.shadowRoot.append(style);
		this.ui.wrapper.style.display = '';
	},
	setup(pickerTask) {
		pickerTask.on('select', evt => {
			const date = evt.detail.start;
			console.log(evt);
			console.log(evt.detail.start);
			console.log(pickerTask.ui);
		});
		// создается div равное количеству дней
		// pickerTask.on('view', event => {
		// 	// console.log(event);
		// 	const div = document.createElement('div');
		// 	pickerTask.ui.container.append(div);
		// });
	},
	zIndex: 10,
	lang: 'ru-RU',
	format: 'DD.MM.YY',
	inline: false,
	grid: 2,
	calendars: 2,
	readonly: true,
	autoApply: false,
	header: `<div class="calendar-header">
						<div class="calendar-header__term">
							<div class="calendar-header__term__wrap">${termIcon}<span>Срок</span></div><div class="calendar-header__term__wrap _active-term">${termStartFinishIcon}<span>Старт-Финиш</span></div>
						</div>
						<div class="calendar-header__close">${calendarCloseBtn}</div>
					</div>`,
	locale: {
		previousMonth: arrowPrevious,
		nextMonth: arrowNext,
		cancel: 'Сбросить',
		apply: 'Применить',
	},
	RangePlugin: {
		strict: false,
		tooltip: false,
	},
	plugins: [RangePlugin],
});
// console.log(pickerTask.ui.container);

const pickerDeals = new easepick.create({
	element: '#datepickerDeals',
	// css: ['https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css'],
	css: function (s) {
		// console.log(s);
		const cssLinks = [
			'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css',
		];
		cssLinks.forEach(cssLink => {
			const link = document.createElement('link');
			link.href = cssLink;
			link.rel = 'stylesheet';
			const onReady = () => {
				this.cssLoaded++;

				if (this.cssLoaded === cssLinks.length) {
					this.ui.wrapper.style.display = '';
				}
			};
			link.addEventListener('load', onReady);
			link.addEventListener('error', onReady);
			// console.log(link);

			this.ui.shadowRoot.append(link);
		});

		/* append custom style css */
		const css = `
						:host {
							--color-bg-secondary: #ffffff;
							--color-fg-muted: #7F8FA4;
							--day-width: 32px;
							--day-height: 32px;
							--color-fg-selected: #fff;
							--color-fg-accent: #1F8EFA;
							--color-bg-inrange: #ECF6FF;
							--color-fg-primary: #ffffff;
							--color-btn-secondary-bg: #fff;
							--color-btn-secondary-border: #748194;
							--color-btn-secondary-fg: #748194;
							--color-fg-default: #516173;
							--color-btn-primary-disabled-bg: #1F8EFA;
							--color-btn-primary-bg: #1F8EFA;
							--color-btn-primary-hover-bg: #1F8EFA;
						}
						.container {
							font-family: 'Golos Text', sans-serif;
							font-weight: 500;
							font-size: 14px;
							line-height: 18px;
							width: 532px;
							box-shadow: 0px 5px 27px 0px rgba(27, 36, 49, 0.05), 0px 13px 20px 0px rgba(27, 36, 49, 0.15);
            }
						.container>header {
    					background-color: var(--color-bg-secondary) !important;
    					padding: 12px 16px;
							border-bottom: 2px solid #DFE3E9;
						}
						.container>footer {
							background-color: var(--color-bg-secondary) !important;
    					padding: 16px 16px;
							border-top: 1px solid #DFE3E9;
						}
						.calendar-header {
							display: flex;
							align-items: center;
							justify-content: space-between;
						}
						._active-term {
							color: #354052;
						}
						._active-term::after {
							content: '';
							position: absolute;
							display: block;
							width: 100%;
							height: 2px;
							background-color: #1F8EFA;
							bottom: -14px;
						}
            .calendar-header__term {
							display: flex;
							align-items: center;
							gap: 16px;
							font-size: 16px;
						}
						.calendar-header__term__wrap {
							position: relative;
							display: flex;
							align-items: center;
							gap: 6px;
							padding: 8px 4px;
							cursor: pointer;
						}
						.calendar-header__close {
							width: 24px;
							height: 24px;
							cursor: pointer;
						}
						.calendar>.header .month-name {
							font-weight: 400;
							line-height: 20px;
							font-size: 16px;
							color: #354052;
						}
						.calendar>.header .month-name>span {
							font-weight: 400;
						}
						.calendar>.header button {
							padding: 0px 0px;
							width: 20px;
							height: 20px;
						}
						.calendar>.header button>img, .calendar>.header button>svg {
							transform: none;
						}
						.calendar>.daynames-row>.dayname {
							font-weight: 400 !important;
							color: var(--color-fg-muted);
							padding: 7px 8px;
							line-height: 18px;
						}
						.calendar>.daynames-row>.day, .calendar>.daynames-row>.dayname, .calendar>.days-grid>.day, .calendar>.days-grid>.dayname {
							font-weight: 500;
							line-height: 16px;
							font-size: 14px;
						}
						.calendar>.days-grid>.day {
							border-radius: 50%;
							height: var(--day-height);
							max-height: var(--day-height);
							max-width: var(--day-width);
							min-height: var(--day-height);
							min-width: var(--day-width);
							padding: 10px;
							width: var(--day-width);
						}
						.calendar>.days-grid>.day.today {
							color: var(--color-fg-accent);
							background: #ECF6FF;
						}
						.calendar>.days-grid>.day:hover {
							color: var(--color-fg-primary);
							background: #0085F0
						}
						.container>footer .footer-buttons {
							-moz-column-gap: 5px;
							column-gap: 5px;
							display: flex;
							justify-content: flex-start;
						}
						.container>footer .footer-buttons>button {
							font-weight: 500;
							line-height: 16px;
							font-size: 14px;
							border: none;
							cursor: pointer;
							padding: 10px 12px;
						}
						.container>footer .footer-buttons>button.cancel-button {
							background-color: var(--color-btn-secondary-bg);
							border-color: var(--color-btn-secondary-border);
							color: var(--color-btn-secondary-fg);
							order: 1;
						}
						.container.range-plugin .calendar>.days-grid>.day.end,
						.container.range-plugin .calendar>.days-grid>.day.start {
							background-color: #0085F0;
							color: var(--color-fg-selected)
						}
						.container.range-plugin .calendar>.days-grid>.day.start:after, 
						.container.range-plugin .calendar>.days-grid>.day.end:after {
							display: none;
						}
						.container>footer .footer-buttons>button.apply-button:disabled {
							background-color: var(--color-btn-primary-disabled-bg);
							cursor: default;
						}
						.container>footer .footer-buttons>button.apply-button {
							background-color: var(--color-btn-primary-bg);
							border-color: var(--color-btn-primary-border);
							color: #ffffff;
						}
						.container>footer .footer-buttons>button.apply-button:hover {
							background-color: var(--color-btn-primary-hover-bg);
						}
        	`;

		const style = document.createElement('style');
		const styleText = document.createTextNode(css);
		style.appendChild(styleText);
		// console.log(this.ui.shadowRoot);
		// console.log(this.ui.wrapper);

		this.ui.shadowRoot.append(style);
		this.ui.wrapper.style.display = '';
	},
	zIndex: 10,
	lang: 'ru-RU',
	format: 'DD.MM.YY',
	inline: false,
	grid: 2,
	calendars: 2,
	readonly: false,
	autoApply: false,
	header: `<div class="calendar-header">
						<div class="calendar-header__term">
							<div class="calendar-header__term__wrap">${termIcon}<span>Срок</span></div><div class="calendar-header__term__wrap _active-term">${termStartFinishIcon}<span>Старт-Финиш</span></div>
						</div>
						<div class="calendar-header__close">${calendarCloseBtn}</div>
					</div>`,
	locale: {
		previousMonth: arrowPrevious,
		nextMonth: arrowNext,
		cancel: 'Сбросить',
		apply: 'Применить',
	},
	RangePlugin: {
		strict: false,
		tooltip: false,
	},
	plugins: [RangePlugin],
});
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
		// console.log(e.target.closest('.widget__header__wrapper'));
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
document.querySelector('#term').addEventListener('click', () => {
	pickerTerm.show();
});
sideBarMoreBtn.addEventListener('click', openHorizontalSideBarMenu);
horizontalSideBarList.addEventListener('click', selectedItemHorizontalSideBar);
