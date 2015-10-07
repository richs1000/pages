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

DatatypeModel.prototype.createDataList = function(_size){
	var list = [];
	for(var i = 0; i < _size; i++){
		list.push(getRandomInt(10, 21))
	}
	if(list[0] == list[1]){
		list[1] = list[1]+1
		console.log("equal")
	}
	//console.log(list)
	return list;
}

DatatypeModel.prototype.expressionEvaluation = function(_selected, _list){
	var answer = ""
	var selectedNumber = _selected.charCodeAt(0) - 102
	if (selectedNumber != 0 && selectedNumber != 1)
		answer = answer + "Type Error"
	else
		answer = answer + _list[selectedNumber]

	return answer
}