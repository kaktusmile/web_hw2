/*
AUTHOR   : rakesh535
URL      : http://themeforest.net/user/rakesh535
TEMPLATE : Spirit 404 - Animated 404 Error Page
VERSION  : 1.0

TABLE OF CONTENTS
1.0 Spirit Bubbles Formation
3.0 document.ready FUNCTION
	2.1 activate wow js
	2.2 activate wordsrotator
*/
    var count=0;
    var score=0;
    var correctAns;
    function get_question()
    {
        var a="";
        if(difficulty.value=='easy')
        {
			a="&difficulty=easy";
		}
        if(difficulty.value=='normal' || score>=5) //after 5 question increase difucalty
        {
            difficulty.value='normal';
			a="&difficulty=medium";
		}
        if(difficulty.value=='hard' || score >=10)//after 5 more quest. increase diffecaulty again
        {
			a="&difficulty=hard";
		}
        var b="";
        if(gameType.value=='mul'){
            b="&type=multiple";
        }
        if(gameType.value=='tr/fa'){
            b="&type=boolean";
        }
        var c="";
        switch (category.value){
            case "0":
                c="&category=9"
                break;
            case "1":
                c="&category=10"
                break;
            case "2":
                c="&category=11"
                break;
            case "3":
                c="&category=12"
                break;
            case "4":
                c="&category=13"
                break;
            case "5":
                c="&category=14"
                break;
            case "6":
                c="&category=15"
                break;
            case "7":
                c="&category=16"
                break;
            case "8":
                c="&category=17"
                break;
            case "9":
                c="&category=18"
                break;
            case "10":
                c="&category=19"
                break;
            case "11":
                c="&category=20"
                break;
            case "12":
                c="&category=21"
                break;
            case "13":
                c="&category=22"
                break;
            case "14":
                c="&category=23"
                break;
            case "15":
                c="&category=24"
                break;
            case "16":
                c="&category=25"
                break;
            case "17":
                c="&category=26"
                break;
            case "18":
                c="&category=27"
                break;
            case "19":
                c="&category=28"
                break;
            case "20":
                c="&category=29"
                break;
            case "21":
                c="&category=30"
                break;
            case "22":
                c="&category=31"
                break;
            case "23":
                c="&category=32"
                break;
        }
        $.ajax({
            url: "https://opentdb.com/api.php?amount=1"+c+a+b,
            type: "GET",
            success: function(data)
            {
                var question = data.results[0].question;
                    question = question.replace(/&quot;/g, '\"');
                     question = question.replace(/&#039;/g, '\'');
                $("#question").text(question);
             

                if(data.results[0].type=="boolean"){
                    $("#one").removeClass("hidden");
                    $("#two").removeClass("hidden");
                    correctAns=data.results[0].correct_answer;
                    document.getElementById("one").textContent= "True";
                    document.getElementById("two").textContent= "False";
                    $("#three").addClass("hidden");
                    $("#four").addClass("hidden");
                }
                else{
                    $("#one").removeClass("hidden");
                    $("#two").removeClass("hidden");
                    $("#three").removeClass("hidden");
                    $("#four").removeClass("hidden");
                    var a=[];
                    correctAns=data.results[0].correct_answer;
                    a[0]= data.results[0].correct_answer;
                    a[1]= data.results[0].incorrect_answers[0];
                    a[2]= data.results[0].incorrect_answers[1];
                    a[3]= data.results[0].incorrect_answers[2];
                    a.sort(function(){
                       return .4-Math.random(); 
                    });
                    document.getElementById("one").textContent= a[0];
                    document.getElementById("two").textContent= a[1];
                    document.getElementById("three").textContent= a[2];
                    document.getElementById("four").textContent= a[3];
                }
            },
            error: function(err)
            {
                alert(err);
            }
        });
	}
    function update(obj)
    {

        if(obj==correctAns)
        {
            score++;//we got a correct answer
        }
       
        count++;//increase total question count 
        $("#score").html("Score: "+score+ " from "+count);//print the score
        get_question();//next question
       
    }







(function ($) {
	"use strict";

	/*-- ================================ --
			1.0 Spirit Bubbles Formation
	/*-- ================================ --*/
	var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

	// Main
	initHeader();
	addListeners();

	function initHeader() {
		width = window.innerWidth;
		height = window.innerHeight;
		target = {
			x: 0,
			y: height
		};

		largeHeader = document.getElementById('wrapper-large');
		largeHeader.style.height = height + 'px';

		canvas = document.getElementById('canvas');
		canvas.width = width;
		canvas.height = height;
		ctx = canvas.getContext('2d');

		// create particles
		circles = [];
		for (var x = 0; x < width * 0.5; x++) {
			var c = new Circle();
			circles.push(c);
		}
		animate();
	}

	// Event handling
	function addListeners() {
		window.addEventListener('scroll', scrollCheck);
		window.addEventListener('resize', resize);
	}

	function scrollCheck() {
		if (document.body.scrollTop > height) animateHeader = false;
		else animateHeader = true;
	}

	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		largeHeader.style.height = height + 'px';
		canvas.width = width;
		canvas.height = height;
	}

	function animate() {
		if (animateHeader) {
			ctx.clearRect(0, 0, width, height);
			for (var i in circles) {
				circles[i].draw();
			}
		}
		requestAnimationFrame(animate);
	}

	// Canvas manipulation
	function Circle() {
		var _this = this;

		// constructor
		(function () {
			_this.pos = {};
			init();
			console.log(_this);
		})();

		function init() {
			_this.pos.x = Math.random() * width;
			_this.pos.y = height + Math.random() * 100;
			_this.alpha = 0.1 + Math.random() * 0.3;
			_this.scale = 0.1 + Math.random() * 0.3;
			_this.velocity = Math.random();
		}

		this.draw = function () {
			if (_this.alpha <= 0) {
				init();
			}
			_this.pos.y -= _this.velocity;
			_this.alpha -= 0.0005;
			ctx.beginPath();
			ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
			ctx.fill();
		};
	}
	//-- end Spirit Bubbles Formation

	/*-- ================================ --
			2.0 document.ready FUNCTION
	/*-- ================================ --*/
	$(document).ready(function () {
		//-- 2.1 activate wow js
		new WOW().init();

		//-- 2.2 activate wordsrotator
		$("#sub-title").wordsrotator({
			autoLoop: true, //auto rotate words
			randomize: false, //show random entries from the words array
			stopOnHover: false, //stop animation on hover
			changeOnClick: false, //force animation run on click
			animationIn: "flipInY", //css class for entrace animation
			animationOut: "flipOutY", //css class for exit animation
			speed: 3000, //delay in milliseconds between two words
			words: ['<span class=red>OOPS</span>, something went wrong', 'Please try again!'] //Array of words, it may contain HTML values
		});

	});
	//-- end document.ready function
})(jQuery);