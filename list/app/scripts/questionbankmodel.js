/*
 * Stores the questions, answers and the answer history
 */

function QuestionBankModel(_simModel, _numerator, _denominator) {
	// save a link to the model
	this.simModel = _simModel;
	// the number of questions the student needs to answer right...
	this.numerator = _numerator;
	// out of this many of the most recent questions asked
	this.denominator = _denominator;
	// we need to keep track of the last <x> answers we've gotten
	// so we can test for mastery. we use an array as a queue that
	// stores as many answers as we're willing to consider
	this.resetAnswerHistory();
	// create the question list
	this.createNewQuestions();
}


QuestionBankModel.prototype.resetAnswerHistory = function() {
	// start with an empty array
	this.answerHistory = [];
	// push a bunch of null objects into the history to represent questions
	// that haven't been asked yet
	for (var i = 0; i < this.denominator; i++) {
		this.answerHistory.push(null);
	}
}


/*
 * Add a new item to the back of the answer history, pull an item off
 * the front. Since the queue starts out filled with nulls, it is always
 * the same size.
 */
QuestionBankModel.prototype.updateAnswerHistory = function(newAnswer) {
	// add a new item to the back of the answer history
	this.answerHistory.push(newAnswer);
	// pull the oldest item off the front
	this.answerHistory.shift();
}


/*
 * Look at the answer history to see if we have met the criterion for
 * demonstrating mastery
 */
QuestionBankModel.prototype.masteryAchieved = function() {
	// count up the number of right answers
	var count = 0;
	// loop through the answer history
	for (var i = 0; i < this.answerHistory.length; i++) {
		// if we got the question right
		if (this.answerHistory[i]) {
			// increase our count
			count += 1;
		}
	}
	// compare the correct count to our goal
	return count >= this.numerator;
}


/*
 * Compare the student's answer to the correct answer(s).
 */
QuestionBankModel.prototype.checkAnswer = function (studentAnswer) {
    console.log(studentAnswer.replace(/ /g, ""))
    console.log(this.answers[0])
    for (var i = 0; i < this.answers.length; i++) {
	if (this.answers[i].toString().toLowerCase().replace(/ /g, "") == studentAnswer.toString().toLowerCase().replace(/ /g, "")) {
	    return true;
	}
    }
    return false;
}





/*
 * Create a new set of question templateString
 */
QuestionBankModel.prototype.createNewQuestions = function() {
    listSize = getRandomInt(5,10);
    list = this.createList(listSize);
    listCommands = this.createCommands(listSize);

    this.questions = [["Given:", " xs = ", list, "what is the value of ", listCommands]];
    // the question index is used to rotate through the questions
    this.questionIndex = 0;
    // the answer(s) is/are stored in an array
    this.answers = [];
    // the actual question is stored in a string
    this.question = '';
}


/*
 * choose a random template and useit to construct a new question string
 */
QuestionBankModel.prototype.chooseQuestion = function(_firstQuestion, _lastQuestion) {
    // choose a question index at random
    this.questionIndex = 0;//getRandomInt(this.get('firstQuestion'), this.get('lastQuestion') + 1);
    // get the corresponding question template
    var questionTemplate = this.questions[this.questionIndex];
    // start with an empty question string
    this.question = "";
    // loop through every line of the template
    for (index = 0; index < questionTemplate.length; index++) {
	// get the next line of the template
	var templateString = questionTemplate[index];
	// add it to the question string

	if(index === 0 ){
	    this.question = this.question + templateString + "<br/>";
	}else if(index === 1 || index === 3){
	    this.question = this.question + templateString
	}else if(index === 2){
	    this.question = this.question + '[' + templateString[0] ;
	    for(var i = 1; i < templateString.length; i++){
		this.question = this.question + ', ' + templateString[i];
	    }
	    this.question = this.question + ']' + "<br />";
	}else{	console.log(templateString)
		
	    var commandsString = templateString[templateString.length - 1] + " xs" ;
	    for(var i = templateString.length - 2 ; i >= 0; i--){
		commandsString = templateString[i] + '(' + commandsString  + ')';
	    }
	    this.question = this.question + commandsString
	    
	}
	
    }
    console.log(this.question)
    return this.question
}

/*
 * Set the answer(s) to the question indicated by questionIndex.
 * Right now I'm using a really clunky approach. I'm sure there's
 * a better way.
 */
QuestionBankModel.prototype.setAnswers = function() {
	// Reset answers array
	this.answers = [];
	// depth-first search - last node added
	if (this.questionIndex == 0) {
		this.answers.push(this.commandsSolution());
	// breadth-first search - first node added
	} else if (this.questionIndex == 1) {
		this.answers.push(0);
	// uniform cost search - nodes with lowest cost
	} else if (this.questionIndex == 2) {
		this.answers = _fringe.lowestCost().slice();
	// greedy search - nodes with lowest heuristic value
	} else if (this.questionIndex == 3) {
		this.answers = _fringe.lowestHeuristic().slice();
	} else {
		this.answers = _fringe.lowestGScore().slice();
	}
}

QuestionBankModel.prototype.commandsSolution = function() {
	// create empty array to store list
	var nodeList = [];
	console.log(list.toString())
	// loop through the nodes array
    for	(var index = listCommands.length - 1; index >=0 ; index--) {
	if(listCommands[index] === "hd"){
			return list[0]
	}else{
	    list.splice(0, 1)
	    nodeList = list
	}
    }
    // return list of nodes
    return "[" + nodeList + "]";
}

QuestionBankModel.prototype.createCommands = function(listSize){
    var size = getRandomInt(1, listSize);
    var list = [];
    var headBool = getRandomInt(0,2)
    console.log("Head:")
    console.log(headBool)
    if(headBool === 1){
		list.push("hd");
    }else{
		list.push("tl");
    }
    for(var i = 1; i < size ; i++){
	    list.push("tl");
    }
    return list;
}

QuestionBankModel.prototype.createList = function(listSize){
    var list = [];
    for(var i = 0; i < listSize; i++){
	list.push(getRandomInt(0,100));
    }
    return list;
}
    

