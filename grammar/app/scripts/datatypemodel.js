/*
 * Each node in the fringe represents a node in the search tree. Each node
 * in the search tree represents a unique path through the graph.
 */

 function DatatypeModel(_simModel) {
	// save a link to the model
	this.simModel = _simModel;
	// store the fringe as an ordered list
	this.fringeNodes = [];
}

DatatypeModel.prototype.pizza = function(){
	list = ["chesse", "ham", "bacon", "lettuce"]
	if(getRandomInt(0,2) == 0)
		return list[getRandomInt(0,4)]
	else
		return getRandomInt(0,11)

}
DatatypeModel.prototype.string = function(){
	list = ["hi", "hello", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
	console.log(getRandomInt(0,3))
	return list[getRandomInt(0,9)]

}

DatatypeModel.prototype.date = function(){
	if(getRandomInt(0,2) == 0)
		return "(int * int * int)";
	else
		return "date";
}

DatatypeModel.prototype.s = function(){
	if(getRandomInt(0,2) == 0)
		return "s";
	else
		return "string";
}

DatatypeModel.prototype.randomVar = function(){
	if(getRandomInt(0,2) == 0)
		return "int";
	else
		return this.s();
}

DatatypeModel.prototype.createquestion = function(){
	list = []
	for(var i = 0; i < 4; i++){
		right = left = ""
		numberElements = 1 //getRandomInt(1,2)
		selected = getRandomInt(0,3)
			if(selected == 0){
				left = left + this.date(); 
			}else if(selected == 1){
				left = left  + this.s();
			}else
				left = left  + this.randomVar();

			selected = getRandomInt(0,3)
			if(selected == 0){
				right = right  + this.date();
			}else if(selected == 1){
				right = right  + this.s();
			}else
				right = right  + this.randomVar();

		for(var j = 0; j < numberElements; j++){
			
			selected = getRandomInt(0,3)
			if(selected == 0){
				left = left  + " * " + this.date(); 
			}else if(selected == 1){
				left = left  + " * " + this.s();
			}else
				left = left  + " * " + this.randomVar();

			selected = getRandomInt(0,3)
			if(selected == 0){
				right = right  + " * " + this.date();
			}else if(selected == 1){
				right = right  + " * " + this.s();
			}else
				right = right  + " * " + this.randomVar();
		}
		list.push(left + " -> " + right)
	}
	list.push("None of the above")
	console.log(list[0] +" " + parser.parse(list[0]))

	console.log(list[1]+ " " + parser.parse(list[1]))

	console.log(list[2]+ " " + parser.parse(list[2]))

	console.log(list[3]+ " " + parser.parse(list[3]))
}

DatatypeModel.prototype.getAnswer = function(_questionBank){
	var question = _questionBank.questions[0]
	var list = question[2]
	answers = [] 
	for(var i = 0; i < 4; i++){
		if(parser.parse(list[i]) == 'ok')
			answers.push(i);
	}
	if(answers.length == 0)
		answers.push(4);
	return answers
}
