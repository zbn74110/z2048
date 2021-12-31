// 无动画版
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

// 生成棋盘上一开始的两个数字
var firstElmentPosttion = Math.floor(Math.random()*16);
allElements[firstElmentPosttion].innerHTML = 2;
if (firstElmentPosttion==15){
	allElements[0].innerHTML = 2;
}else{
	allElements[firstElmentPosttion+1].innerHTML = 2;
}

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
	// 如果棋盘有移动过，则随机放置数字
	if(move == true){setNum()}
	// 获取分数
	score = getScore();
	// 设置分数显示
	setScore()
	// 设置颜色
	setColor()
})

// 移动棋盘，根据移动方向不同，传入不同的顺序数组
function addNum(moveOrder){
	// 在移动前设置move为假
	move = false;
	// 从因为最靠边的4个格子不会移动，所以从第五个格子开始遍历
	for (let i = 4; i < moveOrder.length; i++) {
		// 初始化移动次数为0
		let n = 0;
		if(document.getElementById(moveOrder[i]).innerHTML != ''){// 如果格子内有数字，则进入循环
			while(true){
				// 获取当前要移动的格子
				let selfEL = document.getElementById(moveOrder[i-(n*4)]);
				// let selfEL = document.getElementById(moveOrder[i]);
				// 移动次数+1
				n++;
				if (i-(n*4)>=0){// 如果格子不是在最后一行
					// 获取要移动的格子的前一个格子
					let frontEl = document.getElementById(moveOrder[i-(n*4)]);
					if (frontEl.innerHTML==''){// 如果前一个格子没有数
						// 就把当前格子的数给到前一个格子中，当前格子的数清空，并设置移动标识为真
						frontEl.innerHTML=selfEL.innerHTML;
						selfEL.innerHTML=''
						move = true;
					}else{//如果前一个格子有数
						if(parseInt(frontEl.innerHTML)==parseInt(selfEL.innerHTML)){//如果前一个格子和移动的格子相等
							// 前一个格子就等于这两个格子的数之和，当前格子的数清空，并设置移动标识为真
							frontEl.innerHTML = parseInt(frontEl.innerHTML)+parseInt(selfEL.innerHTML);
							selfEL.innerHTML=''
							move = true;
							// 这样这个数的移动就结束了，退出循环到下一个格子
							break;
						}else{//如果前一个格子的数不等于移动的格子，退出循环到下一个格子
							break;
						}
					}
				}else{
					break;
				}
			}
		}
		
	}
}

// 随机生成一个数
function setNum(){
	nullss=[];
	for (var i = 0; i < allElements.length; i++) {
		if(allElements[i].innerHTML==''){
			nullss.push(allElements[i])
		}
	}
	let ranEl = Math.floor(Math.random()*nullss.length);
	let ranNum = Math.floor(Math.random()*20);
	if(ranNum<=1){
		nullss[ranEl].innerHTML=4;
	}else{
		nullss[ranEl].innerHTML=2;
	}
}

function getScore(){
	sum = 0;
	for(var i=0;i<allElements.length;i++){
		if(allElements[i].innerHTML!=''){
			sum += parseInt(allElements[i].innerHTML)
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
	num = parseInt(num.innerHTML);
	if (!num){
		return "#ffffff";
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