class Block{
	constructor(x,y,targetX,targetY,isSquare){
		this.pos = createVector(x,y)
		this.target = createVector(targetX,targetY)
		this.isSquare = isSquare
	}
	
	display(){
			noStroke()
		if(this.isSquare){
			fill(200,50,50)
			rect(this.pos.x-5,this.pos.y-5,10,10)
		}else{
			fill(50,50,200)
			ellipse(this.pos.x,this.pos.y,10,10)
		}
	}
	
	inPlace(){
		if(dist(this.pos.x,this.pos.y,this.target.x,this.target.y)<0.5){
			this.pos = this.target.copy()
			return true
		}
		return false
	}
}