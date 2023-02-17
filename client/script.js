let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const question = [];
  loader(messageDiv);

  // fetch data from server -> bot's response

  const response = await fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = "";

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();
    console.log(typeof parsedData);
    question = parsedData;
    console.log(question[0]);
    console.log(question);
    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";

    alert(err);
  }
};

// let currentQuestionIndex = 0;
// function display() {
//   e.preventDefault();
//   questionDisplay.innerHTML = `Question ${currentQuestionIndex + 1}: ${
//     questions[currentQuestionIndex]
//   }`;
// }
// nextButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   answers.push(answerInput.value);
//   answerInput.value = "";
//   currentQuestionIndex++;
//   if (currentQuestionIndex === questions.length) {
//     getAnalysis();
//   } else {
//     if (currentQuestionIndex === questions.length - 1) {
//       nextButton.innerHTML = "Submit";
//     }
//     questionDisplay.innerHTML = `Question ${currentQuestionIndex + 1}: ${
//       questions[currentQuestionIndex]
//     }`;
//   }
// });
