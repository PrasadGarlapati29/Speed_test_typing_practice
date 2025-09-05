// alert("hello")

//Get All the dom elements

let displayText=document.getElementById("displayText");
let textareaEl=document.getElementById("userText");
let resultEl=document.getElementById("resultEl")
let timeEl=document.getElementById("time_id");
let submitEl=document.getElementById("submitEl");
let resetEl=document.getElementById("resetEl");

//the Sentence for Typing test

let originlaText=
 "Do not give your attention to what others do or fail to do; give it to what you do or fail to do.";
 
//timer variables

let countdown=0;
let intervalId=null;

//Render the orginal text into spans (so we can color each character)

function renderText(){
  displayText.innerHtml="";
  for (let i=0; i<=originalText.length;i++){
    let span=document.createElement("span");
    span.textContent=originalText[i];
    displayText.appendChild(span);
  }
}
renderText();

//Start the timer

function startTimer(){
  if (intervalId != null) return; //prevent multiple timers
  intervalId =setInterval(function(){
    countdown++;
    timeEl.textContent = countdown + " seconds";
  },1000);
}

//Real-time typing check
textareaEl.addEventListener("input",function(){
  startTimer();
  let input =textareaEl.value;
  let spans=displayText.querySelectorAll("span");
  
  //reset all styles
  spans.forEach(span=>{
    span.classList.remove("correct","wrong");
  });
  
  //compare types text with original text
  for (let i=0; i<input.length;i++){
     if (i>=originalText.length) break
     
     if (input[i] === originalText[i]){
       spans[i].classList.add("Correct");
     }
     else{
       spans[i].classList.add("wrong");
     }
  }
  
  
});

//validate typing on submit

function validate(){
  clearInterval(intervalId);
  intervalId=null;
  
  let typed=textareaEl.value.trim();
  let Correct=0;
  
  for (let i=0; i<typed.length;i++){
    if (typed[i] === originalText[i]){
      Correct++
    }
  }
  
  //calculate Accuracy  %
  let accuracy = typed.length > 0 ? Math.round((correct / typed.length) *100) : 0;
  
  //calculate wpm (words per minute)
  
  let words=typed.split(/\s+/).length;
  let minutes = countdown /60;
  let wpm= minutes > 0 ? Math.round(words/minutes):0;
  
  // Final result message
  
  if (typed === originalText){
    resultEl.textContent= 
    resultEl.textContent = `✅ Correct! Speed: ${wpm} WPM | Accuracy: ${accuracy}%`;
    resultEl.style.color="green";
  }else{
     resultEl.textContent = `❌ Try Again | Speed: ${wpm} WPM | Accuracy: ${accuracy}%`;
     resultEl.style.color="red";
  }
}

submitEl.addEventListener("click",validate)

//reset functionality

resetEl.addEventListener("click",function(){
  clearInterval(intervalId); //stop timer
  intervalId= null;
  countdown=0;
  timeEl.textContent="0 seconds";
  textareaEl.value="";
  resultEl.textContent="";
  renderText(); //reset text colors
});















