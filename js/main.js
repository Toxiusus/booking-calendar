const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days");
prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date (),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["Январь",
"Февраль",
"Март",
"Апрель",
"Май",
"Июнь",
"Июль",
"Август"
,"Сентябрь"
,"Октябрь"
,"Ноябрь"
,"Декабрь"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    lastDareofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    lastDayofMonth = new Date(currYear, currMonth, lastDareofMonth).getDay();
    lastDareofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDareofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDareofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth -1 :currMonth + 1;

        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    })
});

const daysLi = document.querySelectorAll(".days li");
const btnDelete = document.querySelector('.btn__delete');
const btnSubmit = document.querySelector('.btn__submit');
const bookingInputs = document.querySelectorAll('.booking__input');
const bookingWrapper = document.querySelector('.wrapper');
const inputStart = document.getElementById('start');
const inputEnd = document.getElementById('end');
let chooseInput = 'start';


daysLi.forEach(li => {
    const currentId = document.activeElement.id;

    li.addEventListener('click', showDate);
});

function showDate (evt) {

    const target = evt.currentTarget;

    daysLi.forEach(function(li){

     li.classList.remove('active');
     
     document.getElementById(chooseInput).value = target.innerText + '.' + currMonth + '.' + currYear;
    });

    target.classList.add('active');

    inputEnd.focus();

    chooseInput = 'end';

    btnDelete.addEventListener(('click'),(e) => {
        target.classList.remove('active');
        inputStart.value = "";
        inputEnd.value = "";
    });
}

inputStart.addEventListener('click', e => {
    chooseInput = 'start';
    bookingWrapper.classList.add('wrapper--visible');
});

inputEnd.addEventListener('click', e => {
    chooseInput = 'end';
    bookingWrapper.classList.add('wrapper--visible');
});


btnSubmit.addEventListener('click', e => {
    bookingWrapper.classList.remove('wrapper--visible');
});