const promise = fetch('q.json').then(res => res.json()).then((data) => {
    main(data);
}).catch(err => { throw err });
//variables
var rightAnswers = 0;
var sec = 59;
var arr = [];
var timerOut = 0;
var timerId = 0;
var count=0;
for (let k = 0; k < 4; k++) {
    document.getElementById('an' + k).addEventListener('click', function () {
        console.log("next question");
        console.log(count);
        var isTrue = this.dataset.isTrue;
        console.log(this.dataset.isTrue);
        count++;
        if(count==arr.length){
            //debugger;
            console.log("end game");       
            document.body.innerHTML="<div>YOU LOSE</div>";
        }
        if (isTrue == 'true') {
            rightAnswers++;
            console.log(rightAnswers); 
            oneQuestion(arr[count]);
            //return true;
        }
        if (isTrue == 'false') {
            console.log("false");
            oneQuestion(arr[count]);
            //return false;
        }
        /*  this.dataset.isClicked = "clicked";
          console.log(this.dataset.isClicked);*/
    });
}
//}
//main
function main(data) {
    buildRanArr(data);
    console.log(arr);
    oneQuestion(arr[count]);
    console.log(count);
}
//functions
function buildRanArr(d) {
    for (let i = 0; i < d.length; i++) {
        arr[i] = d[i];
    }
    arr = arr.sort(function () {
        return 0.5 - Math.random();// need more explane
    });
}

function oneQuestion(qw) {
    for (let pr in qw) {
        if (pr == "q") {
            question.value = qw[pr];
        }
        else {
            let ans = qw[pr];
            for (let j = 0; j < 4; j++) {
                let sertAn = ans[j];
                var a = document.getElementById('an' + j);
                a.value = sertAn["aText"];
                a.dataset.isTrue = sertAn["isTrue"];
            }
        }
    }
    sec=59;
    myL.innerText = "(" + (sec--) + ")";
}
timerId = setInterval(check, 1 * 1000);
function check() {
    myL.innerText = "(" + (sec--) + ")";
    if (sec == 0) {
        newOne();
        console.log("you lose");
        clearInterval(timerId);
        count++;
        if(count==arr.length){
            console.log("end game");
            document.innerHtml="<div>YOU LOSE</div>";
        }
        oneQuestion(arr[count]);
    }
}