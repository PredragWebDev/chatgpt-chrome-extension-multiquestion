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

        var localdatalength = 0;
  
        while(localStorage.getItem(localdatalength.toString(10)) != null){
            
            localdatalength++;
        }

        questions.forEach(question => {
         
            if(question != null){
                if(localStorage.getItem(localdatalength.toString(10)) == null){
                    localStorage.setItem(localdatalength.toString(10), question);
                    localdatalength++;
                }
            }
            

        });

        alert("The end questions updating!");
    
    }

    window.onload = function() {
        
        document.getElementById("question").value = "";

        var str_questionlist = localStorage.getItem("questionlist").split(",");
        var str_answer = "";
        var str_answerAndquestion = "";
        var str_question = "";
         var n_count = 0;

        // alert(localStorage.getItem("who are you?"));

        str_questionlist.forEach(question => {

            

            if(question != "") {
                str_answer = localStorage.getItem(question);

                str_answerAndquestion += question + "\n\n" + str_answer + "\n\n------------------------------------\n\n";

                document.getElementById("answer").value = str_answerAndquestion;
            }
            
        });
        
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
