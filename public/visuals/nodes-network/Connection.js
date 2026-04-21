class Connection{
	constructor(nodeA, nodeB){
		this.nodeA = nodeA
		this.nodeB = nodeB
	}
	
	display(){
		stroke(0,50)
		line(this.nodeA.x,this.nodeA.y,this.nodeB.x,this.nodeB.y)
	}
}