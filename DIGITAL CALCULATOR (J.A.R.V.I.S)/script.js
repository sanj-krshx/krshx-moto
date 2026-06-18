const display = document.getElementById("display");

// Calculator Functions

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "ERROR";
    }
}

// Keyboard Support

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (
        !isNaN(key) ||
        ['+', '-', '*', '/', '.', '%'].includes(key)
    ) {
        appendValue(key);
    }

    else if (key === "Enter") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }
});

// Live Clock

function updateClock() {
    const now = new Date();

    const time =
        now.toLocaleTimeString();

    document.getElementById("clock").innerText = time;
}

setInterval(updateClock, 1000);

// Voice Recognition

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (SpeechRecognition) {

    const recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.onresult = (event) => {

        let speech =
            event.results[0][0].transcript;

        speech = speech
            .replace(/plus/g, "+")
            .replace(/minus/g, "-")
            .replace(/times/g, "*")
            .replace(/multiplied by/g, "*")
            .replace(/divide by/g, "/");

        display.value = speech;

        calculate();
    };

    document
        .getElementById("voiceBtn")
        .addEventListener("click", () => {

            recognition.start();
        });
}

// Jarvis Greeting

window.onload = () => {

    setTimeout(() => {

        alert(
            "Welcome Sir.\nJARVIS Online."
        );

    }, 500);
};