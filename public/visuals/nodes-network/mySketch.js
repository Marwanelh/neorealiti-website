
// Made for the #WCCChallenge Nodes
// Hello Raph and chat.
// I've been busy lately but this challenge inspired me to make this sketch.


let img, nodes, connections, planes, mapImg
function setup() {
	createCanvas(windowWidth, windowHeight);
	img = loadImage('plane.png')
	mapImg = loadImage('map.png')
	nodes = []
	connections = []
	planes = []
	background(255);
	
	createNode(width/2-75,height/2)
	createNode(width/2+75,height/2)
	createNode(width/2,height/2-75)
	createNode(width/2,height/2+75)
	for(let i = 0; i < 4; i++){
		planes.push(new Plane(nodes[i]))
	}
}

function draw() {
	background(255);
	image(mapImg,0,-0.15*(height * mapImg.width/mapImg.height),width,height * mapImg.width/mapImg.height)
	nodes.forEach(node => node.display(mouseX,mouseY))
	connections.forEach(c => c.display())
	planes.forEach(p => {
		p.display(img)
		p.update()
		})
}

function mousePressed(){
	let node = createNode(mouseX,mouseY)
	if(node != null && node.connections.length > 0){
		planes.push(new Plane(node))
	}
}

function keyPressed(){
	planes.push(new Plane(nodes[int(random(nodes.length))]))
}

function createNode(x,y){
	let node = new Node(x,y)
	
	let create = true
	
	nodes.forEach(n => {
		if(dist(n.x,n.y,node.x,node.y)<25){
			create = false
		}
	})
	
	if(create){
	nodes.forEach(n => {
		if(dist(n.x,n.y,node.x,node.y)<200){
			let connection = new Connection(node,n)
			connections.push(connection)
			node.connections.push(connection)
			n.connections.push(connection)
		}
	})
	nodes.push(node)
		return node
	}else{
		return null
	}
}


