// 设置四个数组，分别对应上下左右移动时元素移动的顺序
var U = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
var D = [13,14,15,16,9,10,11,12,5,6,7,8,1,2,3,4]
var L = [1,5,9,13,2,6,10,14,3,7,11,15,4,8,12,16]
var R = [4,8,12,16,3,7,11,15,2,6,10,14,1,5,9,13]
// 获取所有的小格子
var allElements = document.getElementsByClassName('s');
// 初始化move参数，当move为真时，表示有格子移动过，则在场上随机添加数字
var move = true;
// 设置初始分数为4
var score = 4;
var outClock = 0;
// 生成棋盘上一开始的两个数字
var firstElmentPosttion = Math.floor(Math.random()*16);
allElements[firstElmentPosttion].value = 2;
if (firstElmentPosttion==15){
	allElements[0].value = 2;
}else{
	allElements[firstElmentPosttion+1].value = 2;
}

setNumTovalue();
// 设置分数显示
setScore()
// 设置颜色
setColor()

// 监听键盘操作
document.body.addEventListener("keypress",function(e){
	switch(e.keyCode){
		case 119:
		// 移动棋盘
			addNum(U);
			break;
		case 115:
			addNum(D)
			break;
		case 97:
			addNum(L)
			break;
		case 100:
			addNum(R)
			break;
		default:
			break;
	}
	// setNumTovalue();
	// var outInterval = setInterval(function(){
	// 	// 如果棋盘有移动过，则随机放置数字
	// 	if (outClock == 100){
	// 		if(move == true){setNum()}
	// 		setNumTovalue();
	// 		// 获取分数
	// 		score = getScore();
	// 		// 设置分数显示
	// 		setScore();
	// 		// 设置颜色
	// 		setColor();
	// 		outClock = 0;
	// 		console.log('outclock')
	// 		window.clearInterval(outInterval)
	// 		return;
	// 	}
	// 	outClock += 100;
	// },100)
	setTimeout(function(){
		if(move == true){setNum()}
		setNumTovalue();
		// 获取分数
		score = getScore();
		// 设置分数显示
		setScore();
		// 设置颜色
		setColor();
	},100)


})

// 移动棋盘，根据移动方向不同，传入不同的顺序数组
function addNum(moveOrder){
	// 在移动前设置move为假
	
	move = false;
	// 从因为最靠边的4个格子不会移动，所以从第五个格子开始遍历
	for (let i = 4; i < moveOrder.length; i++) {
		let moveElement = document.getElementById(moveOrder[i]);
		if(!moveElement.value){// 如果格子内有数字，则进入循环
			continue;
		}
		let moveMessage = getMoveStep(moveElement, i, moveOrder);
		if(moveMessage[0] == 0){
			continue;
		}
		moveElement.style.zIndex = '999';
		moveElement.style.transitionDuration = "0.1s";
		switch(moveOrder){
			case U:
				moveElement.style.transform = "translateY("+(-moveMessage[0]*110)+"px)";
				break;
			case D:
				moveElement.style.transform = "translateY("+(moveMessage[0]*110)+"px)";
				break;
			case L:
				moveElement.style.transform = "translateX("+(-moveMessage[0]*110)+"px)";
				break;
			case R:
				moveElement.style.transform = "translateX("+(moveMessage[0]*110)+"px)";
				break;
			default:
				break;
		}
		if(moveMessage[2] == -1){
			moveMessage[1].value = moveElement.value;
			moveElement.value = null;
		}else if(moveMessage[2] != -1){
			moveMessage[1].value = moveMessage[2];
			moveElement.value = null;
		}
		// moveMessage[1].style.color = '#ffffff';
		setTimeout(function(){
			moveMessage[1].style.backgroundColor = getColor(moveMessage[1])
			moveElement.style.backgroundColor = ''
		},100)
		setTimeout(function(){
			moveElement.style.transitionDuration = '';
			moveElement.style.transform = '';
			moveElement.style.zIndex = '100';
			// moveMessage[1].style.color = '#000000';
		},100)
	}
}

function getMoveStep(moveElement,moveELementIndex,moveOrder){
	let selfEl = parseInt(moveElement.value);
	let moveStep = 0;
	let nextEl = null;
	let nextElNum = -1;
	while(true){
		if(moveELementIndex-(moveStep*4) < 4){
			break;
		}
		moveStep++;
		nextEl = document.getElementById(moveOrder[moveELementIndex-(moveStep*4)]);
		nextEl.style.zIndex = '100';
		if(!nextEl.value){
			move = true;
			continue;
		}
		if(parseInt(nextEl.value) != selfEl){
			moveStep -= 1;
			nextEl = document.getElementById(moveOrder[moveELementIndex-(moveStep*4)]);
			break;
		}
		nextElNum = parseInt(nextEl.value)*2;
		move = true;
		break;
	}
	return [moveStep, nextEl, nextElNum]
	
	
}
// 随机生成一个数
function setNum(){
	nullss=[];
	for (var i = 0; i < allElements.length; i++) {
		if(!allElements[i].value){
			nullss.push(allElements[i])
		}
	}
	let ranEl = Math.floor(Math.random()*nullss.length);
	let ranNum = Math.floor(Math.random()*20);
	if(ranNum<=1){
		nullss[ranEl].value=4;
	}else{
		nullss[ranEl].value=2;
	}
}

function getScore(){
	sum = 0;
	for(var i=0;i<allElements.length;i++){
		if(allElements[i].value){
			sum += parseInt(allElements[i].value)
		}
	}
	return sum;
}

function setColor(){
	for (var i = 0; i < allElements.length; i++) {
		let color = getColor(allElements[i]);
		allElements[i].style.backgroundColor = color;
		allElements[i].style.borderColor = color;
	}
}

// 从0-2048设置颜色
function getColor(num){
	num = parseInt(num.value);
	if (!num){
		return "";
	}else if(Math.log2( num ) % 10 == 0){
		return "#d4acad";
	}else if(Math.log2( num ) % 9 == 0){
		return "#f2c9ac";
	}else if(Math.log2( num ) % 8 == 0){
		return "#f2f2b0";
	}else if(Math.log2( num ) % 7 == 0){
		return "#c1d8ac";
	}else if(Math.log2( num ) % 6 == 0){
		return "#d69090";
	}else if(Math.log2( num ) % 5 == 0){
		return "#ebf6f7";
	}else if(Math.log2( num ) % 4 == 0){
		return "#ede1a9";
	}else if(Math.log2( num ) % 3 == 0){
		return "#bce2e8";
	}else if(Math.log2( num ) % 2 == 0){
		return "#ddbb99";
	}else if(Math.log2( num ) % 1 == 0){
		return "#f3f3f2";
	}
}

function setScore(){
	document.getElementById("score").innerHTML = "score: "+ score
}

function setNumTovalue(){
	for(let i=0;i<allElements.length;i++){
		if(allElements[i].value){
			allElements[i].innerHTML = allElements[i].value;
		}else{
			allElements[i].innerHTML = '';
		}
	}
}