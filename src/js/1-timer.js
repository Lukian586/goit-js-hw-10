import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const input = document.querySelector("#datetime-picker");
const hourEl= document.querySelector("[data-hours]");
const minuteEl= document.querySelector("[data-minutes]");
const dayEl = document.querySelector("[data-days]");
const secondEl = document.querySelector("[data-seconds]");
const btn = document.querySelector("[data-start]");



btn.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const date = new Date();
    if (selectedDates[0].getTime() <= date.getTime()) {
        btn.disabled = true;
        return iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight'
        });
} else {
        btn.disabled = false;
        userSelectedDate = selectedDates[0];
     }
  },
};

flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
};

let timerId;

btn.addEventListener("click", () => {
    btn.disabled = true;
    input.disabled = true;
    updateTime();
    timerId = setInterval(updateTime, 1000);   
});

function updateTime() {
    const difference = userSelectedDate - new Date();
        const { days, hours, minutes, seconds } = convertMs(difference);
        if (difference <= 0) {
            clearInterval(timerId);
            dayEl.textContent = "00";
        hourEl.textContent = "00";
        minuteEl.textContent = "00";
            secondEl.textContent = "00";
            input.disabled = false;
            btn.disabled = true;
            return;
        }


        dayEl.textContent = addLeadingZero(days);
        hourEl.textContent = addLeadingZero(hours);
        minuteEl.textContent = addLeadingZero(minutes);
        secondEl.textContent = addLeadingZero(seconds);
}





function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}






