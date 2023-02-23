document.addEventListener("DOMContentLoaded", function() {
    var update = document.getElementById("updatebtn");

    try{
        update.addEventListener("click", function() {
            update_func();
        });
    } catch(e) {
        console.log(e);
    }

});

document.addEventListener("DOMContentLoaded", function() {
    var questionArea = document.getElementById("question");

    try{
        questionArea.addEventListener("input", function() {
            onchangeQuestionArea_func();
        });
    } catch(e) {
        console.log(e);
    }

});

function update_func() {
    var obj = document.getElementById("question");
    questions = obj.value.split("\n\n");

    if(questions.length == 1 && questions[0] == "") return;

    var localdatacount = 0;

    while(localStorage.getItem(localdatacount.toString(10)) != null){
        
        localdatacount++;
    }

    questions.forEach(question => {
        
        if(question != null || question != ""){
            if(localStorage.getItem(localdatacount.toString(10)) == null){
                localStorage.setItem(localdatacount.toString(10), question);
                localdatacount++;
            }
        }

    });

    alert(localdatacount.toString(10) + " questions hvae just updated successfuly!");

}

window.onload = function() {
    
    // load questions user input

    document.getElementById("question").value = "";

    var n_count = 0;

    while(localStorage.getItem(n_count.toString(10)) != null && localStorage.getItem(n_count.toString(10)) != "") {
        document.getElementById("question").value += localStorage.getItem(n_count.toString(10)) + "\n\n";
        n_count ++;
    }

    // load answers and questions
    var str_questionlist = localStorage.getItem("questionlist");
    if(str_questionlist != null && str_questionlist != "")  str_questionlist = str_questionlist.split(",");
    
    var str_answer = "";
    var str_answerAndquestion = "";

    if (str_questionlist != null && str_questionlist) {
        str_questionlist.forEach(question => {

            if(question != "") {
                str_answer = localStorage.getItem(question);
    
                str_answerAndquestion += question + "\n\n" + str_answer + "\n\n------------------------------------\n\n";
    
                document.getElementById("answer").value = str_answerAndquestion;
            }
            
        });
        
    }

};

function onchangeQuestionArea_func() {
    
    var questions = document.getElementById("question").value.split("\n\n");

    if(questions.length > 1) {
        if(questions[questions.length-1] != "")
            document.getElementById("numofquestion").innerText = questions.length.toString(10) + " Questions";

    } else {
        
        document.getElementById("numofquestion").innerText = questions.length.toString(10) + " Question";
    }
}

