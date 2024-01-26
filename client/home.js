window.onload = () => {
  generateQue();
};

var queryString = location.search.substring(1);
var data = queryString.split("|");
const namevalue = decodeURIComponent(data[0]);
const professionvalue = decodeURIComponent(data[1]);
console.log(namevalue);
console.log(professionvalue);

const username = document.getElementById("name");
const userprofession = document.getElementById("profession");
const profilename = document.getElementById("profile");
const questionDisplay = document.getElementById("question");
const answerInput = document.getElementById("answer");
const nextButton = document.getElementById("submit");
const resultDisplay = document.getElementById("result");
const remark = document.getElementById("remark");
const optimise = document.getElementById("optimise");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const ana_que = document.getElementById("analysis-question");
const loding = document.getElementById("loding");

username.innerHTML += namevalue;
userprofession.innerHTML += professionvalue;
profilename.innerHTML = namevalue.slice(0, 2);

let questions = [];
let answers = [];
let remarks = [];
let optimise_ans = [];

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";
    nextButton.style.visibility = "hidden";
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

async function generateQue() {
  loader(loding);
  const response = await fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: `Only Generate 3 Proffesional Interview Questions For ${professionvalue}.Without Separating Space`,
      token : 3000,
    }),
  });
  clearInterval(loadInterval);
  nextButton.style.visibility = "visible";
  loding.innerHTML = "";
  if (response.ok) {
    const data = await response.json();
    console.log("data \n");
    console.log(data);
    const parsedData = data.text.trim();
    questions = parsedData.split("\n");
    console.log("questions");
    console.log(questions);
    display(questions);
  } else {
    const err = await response.text();
    questionDisplay.innerHTML = "Something Went Wrong...!!!";
    console.log("Something Went Wrong...!!!");
    alert(err);
  }
}

let currentQuestionIndex = 0;
function display(questions) {
  questionDisplay.innerHTML = `${questions[currentQuestionIndex]}`;
}

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  answers.push(answerInput.value);
  answerInput.value = "";
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    answerInput.style.display="none";
    questionDisplay.innerHTML="Generating Analysis";
    nextButton.innerHTML = "Generate Analysis";
    nextButton.style.marginLeft="25px";
    getRemarks();
  } else {
    if (currentQuestionIndex === questions.length - 1) {
      nextButton.innerHTML = "Submit";
    }
    questionDisplay.innerHTML = `${questions[currentQuestionIndex]}`;
  }
});

async function getRemarks() {
  for (let i = 0; i < questions.length; i++) {
    loader(loding);
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Give Strictly 3 Words Evaluation Remark, Judge It As Professional Interview: Question: ${questions[i]}  Answer: ${answers[i]}`,
        token: 15,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      const parsedData = data.text.trim();
      remarks[i] = parsedData.replace(/[\n\W]/g, " ");
    } else {
      const err = await response.text();
      questionDisplay.innerHTML = "Something Went Wrong...!!!";
      console.log("Something Went Wrong...!!!");
      alert(err);
    }
    loding.innerHTML = "";
    clearInterval(loadInterval);
  }
    console.log("remarks");
    console.log(remarks);
    getOptimise();
}

async function getOptimise() {
  for (let i = 0; i < questions.length; i++) {
    loader(loding);
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Optimise This Interview Answer In 30-35 Words To Profession Tone: Question: ${questions[i]}  Answer: ${answers[i]}`,
        token: 100,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.text.trim();
      optimise_ans[i] = parsedData.replace(/[\n\W]/g, " ");
    } 
    else {
      const err = await response.text();
      questionDisplay.innerHTML = "Something Went Wrong...!!!";
      console.log("Something Went Wrong...!!!");
      alert(err);
    }
    loding.innerHTML = "";
    clearInterval(loadInterval);
  }
  console.log("Optimise Ans");
  console.log(optimise_ans);
  displayAnalysis();
}

let currentanalysisindex = 0;
function displayAnalysis() {
  const analysis = document.getElementById("analysis");
  analysis.style.display = "block";
  previous.style.visibility = "hidden";
  ana_que.innerHTML = `${questions[currentanalysisindex]}`;
  optimise.innerHTML=`${optimise_ans[currentanalysisindex]}`;
  remark.innerHTML = `${remarks[currentanalysisindex]}`;
  questionDisplay.innerHTML="To Regenarate Analysis Click On This Button";
  nextButton.style.visibility = "visible";
}

next.addEventListener("click", (e) => {
  e.preventDefault();
  currentanalysisindex++;
  if (currentanalysisindex === remarks.length-1) {
    next.style.visibility = "hidden";
  }  
  if (currentanalysisindex <= remarks.length) {
    if ((previous.style.visibility = "hidden")) {
      previous.style.visibility = "visible";
    }
  }
  ana_que.innerHTML = `${questions[currentanalysisindex]}`;
  optimise.innerHTML = `${optimise_ans[currentanalysisindex]}`;
  remark.innerHTML = `${remarks[currentanalysisindex]}`;
});

previous.addEventListener("click", (e) => {
  e.preventDefault();
  currentanalysisindex--;
  if (currentanalysisindex === 0) {
    previous.style.visibility = "hidden";
  }
  if ((next.style.visibility = "hidden")) {
    next.style.visibility = "visible";
  }
  ana_que.innerHTML = `${questions[currentanalysisindex]}`;
  optimise.innerHTML = `${optimise_ans[currentanalysisindex]}`;
  remark.innerHTML = `${remarks[currentanalysisindex]}`;
});


