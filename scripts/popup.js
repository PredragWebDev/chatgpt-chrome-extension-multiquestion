var flagForStop = false;

document.addEventListener("DOMContentLoaded", function() {
    var settingButton = document.getElementById("settingbtn");

    try{
        settingButton.addEventListener("click", function() {
            setting_func();
        });
    } catch(e) {
        console.log(e);
    }

});

document.addEventListener("DOMContentLoaded", function() {
    var startButton = document.getElementById("startbtn");

    try{
        startButton.addEventListener("click", function() {
            flagForStop = false;
            sendQuestion_func();
        })
    } catch(e) {
        console.log(e);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var stopButton = document.getElementById("stopbtn");

    try {
        stopButton.addEventListener("click", function() {
            flagForStop = true;
        })
    } catch(e) {
        console.log(e);
    }
})

function setting_func() {

    chrome.tabs.create({ url: "../HTML/MainWindow.html" });
   
}

function sendQuestion_func() {

    // localStorage.clear();
    
    var n_count = 0;
    var str_question = "";
    var n_totalquestions = 0;
    var n_curquestions = 0;

    document.getElementById("runORstop").innerText = "  Running...";

    /////////////// number of total questions///////////////////////////

    while(localStorage.getItem(n_totalquestions.toString(10)) != null) {
        n_totalquestions++;
    }

    // get number of current questions

    while(localStorage.getItem(n_count.toString(10)) != null) {
        n_count ++;
    }

    n_curquestions = n_count;

    if(n_curquestions == 0) {
        alert("No questions. Please input the questions.");
        document.getElementById("runORstop").innerText = "The end";
        return;
    }

    n_count = 0;

    ////////////////-----start-----//////////////////////////////////////

    for(n_count = 0 ; n_count < n_curquestions ; n_count ++) {
        
        str_question = localStorage.getItem(n_count.toString(10));
        
        ///////////--------get answer from chatgpt-----------////////////

        get_answer_from_chatgpt_func(str_question, n_count, n_curquestions, n_totalquestions);

        
        ///////////////////////stop/////////////////////////////////////

        if(flagForStop == true){
            localStorageModify_func(n_count);

            document.getElementById("runORstop").innerText = "   Stoped";
            break;
        }

    }
    
}

function handleAnswer(str_question, str_answer) {
    var str_questionlist = localStorage.getItem("questionlist");

    if(str_questionlist == null) {
        str_questionlist = "";
    }

    /////////////add the answer to local storage/////////////////////
        
    str_questionlist += str_question + ",";

    localStorage.setItem("questionlist", str_questionlist);

    localStorage.setItem(str_question, str_answer);
    
}

function handleError(str_question, error) {
    alert(error);
}

function localStorageModify_func(index) {
    var index0 = 0;

    while(localStorage.getItem(index.toString(10)) != null) {
        localStorage.setItem(index0.toString(10), localStorage.getItem(index.toString));
        index ++;
        index0 ++;
    }

    for(; index0 < index; index0 ++) {
        localStorage.removeItem(index0.toString(10));
    }
}

async function get_answer_from_chatgpt_func(question, n_count, n_curquestions, n_totalquestions) {

    const apiKey = "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";

    const url = "https://api.openai.com/v1/completions";
    var bodyData = {
      "model": "text-davinci-003",
      "max_tokens": 800,
      "temperature": 0.5,
      "prompt": question
    };

    // remove stream from bodyData
    var str_bodyData = JSON.stringify(bodyData);
  
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: str_bodyData
    })
    .then((response) => response.body)
    .then((body) => {
      const reader = body.getReader();

        reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {return;}
            // Enqueue the next data chunk into our target stream
            var stream = new TextDecoder().decode(value);//.substring(6);
            var returnAnswer = JSON.parse(stream).choices[0].text;

            returnAnswer = returnAnswer.replace("\n\n", "");

            handleAnswer(question, returnAnswer);

            document.getElementById("anANDqu").innerText = (n_count + 1).toString(10) + "/" + n_totalquestions.toString(10) + " answers saved. ";
            localStorageModify_func(n_count);
        
            if((n_count + 1)== n_curquestions) {
                document.getElementById("runORstop").innerText = "The  End";
            }
            console.log(string, typeof string);
        });
      }
    ).catch(err => {
      console.log("error" + err);
    });

}