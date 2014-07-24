//alert("initialized this thing");
function DialogManager(){
	//alert("huh!");
	this.id = 0;
	this.selection=0;
	this.tags = [];
	this.questions = [];
	this.choices = [];
	this.currenQuestion = "";

	this.add=function(question){
		this.questions.push(question);
	}
	
	this.selectUp = function(){
		this.selection = (this.selection+1)%this.choices.length;
	}
	this.selectDown = function(){
		this.selection -=1;
		if(this.selection<0)
			this.selection = this.choices.length-1;
		else
			this.selection %= this.choices.length; 
	}
	
	this.checkForTags=function(prereqs){
		var finalResult = true;
		for(var i = 0; i<prereqs.length; i++){
			var localResult = false;
			for(var j = 0; j<this.tags.length; j++){
				if(this.tags[j]==prereqs[i]){
					localResult = true;
					break;
				}
			}
			if(!localResult){
				return localResult;
			}
		}
		return finalResult;
	}

	this.getAvailableChoices = function(){
		var trimmedChoices = [];
		for(var i = 0; i<this.currentQuestion.choices.length;i++){
			if(this.checkForTags(this.currentQuestion.choices[i].prereqs))
			{
				trimmedChoices.push(this.currentQuestion.choices[i]);
			}
		}
		return trimmedChoices;
	}

	this.getQuestion=function(id){

		for(var i = 0; i<this.questions.length; i++){
			if(this.questions[i].id==id)
					return this.questions[i];
		}
	}

	this.choose=function(){
		for(var i = 0; i < this.currentQuestion.sets.length; i++){
			this.tags.push(this.currentQuestion.sets[i]);
		}
		this.id = this.choices[this.selection].leadsTo;
		this.currentQuestion = this.getQuestion(this.id);
		this.choices = this.getAvailableChoices();
		this.selection = 0;
	}

	this.printQuestion=function(context, x, y){
		context.fillStyle = 'black';
		context.fillText(this.currentQuestion.line, x, y);
	}

	this.printChoices=function(context, x, y, height){
		for(var i = 0; i<this.choices.length;i++){
			if(i==this.selection){
				context.fillStyle = 'yellow';
			}else{
				context.fillStyle = 'white';
			}
			//alert("drawing at "+(y+(i*height)));
			context.fillText(this.choices[i].line, x, y+(i*height));
		}
	}

	this.initialize = function(id){
		this.id = id;
		this.currentQuestion = this.getQuestion(this.id);
  	this.choices = this.getAvailableChoices();
 		this.tags.concat(this.currentQuestion.sets); 
	}
}

