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
