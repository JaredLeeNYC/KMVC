//菜单显示隐藏
function menuControll(){
	var controller = KUI.get("menuControllerArrow");
	controller.onclick = function(){
		toggleMenu();
		var bg = KUI(this).getStyle('backgroundImage');
		if(bg.indexOf("MenuControllerArrow2.gif") != -1){
			KUI(this).setStyle({backgroundImage: bg.replace('MenuControllerArrow2.gif', 'MenuControllerArrow.gif')});
		}else {
			KUI(this).setStyle({backgroundImage: bg.replace('MenuControllerArrow.gif', 'MenuControllerArrow2.gif')});
		}
	}
}

//显示隐藏菜单
function toggleMenu(){
		var menu = KUI.get("leftMenu");
		var controller = KUI.get("menuControllerArrow");
		var controllerTxt = KUI.get("menuControllerText");
		var menuDiv = KUI.get("navigation");
		menuDiv.style.display = menuDiv.style.display == "none"?"":"none";
		controllerTxt.style.display = controllerTxt.style.display == "none"?"":"none";
		menu.style.width = menu.offsetWidth == 147?"36px":"145px";//有边框1px两条
}

//设置中间部分高度
function setContentHeight(){
	var wh = getPageWH();
	var cHeight = wh.height-62-26-8;//头部62， 底部26
	KUI.get("contentBox").style.height = cHeight +"px";
	KUI.get("leftMenu").style.height = cHeight +"px";
	KUI.get("mainContent").style.height = cHeight +"px";
	KUI.get("mainIframe").style.height = cHeight +"px";
}

var SlideMenu = function(uId){
	this.topContainer = KUI.get(uId);
}
SlideMenu.prototype.init = function(){
	if (!this.topContainer) 
	   	return;
    for (var i = 0, c; c = this.topContainer.childNodes[i]; i++) {
        if (c.nodeType == 3) 
            continue;
        var a = c.getElementsByTagName("a");
        if (!a || a.length == 0) 
            continue;
        var pObj = this;
        //初始化显示第一个，其他收起
        var uuu = a[0].parentNode.getElementsByTagName("ul");
        if (uuu && uuu.length>0) {
        	if(i==0){
        		KUI(a[0]).setStyle({backgroundImage: KUI(a[0]).getStyle('backgroundImage').replace('+', '-')});
        		uuu[0].style.display = "block";
        	}else{
        		uuu[0].style.display = "none";
        	}
        }
 
        a[0].onmouseup = function(){
            var u = this.parentNode.getElementsByTagName("ul");
            if (!u || u.length == 0) 
                return;
            //当前背景
            var curBg = KUI(this).getStyle('backgroundImage');
           var curBgURL = curBg.substring(curBg.indexOf('http'));
			//显示/隐藏当前栏目
			with(u[0].style){
				//已经展开
				if(display == '' || display== 'block'){
					display = 'none';
					KUI(this).setStyle({backgroundImage: 'url('+curBgURL.substring(0,curBgURL.lastIndexOf('/')+1) + 'Accordion+.gif)'});
				}else {
					display = 'block';
					KUI(this).setStyle({backgroundImage: 'url('+curBgURL.substring(0,curBgURL.lastIndexOf('/')+1) + 'Accordion-.gif)'});					
				}
            }
             //关闭其他栏目
            for (var ii = 0, cc; cc = pObj.topContainer.childNodes[ii]; ii++) {
		        if (cc.nodeType == 3) 
		            continue;
		        var aaaa = cc.getElementsByTagName("a");
		        //把其他的-号变为+号
		        if(aaaa[0] != this){
		        	var aaaaBg = KUI(aaaa[0]).getStyle('backgroundImage');
		        	var aaaaBgURL =  aaaaBg.substring(aaaaBg.indexOf('http'));
		        	KUI(aaaa[0]).setStyle({backgroundImage: 'url('+aaaaBgURL.substring(0,aaaaBgURL.lastIndexOf('/')+1) + 'Accordion+.gif)'});
		        }
		        var ul = cc.getElementsByTagName("ul");
		        if(u[0] != ul[0]){
				     ul[0].style.display = 'none';
		        }
		     }  
        }
    }
}

//返回当前页面宽度
function getPageWH(){
    var ie = !-[1, ];//最短的判断ie的写法
    var w,h;
    if (ie) {
        w = document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth;
        h = document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
    }
    else {
		w = self.innerWidth;
		h = self.innerHeight;
    }
	return {width:w,height:h}
};

//表格隔行换色，注意要有tbody
function changeRowColor(){
    var tbodys = document.getElementsByTagName('tbody');
	if (tbodys) {
		var l1 = tbodys.length;
			for (var j = 0; j < l1; j++) {
				if(tbodys[j].parentNode.className=='')continue;
				var TbRow = tbodys[j];
				if (TbRow != null) {
					var l2 = TbRow.rows.length;
					for (var i = 0; i < l2; i++) {
						TbRow.rows[i].className = (i % 2 == 0) ? 'evenRow' : 'oddRow';
						TbRow.rows[i].onmouseover = function(){
							this.tmpClass = this.className;
							this.className = 'rowOver';
						};
						TbRow.rows[i].onmouseout = function(){
							this.className = this.tmpClass;
						};
					}
				}
			}
	}
}