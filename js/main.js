
// Служебные переменные
const d = document;
const body = d.querySelector('body');

// Служебные функции

function find(selector) {
	return d.querySelector(selector)
}

function findAll(selectors) {
	return d.querySelectorAll(selectors)
}

function bodyLock(con) {
    if (con === true) {
        body.classList.add('_lock');
    } else if (con === false) {
        body.classList.remove('_lock');
    } else if (con === undefined) {
		if (!body.classList.contains('_lock')) {
			body.classList.add('_lock');
		}
		else {
			body.classList.remove('_lock')
		}
	} else {
		console.error('Неопределенный аргумент у функции bodyLock()')
	}
}

// Мобильное меню
menu()
function menu() {
	const burger = find('.burger')
	const menu = find('.menu');
	const closeMenu = menu.querySelectorAll('.menu__close')

	for (let button of [burger, Array.prototype.slice.call(closeMenu)].flat()) {
		button.addEventListener('click', (e) => {
			burger.classList.toggle('_active')
			menu.classList.toggle('_show')
			bodyLock()
		})
	}
}

// TODO: ЗАКОНЧИЛ ЗДЕСЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Закрытие модального окна, при клике по фону
// Закрытие модального окна при клике по заднему фону
function closeWhenClickingOnBg(itemArray, classShow, itemParent) {
	classShow = classShow;
	if (classShow == '') {
	  classShow = '_show';
	}

	document.addEventListener('click', (e) => {
	  let itemElems = document.querySelectorAll(itemArray)
  
	  for (let i = 0; i < itemElems.length; i++) {
		const item = itemElems[i];
		
		const target = e.target,
			  itsItem = target == item || item.contains(target),
			  itemIsShow = item.classList.contains(classShow);
	
		if (itemParent) {
		  const itsItemParent = target == itemParent || itemParent.contains(target),
				itemParentIsShow = itemParent.classList.contains(classShow);
	
		  if (!itsItem && itsItemParent && itemParentIsShow) {
			itemParent.classList.remove(classShow);
	
			if (body.classList.contains('_lock')) {
			  bodyLock()
			  document.removeEventListener('click', document);
			}
			
			if (window.location.hash === '#' + itemParent.getAttribute('id')) { resetHash() }
		  }
		}
		else {
		  if (!itsItem && itemIsShow) {
			item.classList.remove(classShow);
			if (body.classList.contains('_lock')) {
			  bodyLock()
			  document.removeEventListener('click', document);
			}
  
			if (window.location.hash === '#' + itemParent.getAttribute('id')) { resetHash() }
		  }
		}
  
	  }
	})
  }



// Скрипт открытия модальных окон
openModal();
function openModal() {
    const btnsOpenModal = document.querySelectorAll('[data-modal-open]');
    for (let i = 0; i < btnsOpenModal.length; i++) {
	      const btn = btnsOpenModal[i];
	      btn.addEventListener('click', (e) => {
			const dataBtn = btn.dataset.modalOpen;
		    const modalThatOpens = document.querySelector(`#${dataBtn}`); //ID модалки
		      
			d.querySelector('.modal').classList.add('modal--active')
		    modalThatOpens.classList.add('modal-window--active');
			  
			bodyLock();

			closeWhenClickingOnBg(`#${dataBtn} .modal__content`, '', modalThatOpens);
			    window.location.hash = dataBtn
			    document.removeEventListener('click', btn);
	    });
	}
}


// Ленивая загрузка изображений
[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
	img.setAttribute('src', img.getAttribute('data-src'));
	img.onload = function() {
		img.removeAttribute('data-src');
	};
});


// Куки
function setCookie(c_name,value,exdays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()) + "; path=/";
    document.cookie=c_name + "=" + c_value;
}

function getMyCookie(name) {
    var c = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
        if (c) return c[2];
    	else return "";
}


// Слайдер с контрольными точками (Используется библиотека swiper: https://swiperjs.com/)
var swiper = new Swiper('.swiper-slider', {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: false,
	// init: false,
	pagination: {
		el: '.testimonials-swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.testimonials-swiper-next',
		prevEl: '.testimonials-swiper-prev',
	},
	breakpoints: {
		670: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1300: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
	}
});


// Галлерея с модальным окном (Используется библиотека LightGallary: https://www.lightgalleryjs.com/) 
lightGallery(document.querySelector('.lightgallery'));


// Скрипт для раздела FAQ - "Частозадаваемые вопросы"
function findFaq(){
	let faqBoxes = document.querySelectorAll('.faq-box')
	for(i = 0; i <= faqBoxes.length-1; i++){
		faqBoxes[i].addEventListener('click', function(e) {
			e.preventDefault();
			if(this.classList.contains('active')){
				this.classList.remove('active');
			}else{
				let activeElem = this.closest('.faq').querySelector('.faq-box.active');
				if(activeElem){
					activeElem.classList.remove('active');
				}
				this.classList.add('active');
			}
		});
	}
}
findFaq();


// AOS анимации инициализация (https://michalsnik.github.io/aos/)
AOS.init();
