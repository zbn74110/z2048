// 有动画版

// 设置动画时长，毫秒为单位
var animationSpeed = 100;
var transitionDuration = (animationSpeed/1000)+'s'

// 设置四个数组，分别对应上下左右移动时元素移动的顺序
var U = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
var D = [13,14,15,16,9,10,11,12,5,6,7,8,1,2,3,4]
var L = [1,5,9,13,2,6,10,14,3,7,11,15,4,8,12,16]
var R = [4,8,12,16,3,7,11,15,2,6,10,14,1,5,9,13]

// 获取所有的小格子
var allElements = document.getElementsByClassName('s');

// 初始化move参数，当move为真时，表示有格子移动过，则在场上随机添加数字
var move = true;

// 生成棋盘上一开始的两个数字
var firstElmentPosition = getFirstElementPosition(Math.floor(Math.random()*16));
allElements[firstElmentPosition[0]].value = 2;
allElements[firstElmentPosition[1]].value = 2;

// 设置初始分数
var score = getScore();

// 更新格子的数字
setNumTovalue();

// 更新分数显示
setScore()

// 更新颜色显示
setColor()

// 监听键盘操作
document.body.addEventListener("keypress",function(e){
	move = false;
	console.log(e.keyCode)
	switch(e.keyCode){
		case 87:
		case 119:
		// 移动棋盘
			addNum(U);
			break;
		case 83:
		case 115:
			addNum(D)
			break;
		case 65:
		case 97:
			addNum(L)
			break;
		case 68:
		case 100:
			addNum(R)
			break;
		default:
			break;
	}
	// 设置延迟，等待动画完成后再进行操作
	setTimeout(function(){
		// 如果棋盘移动过，则生成下一个数字
		if(move == true){setNum()}
		
		// 更新格子显示数字
		setNumTovalue();
		
		// 更新分数
		score = getScore();
		
		// 更新分数显示
		setScore();
		
		// 更新颜色显示
		setColor();
	},animationSpeed)
})

// 移动棋盘，根据移动方向不同，传入不同的顺序数组
function addNum(moveOrder){
	// 在移动前设置move为假
	
	// 从因为最靠边的4个格子不会移动，所以从第五个格子开始遍历
	for (let i = 4; i < moveOrder.length; i++) {
		// 根据顺序数组，得到要移动的格子
		let moveElement = document.getElementById(moveOrder[i]);
		if(!moveElement.value){// 如果格子内没数字，说明不用移动，直接跳过该数字
			continue;
		}
		
		// 获取移动目的地格子信息
		let moveMessage = getMoveStep(moveElement, i, moveOrder);
		
		if(moveMessage[0] == 0){// 如果移动距离为0，说明不移动，直接跳过
			continue;
		}
		
		// 把移动格子放到顶层，增加动画时长属性
		moveElement.style.zIndex = '999';
		moveElement.style.transitionDuration = transitionDuration;
		
		// 根据移动方向和距离不同，设置移动距离
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
		
		// 如果目标格子没有数字，则赋值过去，再把自己清空
		if(moveMessage[2] == -1){
			moveMessage[1].value = moveElement.value;
			moveElement.value = null;
			
		// 如果目标格子有数字，则修改目标格子的值*2，再把自己清空
		}else if(moveMessage[2] != -1){
			moveMessage[1].value = moveMessage[2];
			moveElement.value = null;
		}
		
		// 设置延迟，等待动画完成后,
		// 1. 清空移动格子的动画时长属性,以便在清除动画时，格子会瞬移回去;
		// 2. 清空移动格子的动画;
		// 3. 重置移动格子的层叠高度。
		setTimeout(function(){
			moveElement.style.transitionDuration = '';
			moveElement.style.transform = '';
			moveElement.style.zIndex = '100';
		},animationSpeed)
	}
}

// 获取格子移动的属性
// 传入移动的格子、移动格子在移动顺序中的位置、移动顺序，
// 返回格子的移动距离、目的地格子以及目的地格子的数字
function getMoveStep(moveElement,moveELementIndex,moveOrder){
	let selfEl = moveElement.value;
	// 初始化移动距离、目的地格子以及目的地格子的数字
	let moveStep = 0;
	let nextEl = null;
	let nextElNum = -1;
	
	while(true){
		// 如果格子已经靠边了，则退出循环，返回结果
		if(moveELementIndex-(moveStep*4) < 4){
			break;
		}
		
		moveStep++;
		// 寻找移动moveStep格之后目的地的格子
		nextEl = document.getElementById(moveOrder[moveELementIndex-(moveStep*4)]);
		
		// 如果目的地格子是空的，则寻找下一个目的地
		if(!nextEl.value){
			// 此时格子一定会移动到空白格子上，所以将move设为真
			move = true;
			continue;
		}
		
		// 如果目的地格子的数字不等于当前格子，则格子退回一步，并返回结果
		if(nextEl.value != selfEl){
			moveStep -= 1;
			nextEl = document.getElementById(moveOrder[moveELementIndex-(moveStep*4)]);
			break;
		}
		
		// 如果目的地的数字等于当前格子，则目的地格子乘2，并返回结果
		nextElNum = nextEl.value*2;
		move = true;
		break;
	}
	return [moveStep, nextEl, nextElNum]
	
	
}
// 每次移动过后，随机生成一个数
function setNum(){
	// 先获取所有没数字的格子
	emptyELements=[];
	for (let i = 0; i < allElements.length; i++) {
		if(!allElements[i].value){
			emptyELements.push(allElements[i])
		}
	}
	// 随机选择一个空格子，随机在里面填2或4
	let ranEl = Math.floor(Math.random()*emptyELements.length);
	let ranNum = Math.floor(Math.random()*20);
	if(ranNum<=1){
		emptyELements[ranEl].value=4;
	}else{
		emptyELements[ranEl].value=2;
	}
}

// 将场上所有的数加起来，得到分数
function getScore(){
	let sum = 0;
	for(let i=0;i<allElements.length;i++){
		if(allElements[i].value){
			sum += parseInt(allElements[i].value)
		}
	}
	return sum;
}

// 通过格子上的数字，给每个格子的边框和背景设置颜色
function setColor(){
	for (let i = 0; i < allElements.length; i++) {
		let color = getColor(allElements[i]);
		allElements[i].style.backgroundColor = color;
		allElements[i].style.borderColor = color;
	}
}

// 从0, 2^1 → 2^10分别返回不同的颜色
function getColor(num){
	num = num.value;
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

// 将页面上的"score"更新
function setScore(){
	document.getElementById("score").innerHTML = "score: "+ score
}

// 因为所有的值都是存在格子的value属性中的，需要把他们填到innerHTML中才能显示
// 这是为了动画的流畅性
function setNumTovalue(){
	for(let i=0;i<allElements.length;i++){
		if(allElements[i].value){
			allElements[i].innerHTML = allElements[i].value;
		}else{
			allElements[i].innerHTML = '';
		}
	}
}

// 获取两个0-15之间的不同的数
function getFirstElementPosition(el1){
	let el2 = Math.floor(Math.random()*16)
	if(el1 && el1 != el2){
		return [el1, el2]
	}
	return getFirstElementPosition(el2)
}
