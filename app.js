var  firebaseConfig = {
    apiKey: "AIzaSyCCIlYKU9iVDpQ_Cs0iZ-Dc9d9zcrbfBrI",
    authDomain: "quiz-app-d9a76.firebaseapp.com",
    databaseURL: "https://quiz-app-d9a76-default-rtdb.firebaseio.com",
    projectId: "quiz-app-d9a76",
    storageBucket: "quiz-app-d9a76.firebasestorage.app",
    messagingSenderId: "880030859794",
    appId: "1:880030859794:web:30d81a7637392b5cbb0ecb",
    measurementId: "G-Q05WJRXNZJ"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
 



var questions = [
    {
      question: "HTML Stands for",
      option1: "Hyper Text Markup Language",
      option2: "Hyper Tech Markup Language",
      option3: "Hyper Touch Markup Language",
      corrAnswer: "Hyper Text Markup Language",
    },
    {
      question: "CSS Stands for",
      option1: "Cascoding Style Sheets",
      option2: "Cascading Style Sheets",
      option3: "Cascating Style Sheets",
      corrAnswer: "Cascading Style Sheets",
    },
    {
      question: "Which tag is used for most large heading",
      option1: "<h6>",
      option2: "<h2>",
      option3: "<h1>",
      corrAnswer: "<h1>",
    },
    {
      question: "Which tag is used to make element unique",
      option1: "id",
      option2: "class",
      option3: "label",
      corrAnswer: "id",
    },
    {
      question: "Any element assigned with id, can be get in css",
      option1: "by # tag",
      option2: "by @ tag",
      option3: "by & tag",
      corrAnswer: "by # tag",
    },
    {
      question: "CSS can be used with ______ methods",
      option1: "8",
      option2: "3",
      option3: "4",
      corrAnswer: "3",
    },
    {
      question: "In JS variable types are ____________",
      option1: "6",
      option2: "3",
      option3: "8",
      corrAnswer: "8",
    },
    {
      question: "In array we can use key name and value",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
    {
      question: "toFixed() is used to define length of decimal",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "True",
    },
    {
      question: "push() method is used to add element in the start of array",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
  ];
  
  var quesElement = document.getElementById("ques");
  var option1 = document.getElementById("opt1");
  var option2 = document.getElementById("opt2");
  var option3 = document.getElementById("opt3");
  var result = document.getElementById("result");
  var success = document.getElementById("success");
  var index = 0;
  var score = 0;
  var timer = document.getElementById("timer");
  var min = 1;
  var sec = 59;
  
  var timerInterval;
  
  function startTimer() {
    clearInterval(timerInterval);
  
    min = 1;
    sec = 59;
    timer.innerHTML = `${min} : ${sec}`;
  
    timerInterval = setInterval(function () {
      timer.innerHTML = `${min} : ${sec}`;
      sec--;
      if (sec < 0) {
        min--;
        sec = 59;
        if (min < 0) {
          clearInterval(timerInterval); 
          nextQuestion(); 
        }
      }
    }, 1000); 
  }
  
  
  function stopTimer() {
    clearInterval(timerInterval);  
  }
  
  function resetTimer() {
    min = 1;
    sec = 59;
    timer.innerHTML = `${min} : ${sec}`;
    startTimer();  
  }

  var finalResult;
  
  function nextQuestion() {
    var nextBtn = document.getElementById("btn");
  
    var allOptions = document.getElementsByTagName("input");
  
    for (var i = 0; i < allOptions.length; i++) {
      if (allOptions[i].checked) {
        allOptions[i].checked = false;
        var selectedValue = allOptions[i].value;
        var selectedOption = questions[index - 1][`option${selectedValue}`];
        var correctAnswer = questions[index - 1]["corrAnswer"];
  
        var id = firebase.database().ref("quiz").push().key;

        var obj = {
        selectedOption: selectedOption,
        selectedValue:selectedValue,
        corrAnswer:correctAnswer,
          id: id,
        };
      
        firebase.database().ref(`quiz/${id}`).set(obj);
     
       

        if (selectedOption === correctAnswer) {
          score++;
        

        }
      }
    }

  
    if(index >= questions.length) {

        console.log(finalResult,'final');

            // alert(`Your score is ${score}`);
            result.innerHTML = score;
            
            var id2 = firebase.database().ref("Total Score").push().key;

            var obj3 = {
              totalScore:score,
              id: id2,
            };
          
            firebase.database().ref(`Total Score/${id2}`).set(obj3);

            nextBtn.remove();
            stopTimer();

          }
          
    nextBtn.disabled = true;
  
    if (index >= questions.length) {
      // console.log(((score / questions.length) * 100).toFixed(2));  
    } else {
      quesElement.innerText = questions[index].question;
      option1.innerText = questions[index].option1;
      option2.innerText = questions[index].option2;
      option3.innerText = questions[index].option3;
      index++;
      resetTimer();  
    }
  }
  
  function clicked() {
    var nextBtn = document.getElementById("btn");
    nextBtn.disabled = false; 
  }
  
  startTimer();  
  