function toggleVisibility(elementToShow, elementToHide) {
    if (elementToShow) elementToShow.classList.remove('d-none');
    if (elementToHide) elementToHide.classList.add('d-none');
}

function switchDisplayToTracker() {
    const fillerTextContainer = document.querySelector('.filler-text');
    const trackerContainer = document.querySelector('.tracker-container');
    const plusCircle = document.querySelector('.box-two .plus-circle');
    const resumeBtnContainer = document.querySelector('.box-two .d-none:nth-child(2)');
    toggleVisibility(trackerContainer, fillerTextContainer);
    toggleVisibility(null, plusCircle);
    resumeBtnContainer.classList.add('d-none');
}

document.addEventListener('DOMContentLoaded', function () {
    const switchContainer = document.querySelector('.box-one .main-switch-container');
    const switchText = document.querySelector('.box-one .main-switch-container div');
    const newContainer = document.querySelector('.box-one .d-none');
    const arrowIcon = document.querySelector('.box-one .entry-switch-container .entry-switch-btn');
    const timerRadio = document.getElementById('timerRadio');
    const fillerTextContainer = document.querySelector('.filler-text');
    const trackerContainer = document.querySelector('.tracker-container');
    const plusCircle = document.querySelector('.box-two .plus-circle');
    const resumeBtnContainer = document.querySelector('.box-two .d-none:nth-child(2)');
    const stopBtnContainer = document.querySelector('.box-two .d-none:nth-child(3)');
    const initialNewContainerHTML = newContainer.innerHTML;
    const goBackTracking = document.querySelector('.go-back-tracking');

    function rebindArrowLeftEventListener() {
        const arrowLeft = document.querySelector('.arrow-icon-left');
        if (arrowLeft) {
            arrowLeft.addEventListener('click', function () {
                console.log("Arrow left clicked");
                toggleVisibility(switchContainer, newContainer);
                toggleVisibility(switchText, null);
                toggleVisibility(arrowIcon, null);
                toggleVisibility(fillerTextContainer, trackerContainer);
                toggleVisibility(plusCircle, null);

                resumeBtnContainer.classList.add('d-none');
                stopBtnContainer.classList.add('d-none');
            });
        }
    }

    function updateNewContainerHTML(html) {
        newContainer.innerHTML = html;
        rebindArrowLeftEventListener();
    }

    switchContainer.addEventListener('click', function () {
        console.log("Switch container clicked");
        toggleVisibility(newContainer, switchContainer);
        toggleVisibility(newContainer, switchText);
        toggleVisibility(newContainer, arrowIcon);
        toggleVisibility(fillerTextContainer, trackerContainer);
        toggleVisibility(plusCircle, null);
        rebindArrowLeftEventListener();
    });

    timerRadio.addEventListener('click', function () {
        console.log("Timer radio clicked");
        switchDisplayToTracker();
        toggleVisibility(resumeBtnContainer, plusCircle);
        toggleVisibility(trackerContainer, null);
        toggleVisibility(goBackTracking, null);
    });

    resumeBtnContainer.addEventListener('click', function () {
        console.log("Resume button clicked");
        toggleVisibility(resumeBtnContainer, null);
        updateNewContainerHTML('<div class="font-20">00:00:00</div>');
    });


    //   stopBtnContainer.addEventListener('click', function () {
    //       console.log("Stop button clicked");
    //       toggleVisibility(resumeBtnContainer, stopBtnContainer);
    //       updateNewContainerHTML(initialNewContainerHTML);
    //   });


    let timer = null;
    let elapsedSeconds = 0;
    let savedTimes = [];

    document.getElementById("startButton").addEventListener("click", function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
            savedTimes.push(formatTime(elapsedSeconds));
            displaySavedTimes();
            elapsedSeconds = 0;
            updateClock();
            this.innerHTML = `<img src="./Assets/resume-btn.svg">`;
            updateNewContainerHTML(initialNewContainerHTML);
        } else {
            timer = setInterval(updateClock, 1000);
            this.innerHTML = `<img class="stop" src="./Assets/stop-btn.svg">`;
        }
    });

    function updateClock() {
        elapsedSeconds++;
        document.getElementById("clock").textContent = formatTime(elapsedSeconds);
    }

    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    function displaySavedTimes() {
        const timesList = savedTimes.map(time => `<li>${time}</li>`).join('');
        document.getElementById("savedTimes").innerHTML = `<ul>${timesList}</ul>`;
    }

    rebindArrowLeftEventListener();
});



