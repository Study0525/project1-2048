var game={
		data:null,
		RN:4,CN:4,//自己的方法调用自己的属性必须加this
		score:0,
		state:1,
		RUNNING:1,
		GAMEOVER:0,
		//启动游戏
		start:function(){
			this.score=0;
			this.state=this.RUNNING;
			this.data=[];
			for(var r=0;r<this.RN;r++){
				this.data.push([]);
				for(var c=0;c<this.CN;c++){
					this.data[r][c]=0;
				}
			}
			this.randomNum();
			this.randomNum();
			//debugger;
			//console.log(this.data.join("\n"));	
			this.updateView();
			document.onkeydown=function(event){
				//alert(event.keyCode);
				if(this.state==this.RUNNING)
				switch(event.keyCode){
					case 37:
						this.moveLeft();break;
					case 38:
						this.moveUp();break;
					case 39:
						this.moveRight();break;
					case 40:
						this.moveDown();break;
				}
			}.bind(this);//因为不是立即执行，所以用bind
		},
		//在data的随机位置随机生成一个数字
		randomNum:function(){
			while(true){
				var r=Math.floor(Math.random()*this.RN);
				var c=Math.floor(Math.random()*this.CN);
				if(this.data[r][c]==0){
					this.data[r][c]=Math.random()<0.5?2:4;			
					break;
				}				
			}
		},
		moveLeft:function(){
			this.move(function(){
			for(var r=0;r<this.RN;r++){
				this.moveLeftInRow(r);
			}
			});
		},
		moveRight:function(){
			this.move(function(){
			for(var r=0;r<this.RN;r++){
				this.moveRightInRow(r);
			}
			});
		},
		moveUp:function(){
			this.move(function(){
			for(var c=0;c<this.CN;c++){
				this.moveUpInCol(c);
			}
			});
		},
		moveDown:function(){
			this.move(function(){
			for(var c=0;c<this.CN;c++){
				this.moveDownInCol(c);
			}
			});
		},
		move:function(callback){
			var before=String(this.data);
			callback.call(this);
			var after=String(this.data);
			if(before!==after){
				this.randomNum();
				if(!this.isGameOver){//如果游戏结束
				this.state=this.GAMEOVER;//修改游戏状态为0
				}
				this.updateView();
			}	
		},
		isGameOver:function(){
		for(var r=0;r<RN;r++){//遍历data
			for(var c=0;c<CN;c++){
			if(data[r][c]==0)//如果当前元素是0，就返回false
			return false;
		   if((c<CN-1)&&data[r][c]==data[r][c+1])//如果c<CN-1且当前元素等于右侧元素时，就返回false
		   return false;
		   if((r<RN-1)&&data[r][c]==data[r+1][c])//如果r<RN-1且当前元素等于下方元素时，就返回false	
			return false;
		 }
		}//(遍历结束)		 
		 return true;
		 //返回true	
		},
		//==========================
		moveLeftInRow:function(r){
			for(var c=0;c<this.CN;c++){
				var nextc=this.getNextInRow(r,c);
				if(nextc==-1){
					break;
				}else{
					if(this.data[r][c]==0){
						this.data[r][c]=this.data[r][nextc];
						this.data[r][nextc]=0;
						c--;
					}else{
						if(this.data[r][c]==this.data[r][nextc]){
							this.data[r][c]*=2;
							this.score+=this.data[r][c];
							this.data[r][nextc]=0;							
						}
					}
				}
			}
		},
		moveRightInRow:function(r){
			for(var c=this.CN-1;c>0;c--){
				var prevc=this.getPrevInRow(r,c);
				if(prevc==-1){
					break;
				}else{
					if(this.data[r][c]==0){
						this.data[r][c]=this.data[r][prevc];
						this.data[r][prevc]=0;
						c++;
					}else{
						if(this.data[r][c]==this.data[r][prevc]){
							this.data[r][c]*=2;
							this.score+=this.data[r][c];
							this.data[r][prevc]=0;							
						}
					}
				}
			}
		},
		moveUpInCol:function(c){
			for(var r=0;r<this.RN-1;r++){
				var nextr=this.getNextInCol(r,c);
				if(nextr==-1){
					break;
				}else{
					if(this.data[r][c]==0){
						this.data[r][c]=this.data[nextr][c];
						this.data[nextr][c]=0;
						r--;
					}else{
						if(this.data[r][c]==this.data[nextr][c]){
							this.data[r][c]*=2;
							this.score+=this.data[r][c];
							this.data[nextr][c]=0;							
						}
					}
				}
			}
		},
		moveDownInCol:function(c){
			for(var r=this.RN-1;r>0;r--){
				var prevr=this.getPrevInCol(r,c);
				if(prevr==-1){
					break;
				}else{
					if(this.data[r][c]==0){
						this.data[r][c]=this.data[prevr][c];
						this.data[prevr][c]=0;
						r++;
					}else{
						if(this.data[r][c]==this.data[prevr][c]){
							this.data[r][c]*=2;
							this.score+=this.data[r][c];
							this.data[prevr][c]=0;							
						}
					}
				}
			}
		},

		//========找r行c列右侧下一个不为0的位置
		getNextInRow:function(r,c){
			c++;
			for(;c<this.CN;c++){
				if(this.data[r][c]!=0){
					return c;
				}
			}
			return -1;
		},	
		//找r行c列左侧下一个不为0的位置
		getPrevInRow:function(r,c){
			c--;
			for(;c>=0;c--){
				if(this.data[r][c]!=0){
					return c;
				}
			}
			return -1;
		},
		//找r行c列下侧下一个不为0的位置
		getNextInCol:function(r,c){
			r++;
			for(;r<this.RN;r++){
				if(this.data[r][c]!=0){
					return r;
				}
			}
			return -1;
		},
		//找r行c列下侧下一个不为0的位置
		getPrevInCol:function(r,c){
			r--;
			for(;r>=0;r--){
				if(this.data[r][c]!=0){
					return r;
				}
			}
			return -1;
		},
		//将data中的元素更新到页面对应div中
		updateView:function(){
			for(var r=0;r<this.RN;r++){
				for(var c=0;c<this.CN;c++){
					var div=document.getElementById("c"+r+c);
					if(this.data[r][c]!=0){
						div.innerHTML=this.data[r][c];
						div.className="cell n"+this.data[r][c]
					}else{
						div.innerHTML="";
						div.className="cell";
						}
				}
			}
		document.getElementById("score")
				.innerHTML=this.score;
		document.getElementById("gameOver")
				.style.display=this.state==this.GAMEOVER?"block":"none";
		//如果游戏结束将score写入final
			this.state==this.GAMEOVER&&(document.getElementById
				("final").innerHTML=this.score);
			},
		
}
game.start();//页面加载后自动启动游戏