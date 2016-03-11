function QuestionBankView(_simView) {
	// keep a link to the view
	this.simView = _simView;
}


QuestionBankView.prototype.presentQuestion = function(_question) {
	// display the new question
    $( "#lblQuestion" ).html(_question);
    console.log(_question)
}

QuestionBankView.prototype.drawAnswer = function(){
	$('#groupAnswer').empty();
	
	var label= document.createElement("label");
	var description = document.createTextNode("Yes, these two blocks of code are equivalent.");
	var checkbox = document.createElement("input");

	checkbox.type = "radio"
	//checkbox.type = "checkbox";    // make the element a checkbox
	checkbox.name = "slct1[]";      // give it a name we can check on the server side
	checkbox.value = "Yes, these two blocks of code are equivalent.";         // make its value "pair"

	label.appendChild(checkbox);   // add the box to the element
	label.appendChild(description);// add the description to the element
		//console.log()

		// add the label element to your div
	document.getElementById('groupAnswer').appendChild(label)
	document.getElementById('groupAnswer').appendChild(document.createElement("br"))
	
		var label= document.createElement("label");
	var description = document.createTextNode("No, these two blocks of code are NOT equivalent.");
	var checkbox = document.createElement("input");

	checkbox.type = "radio"
		//checkbox.type = "checkbox";    // make the element a checkbox
	checkbox.name = "slct1[]";      // give it a name we can check on the server side
	checkbox.value = "No, these two blocks of code are NOT equivalent.";         // make its value "pair"

	label.appendChild(checkbox);   // add the box to the element
	label.appendChild(description);// add the description to the element
		//console.log()

		// add the label element to your div
	document.getElementById('groupAnswer').appendChild(label)
	document.getElementById('groupAnswer').appendChild(document.createElement("br"))
}


/*
 * draw squares for each answer we'll consider - for example,
 * if we want 3 out of 5 correct to establish mastery then
 * we want to draw 5 squares. Then fill in each square based
 * on whether the answer was correct or incorrect.
 */
QuestionBankView.prototype.drawAnswerHistory = function(_answerHistory) {
	// clear the answer history display
	$( ".answerHistory" ).empty();
	// loop through all the items in the queue
	for (i = 0; i < _answerHistory.length; i++) {
		id = 'id = answerBlock' + i;
		// if we haven't provided an answer yet
		if (_answerHistory[i] == null) {
			$( ".answerHistory" ).append( "<div " + id + " class='answerBlock noAnswer'></div>" );
		// if the answer was right
		} else if (_answerHistory[i] == true) {
			$( ".answerHistory" ).append( "<div class='answerBlock rightAnswer'></div>" );
		// if the answer was wrong
		} else {
			$( ".answerHistory" ).append( "<div class='answerBlock wrongAnswer'></div>" );
		}
	}
}
