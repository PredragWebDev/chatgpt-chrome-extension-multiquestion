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
    var str_answer = "";
    var n_totalquestions = 0;
    var str_questionlist = localStorage.getItem("questionlist");

    if(str_questionlist == null) {
        str_questionlist = "";
    }

    document.getElementById("runORstop").innerText = "  Running...";

    /////////////// number of total questions///////////////////////////

    while(localStorage.getItem(n_totalquestions.toString(10)) != null) {
        n_totalquestions++;
    }

    ////////////////-----start-----//////////////////////////////////////

    while(localStorage.getItem(n_count.toString(10)) != null) {
        
        str_question = localStorage.getItem(n_count.toString(10));
        
        ///////////--------get answer from chatgpt-----------////////////

        str_answer = "answer";

        /////////////add the answer to local storage/////////////////////
        
        str_questionlist += str_question + ",";

        localStorage.setItem("questionlist", str_questionlist);

        localStorage.setItem(str_question, str_answer);

        n_count++;

        document.getElementById("anANDqu").innerText = n_count.toString(10) + "/" + n_totalquestions.toString(10) + " answers saved. ";


        ///////////////////////stop/////////////////////////////////////

        if(flagForStop == true){
            localStorageModify_func(n_count);

            document.getElementById("runORstop").innerText = "   Stoped";
            break;
        }

    }

    localStorageModify_func(n_count);
    document.getElementById("runORstop").innerText = "  End";

    location.href = "../HTML/MainWindow.html";
    
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
