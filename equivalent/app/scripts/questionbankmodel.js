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
	if (this.answers[i].toString() == studentAnswer.toString()) {
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
	questionText = "Are the following two blocks of code equivalent?"
	codeBlock = this.selectBlock();
    this.questions = [[questionText, codeBlock[0]]];
    // the question index is used to rotate through the questions
    this.questionIndex = 0;
    this.blockIndex = codeBlock[1];
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
    this.questionIndex = 0; //getRandomInt(this.get('firstQuestion'), this.get('lastQuestion') + 1);
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
		}else{
			for(i = 0; i < templateString.length; i++){
				this.question = this.question + templateString[i] + "<br/>";
			}
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

	this.answers = [];
	console.log("Index");
	console.log(this.blockIndex);
	if (this.blockIndex % 2 == 0) {
		this.answers.push("Yes, these two blocks of code are equivalent.");
		console.log("Yes");
	}else{
		console.log("No");
		this.answers.push("No, these two blocks of code are NOT equivalent.");
	}
}

QuestionBankModel.prototype.selectBlock = function() {
	char1 = getRandomChar(['a', 'b','c']);
	char2 = getRandomChar(['x', 'y', 'z']);
	char3 = getRandomChar(['g', 'h', 'i']);
	char4 = getRandomChar(['k', 'l', 'm']);
	char5 = getRandomChar(['o', 'p', 'q']);
	char6 = getRandomChar(['e', 'r', 's']);
	block = '';
	tab = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	funS = 'fun ';
	valS = 'val ';
	equal = ' = ';
	equalP = ' = (';
	space = ' ';
	andconcat = '<br/>' + tab + 'and<br/>';
	
	int1 = getRandomInt(1,10);
	int2 = getRandomInt(11, 20);
	blockIndex = getRandomInt(0, 10);
	operation1 = getRandomOperation();
	if(blockIndex == 0){
		val = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;val '.concat(char1).concat(' = ').concat(int1);
		funf = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fun f '.concat(char2).concat(' = ').concat(char2).concat(operation1).concat(char1).concat(operation1).concat(char2).concat('<br/>');
		val2 = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;val '.concat(char1).concat(' = ').concat(int1);
		funf2 = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fun f '.concat(char3).concat(' = ').concat(char3).concat(operation1).concat(char1).concat(operation1).concat(char3);
		block = [val,funf , '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and<br/>', val2 ,  funf2];
	}else if(blockIndex == 2){
		val = tab + valS  + char1 + ' = ' + int1;
		funf = tab + funS + char4 + ' ' + char2 + ' = (' + char2 + operation1 + char1 + operation1 + char2 + ')' + operation1 + char1; 
		val2 = tab + valS + char1 +  ' = ' + int1;
		funf2 = tab + funS + char5 + space + char3 + equal + char3 + operation1 + char1 + operation1 + char3;
		funf3 = tab + funS + char4 + space + char2 + equalP + char5 + space + char2 + ')' + operation1 + char1;
		block = [val, funf, andconcat , val2, funf2, funf3];
	}else if (blockIndex == 4){
		funf = tab + funS + char2 + space + char1 + equal;
		if1 = tab + tab + 'if ' + char1;
		then1 = tab + tab + 'then ' + char3 + space + char1;
		else1 = tab + tab + 'else false';
		
		funf2 = tab + funS + char2 + space + char1 + equal;
		if2 = tab + tab + char1 + ' andalso ' + char3 + space + char1;
		block = [funf, if1, then1, else1, andconcat, funf2, if2]	
	}else if (blockIndex == 6 || blockIndex == 8){
		funf = tab + funS + char2 + space + char1;
		if1 = tab + tab + 'if ' + char1;
		then1 = tab + tab + 'then true';
		else1 = tab + tab + 'else ' + char3 + space + char1;
		
		funf2 = tab + funS + char2 + space + char1 + equal 
		if2 = tab + tab + char1 + ' orelse ' + char3 + space + char1
		block = [funf, if1, then1, else1, andconcat, funf2, if2];
	}else if(blockIndex == 1) {
		val = tab + valS + char1 + equal + int1
		val2 = tab + valS + char1 + equal + int2;
		funf = tab + char3 + space + char2 + equalP + char2 + operation1 + char1 + operation1 + char2 + ')' + operation1 + char2
		
		funf2 = tab	+ funS + char4 + space + char5 + equal + char5 + operation1 + char1 + operation1 + char5;
		funf3 = tab + funS + char3 + space + char2 + equalP + char4 + space + char2  +')' + operation1 + char2
		
		block = [val, val2,  funf, andconcat, val, funf2, val2, funf3]
	}else if(blockIndex == 3){
		val = tab + valS+ char1 + equal + int1
		funf1 = tab + funS + char2 + space + char3 + equal + char3+ operation1 + char1 + operation1 + char3
		funf2 = tab + funS + char2 + space + char1 + equal + char1 + operation1 + char1 + operation1 + char1
		
		block = [val, funf1, andconcat,  val, funf2]
	}else if (blockIndex == 5){
		val = tab + valS +  char1 + equal + int1
		val2 = tab + valS + char1 + equal + int2
		funf = tab + funS + char2 + space + char3 + equalP + char3 + operation1 + char1 + operation1 + char3 + ')' + operation1 + char3
		funf2 = tab + funS + char4 + space + char5 + equal + char5 + operation1 + char1 + operation1 + char5 
		funf3 = tab + funS + char2 + space + char3 + equalP + char4 + space + char3 + ')' + operation1 + char3
		block = [val, val2, funf, andconcat, val, funf2, val2, funf3]
		
	}else if(blockIndex == 7){
		funf = tab + funS + char2 + space + char1 + equal
		if1 = tab + tab + 'if ' + char1
		then1 = tab + tab + 'then ' + char3 + space + char1
		else1 = tab + tab + 'else false'
		
		funf2 = tab + funS + char2 + space + char1 + equal 
		if2 = tab + tab + char1 + ' orelse ' + char3 + space + char1
		block = [funf, if1, then1 , else1, andconcat, funf2, if2]
	}else if(blockIndex == 9){
		funf = tab + funS + char2 + space + char1 + equal
		if1 = tab + tab + 'if ' + char1
		then1 = tab + tab + 'then true' 
		else1 = tab + tab + 'else ' + char3 + space + char1
		
		funf2 = tab + funS + char2 + space + char1 + equal 
		if2 = tab + tab + char1 + ' andalso  ' + char3 + space + char1
		block = [funf, if1, then1 , else1, andconcat, funf2, if2]
	}
	console.log(blockIndex);
	return [block, blockIndex];
	
}



    

