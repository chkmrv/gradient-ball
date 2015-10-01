window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 10);
    };
})();


var canvas = document.getElementById("bg_Line"),
    ctx = canvas.getContext("2d");


var amount = 20,
    particle = [];
    trans = 0.9;

function Particles(x, y, distance, _color){
  this.x =x;;
  this.y =y;
  this.distance = distance;
  this.velocity = distance * (Math.random());
  this.radius = distance * 55;
  this.color = _color;
}

Particles.prototype.draw = function(){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x,this.y, this.radius, 0, 6*Math.PI, false);
  ctx.fill();
}

function loop(){
  clearContext();
  for(i =0; i< particle.length; i++){
    var p = particle[i];
    
    (p.x > canvas.width) ? p.x =0 : p.x +=p.distance * (Math.random() * trans);
    (p.y > canvas.width) ? p.y =0 : p.y +=p.distance * (Math.random() * trans);
   
    for(j = i +1; j< particle.length; j++){
      p2 = particle[j];
      distance(p, p2);
    }
    
    
    function distance(p1, p2){
      var dx = p1.x-p2.x;
      var dy = p1.y-p2.y;
      
      var ax = dx/20000
          ay = dy/20000;
      
      
      if((dx + dy) < 600){
        // Draw the line
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
              
        p1.x +=ax;
        p2.x +=ax;
        p1.y +=ay;
        p2.y +=ay
      }
        
    }
    p.draw();
  }
  
  requestAnimFrame(loop);
}

for(i=0; i < amount; i++){
  var randomColor = ["#000", "#000", "#000", "#000"];
  var randomNum = Math.round( Math.random() * randomColor.length) + 1;

  
  ps= new Particles(Math.random() * canvas.width, Math.random()*canvas.height, Math.random() *2, randomColor[randomNum]);
  
  particle.push(ps);
}

requestAnimFrame(loop);
clearContext = function(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
}


var colors = new Array(
	  [100,84,255],// синий
	  [133,230,133],// зеленый
	  [255,100,150],// розовый
	  [100,193,230],// голубой
	  [217,140,217],// малиновый
	  [255,160,60]); // оранжевый

	var step = 0;
	var colorIndices = [0,1,2,3];

	//скорость
	var gradientSpeed = 0.002;

	function updateGradient()
	{
	  
		if ( $===undefined ) return;
	  
	var c0_0 = colors[colorIndices[0]];
	var c0_1 = colors[colorIndices[1]];
	var c1_0 = colors[colorIndices[2]];
	var c1_1 = colors[colorIndices[3]];

	var istep = 1 - step;
	var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
	var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
	var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
	var color1 = "rgb("+r1+","+g1+","+b1+")";

	var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
	var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
	var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
	var color2 = "rgb("+r2+","+g2+","+b2+")";

	$('#bg_Grad').css({
	    background: "-webkit-gradient(linear, left top, left bottom, from("+color1+"), to("+color2+"))"}).css({
	    background: "-moz-linear-gradient(top, "+color1+" 0%, "+color2+" 100%)"});
	  
	  	step += gradientSpeed;
	  	if ( step >= 1 )
	  	{
		    step %= 1;
		    colorIndices[0] = colorIndices[1];
		    colorIndices[2] = colorIndices[3];
		    
		    // выбрать два новых целевых показателей цвета
			// не подобрать же как текущий
		    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
		    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
	    
		}
	}
	setInterval(updateGradient,10);