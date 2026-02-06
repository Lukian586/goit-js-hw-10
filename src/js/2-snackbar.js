import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

function createPromise(delay, choose) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (choose === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        },delay);
    });
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = parseInt(event.target.elements.delay.value, 10);
    const choose = event.target.elements.state.value;
    
    createPromise(delay, choose)
        .then((delay) => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: `topRight`,
                icon: false
        });
        })
        .catch((delay) => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: `topRight`,
                icon: false
            });
    });

});


