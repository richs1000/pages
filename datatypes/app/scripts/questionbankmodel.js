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
	//this.createNewQuestions();
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
    //console.log(studentAnswer.replace(/ /g, ""))
    //console.log(this.answers[0])
    for (var i = 0; i < this.answers.length; i++) {
	if (this.answers[i].toString().toLowerCase() == studentAnswer.toString().toLowerCase()) {
	    return true;
	}
    }
    return false;
}


/*
 * Create a new set of question templateString
 */
QuestionBankModel.prototype.createNewQuestions = function(_datatype) {
	argumentsNumber = 2 //getRandomInt(2,6)
	selected = String.fromCharCode(getRandomInt(0,5) + 102)
	list = _datatype.createDataList(argumentsNumber);
    this.questions = [["What is the result of evaluation this ML expression:", selected , list]];
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
    letter = 102;
    var valueString = ""
    // loop through every line of the template
    for (index = 0; index < questionTemplate.length; index++) {
		// get the next line of the template
		var template = questionTemplate[index];
		//console.log(template)
		// add it to the question string

		if(index == 0 ){
		    this.question = this.question + template+ "<br/>";
		}else if(index == 1){
			this.question = this.question + "#" + template + " {"
		}else{	
		    for(var i = 0; i < template.length - 1; i++){
				valueString = valueString + String.fromCharCode(letter + i) + "=" + template[i] + ", ";
		    }
		    console.log(i)
		    this.question = this.question + valueString + String.fromCharCode(letter + template.length-1) + "=" + template[template.length-1] + "}"
		    
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
QuestionBankModel.prototype.setAnswers = function(_datatype) {
	// Reset answers array
	this.answers = [];

	if(this.questionIndex == 0)
		this.answers.push(_datatype.expressionEvaluation(selected, list))



}
    

