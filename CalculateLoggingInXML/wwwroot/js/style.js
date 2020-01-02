$(document).ready(function () {
    var oneBtn = document.querySelector(".one");
    var twoBtn = document.querySelector(".two");
    var threeBtn = document.querySelector(".three");
    var fourBtn = document.querySelector(".four");
    var fiveBtn = document.querySelector(".five");
    var sixBtn = document.querySelector(".six");
    var sevenBtn = document.querySelector(".seven");
    var eightBtn = document.querySelector(".eight");
    var nineBtn = document.querySelector(".nine");
    var zeroBtn = document.querySelector(".zero");
    var pointBtn = document.querySelector(".point");
    var clearBtn = document.querySelector(".clear");
    var backspacelBtn = document.querySelector(".backspace");
    var display = document.querySelector("#calc-dispaly-val");

    var calcNumBtns = document.getElementsByClassName("isnum");
    var processes = document.getElementsByClassName("process");
    // console.log(calcNumBtns);
    // console.log(processes);
    dispalyval = '0';
    var penddingVal;
    var evalStringArray = [];
    var stringobject = [];

    var updatedisplay = (clikObj) => {
        var btnText = clikObj.target.innerText;
        if (dispalyval === '0')
            dispalyval = '';
        dispalyval += btnText;

        $("#calc-dispaly-val").val(dispalyval);
    }

    var getprocess = (clikObj) => {
        var operator = clikObj.target.innerText;
        switch (operator) {
            case '+':
                penddingVal = dispalyval;
                dispalyval = '0';
                $("#calc-dispaly-val").val(dispalyval);
                evalStringArray.push(penddingVal);
                evalStringArray.push('+');
                break;
            case '-':
                penddingVal = dispalyval;
                dispalyval = '0';
                $("#calc-dispaly-val").val(dispalyval);
                evalStringArray.push(penddingVal);
                evalStringArray.push('-');
                break;
            case '*':
                penddingVal = dispalyval;
                dispalyval = '0';
                $("#calc-dispaly-val").val(dispalyval);
                evalStringArray.push(penddingVal);
                evalStringArray.push('*');
                break;
            case '/':
                penddingVal = dispalyval;
                dispalyval = '0';
                $("#calc-dispaly-val").val(dispalyval);
                evalStringArray.push(penddingVal);
                evalStringArray.push('/');
                break;
            case '%':
                penddingVal = dispalyval;
                dispalyval = '0';
                $("#calc-dispaly-val").val(dispalyval);
                evalStringArray.push(penddingVal);
                evalStringArray.push('/');
                evalStringArray.push("100");
                evalStringArray.push('*')
                break;
            default:
                break;
        }
    }

    for (let i = 0; i < calcNumBtns.length; i++) {
        calcNumBtns[i].addEventListener('click', updatedisplay, false);
    }

    for (let i = 0; i < processes.length; i++) {
        processes[i].addEventListener('click', getprocess, false);
    }
 
    $("#equal").on("click", function () {
    
        evalStringArray.push(dispalyval);
       

        for (var i = 0; i < evalStringArray.length; i++) {
            stringobject.push(evalStringArray[i])
        }
        var evalution = eval(evalStringArray.join(' '));
        dispalyval = evalution + '';

        stringobject.push('=');
        stringobject.push(dispalyval);
        $("#calc-dispaly-val").val(dispalyval);
        evalStringArray = [];
        var value = stringobject.toString();
        
        

        $.ajax({
            url: "/calculate/compile?str=" + value,
            type: "GET",
            success: function (res) {
                console.log(res);
            }
        });
         stringobject = [];
    });

    $("#clear").on("click", function () {
        dispalyval = '0';
        penddingVal = undefined;
        evalStringArray = [];
        $("#calc-dispaly-val").val(dispalyval);
    });

    $("#backspace").on("click", function () {
        let dispalyvalLength = dispalyval.length;
        dispalyval = dispalyval.slice(0, dispalyvalLength - 1);
        $("#calc-dispaly-val").val(dispalyval);

        if (dispalyval === '') {
            dispalyval = '0';
            $("#calc-dispaly-val").val(dispalyval);
        }
    });

    $("#point").on("click", function () {
        dispalyval = $("#calc-dispaly-val").val();
        var pos = dispalyval.indexOf('.');
        let dispalyvalLength = dispalyval.length;
        if (pos == -1 && dispalyvalLength > 0) {
            dispalyval = dispalyval + '.';
            $("#calc-dispaly-val").val(dispalyval);
        }
    });

    $("#pilmin").on("click", function () {
        dispalyval = $("#calc-dispaly-val").val();
        let dispalyvalLength = dispalyval.length;
        var pos = dispalyval.indexOf('-');
        if (pos == -1) {
            dispalyval = '-' + dispalyval;
        }
        else {
            dispalyval = dispalyval.slice(1, dispalyvalLength);
        }
        $("#calc-dispaly-val").val(dispalyval);
    });



})
