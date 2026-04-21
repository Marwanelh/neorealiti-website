class Node{
	constructor(x,y){
		this.x = x
		this.y = y
		this.connections = []
	}
	
	display(mx, my){
		stroke(0,0,255)
		fill(0,0,255)
		ellipse(this.x,this.y,15,15)
		noFill()
		ellipse(this.x,this.y,20,20)
		
		stroke(0,255,0)
		if(dist(this.x,this.y,mx,my)<200){
			line(this.x,this.y,mx,my)
		}
	}
	
	getRandomConnection(){
		let connection = this.connections[int(random(this.connections.length))]
		if(connection.nodeA == this){
			return connection.nodeB
		}else{
			return connection.nodeA
		}
	}
}