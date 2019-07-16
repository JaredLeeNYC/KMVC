/*-------------- KUI core start -------------------*/

/**
* @fileoverview KINGKIT UI 荆棘鸟KUI框架
 * @date 2009.12.29
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
*/

/**
* KUI基础类.
* @class KUI基础类
* @constructor
*/	
var KUI = function(){
	return new KUI.fn.init(arguments);
};
KUI.fn = KUI.prototype = {
	version: '0.9.0',
	init: function(els){			
		//用于保存DOM元素的引用
		this.elements = this.selector(els[0],els[1]);
		return this;
	},		
	selector:function(args1,arg2){
		if (typeof args1 == "object") {
			var els = [];
			els[0]= args1;
			return els;
		}
		else{	
			return  arg2?KUI.selector(args1,arg2):KUI.selector(args1);
		}
	},
	/**
	* 获取dom元素的总数
	* @returns dom元素数量
	* @type int	
	 * @example 	
	 * var el = KUI("div");
	 * alert(el.size());
	*/
	size:function(){
		return (this.elements.length);
	},
	/**
	 * 取得(设置)dom元素的值
	 * @param {Object} newValue 元素值
	 * @return 如果newValue为空时，返回当前元素的值；否则设置元素的值，返回当前对象以便链式调用
	 */
	val: function(newValue){
		if (this.elements[0])//如果对象存在
		{
			//获取目标对象的值.
			if (newValue == undefined) {
				var el = this.elements[0];
				var sType = el.type;
				switch(sType)
				{
					case "text":
					case "hidden":
					case "password":
					case "file":
					case "textarea": return el.value;
					//radio,checkbox
					case "checkbox":
					case "radio": return e.checked;
					//select-one,select-multiple
					case "select-one":
					case "select-multiple": return (function(el){
						for (var i = 0, l = el.options.length; i < l; i++) {
							if (el.options[i].selected) {
								 return el.options[i].value;
							}
						}
					})(el);
				}
			}
			//TODO 元素类型为非input时，需要完善
			this.elements[0].value = newValue;// 将目标对象的value属性设置为newValue.
			return this; //为了使方法可以连续调用, 返回当前实例。
		}
	},
	/**
	 * 取得第一个Dom对象
	 * @return Dom对象
	 */
	getDom: function(){            
		return this.elements[0]; 
	},
	/**
	 * 遍历查找结果，并执行指定函数
	 * @return {Object}  KUI对象 
	 */
	each: function(fn){
		for (var i = 0, l = this.elements.length; i < l; i++) {
			fn.call(this, this.elements[i]);
		}
		return this;
	},	
	/**  
	 * 设置对象的样式
	 * @id setStyle 
	 * @param {Object|String} styleObj 
	 * @example
	 * 样式示例：
	 * A. 对象形式 KUI("#myDivID").setStyle({"display":"block","font-size":"28px","color":"red"})
	 * B. 字符串形式 KUI("#myDivID").setStyle("color:red; font-size:12px;"); 
	 * @return {Object}  KUI对象  
	 */ 
	setStyle: function(styleObj) {
		this.each(function(els){               
			 if (typeof(styleObj) == "object") { 
				 for (s in styleObj) { 
					 var cssArrt = s.split("-"); 
					 for (var i = 1; i < cssArrt.length; i++) { 
						 cssArrt[i] = cssArrt[i].replace(cssArrt[i].charAt(0), cssArrt[i].charAt(0).toUpperCase()); 
					 } 
					 var cssArrtnew = cssArrt.join(""); 
					 els.style[cssArrtnew] = styleObj[s]; 
				 } 
			 } else if (typeof(styleObj) == "string") { 
				 els.style.cssText = styleObj; 
			 }
		});
		 return this;  
	},
	
	/**  
	 * 获取对象的样式值
	 * @param {String} styleName 样式的属性名称 如：fontSize
	 * @return {String} 样式值  
	 */ 
	 getStyle: function(styleName) { 
		if(styleName)
		 return this.elements[0].style[styleName] ? this.elements[0].style[styleName] : this.elements[0].currentStyle ? this.elements[0].currentStyle[styleName] : window.getComputedStyle(this.elements[0], null)[styleName];
		else return this.elements[0].style ? this.elements[0].style : this.elements[0].currentStyle ? this.elements[0].currentStyle: window.getComputedStyle(this.elements[0], null);  
	 },
	
	/**  
	 * 判断元素是否含有某样式
	 * @param {String} className 判断样式名称 
	 * @return {Boolean} ture or false  
	 */ 
	hasClass: function(className) { 
		if (!this.elements[0].className) { 
			return false; 
		}
		return new RegExp('(\\s|^)' + className + '(\\s|$)').test(this.elements[0].className);           
	},
	
	/**  
	 * 给DOM对象加上样式名称 
	 * @param {String} className 要加的样式名称 
	 * @return {Object}  KUI对象  
	 */ 
	addClass: function(className) { 
		 this.each(function(els){  
			 if (!this.hasClass(className)) { 
				els.className += " " + className; 
			 }
		 });
		 return this; 
	},
	
	/**  
	 * 给指定的DOM对象加上样式名称 
	 * @param {String} className 要加的样式名称 
	 * @return {Object}  KUI对象  
	 */ 
	setClass: function(className) { 
		 this.each(function(els){
			 if (!this.hasClass(className)) { 
				 els.className = className; 
			 }
		}); 
		return this; 
	},
	 
	/**  
	 * 获得DOM对象样式名称 
	 * @return {String} 样式名称 
	 */ 
	getClass: function() { 
		 return this.elements[0].className; 
	},
	 
	/**  
	 * 去掉某个样式 
	 * @param {String} className 要去除的样式名称 
	 * @return {Object}  KUI对象  
	 */ 
	removeClass: function(className) { 
		 this.each(function(els){
			 if (this.hasClass(className)) { 
				 els.className = els.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), " ");
			 } 
		 });
		 return this; 
	},
	
	/**  
	 * 设置对象的透明度
	 * @param {Int} ，n的范围为1-100  
	 * @return {Object}  KUI对象  
	 */ 		
	setOpacity: function(n){
		this.each(function(els){
			 els.style.opacity=n/100; 
			 els.style.filter='alpha(opacity='+n+')';
		 });
		 return this; 
	},
	 
	 /**  
	 * 绑定事件
	 * @param {String} eventName 事件的名称 如onclick
	 * @param {Function} fn 回调函数
	 * @return {Object}  KUI对象  
	 */ 
	 bindEvent: function(eventName,fn) { 
		 this.each(function(els){				
			var mouseRouter = new KUI.Event.EventRouter(els, eventName);
			mouseRouter.addListener(fn);
		}); 
		return this;
	 },
	 
	 /**  
	 * 移除事件
	 * @id unbindEvent 
	 * @param {String} eventName 事件的名称 如onclick
	 * @param {Function} fn 回调函数
	 * @return {Object}  KUI对象  
	 */ 
	 unbindEvent: function(eventName) { 
		 this.each(function(els){				
			var mouseRouter = new KUI.Event.EventRouter(els, eventName);
			mouseRouter.removeListener(fn);
		}); 
		return this;
	 },
	 
	 /**  
	 * 初始化onclick事件
	 */ 
	 onclick: function(fn) { 
		 this.each(function(els){				
			this.bindEvent('onclick',fn);
		}); 
	 },
	 
	 /**  
	 * 获取元素的宽高 
	 * @param {String} el DOM对象 
	 * @return {Object} width:宽度；height:高度 
	 */ 
	 getSize: function() {	          
		 if (this.getStyle("display") != "none") { 
			 return { width: this.elements[0].offsetWidth || parseInt(this.getStyle("width")), height: this.elements[0].offsetHeight || parseInt(this.getStyle("height"))}; 
		 } 
		 var _addCss = { display: "", position: "absolute", visibility: 'hidden' }; 
		 var _oldCss = {}; 
		 for (i in _addCss) { 
			 _oldCss[i] = this.getStyle(i); 
			 this.setStyle(_addCss); 
		 } 
		 var _width = this.elements[0].clientWidth || parseInt(this.getStyle("width")); 
		 var _height = this.elements[0].clientHeight || parseInt(this.getStyle("height")); 
		 for (i in _oldCss) { 
			 this.setStyle(_oldCss); 
		 } 
		 return { width: _width, height: _height }; 
	 },
	 
	 /**  
	 * 获取元素的坐标 
	 * @param {String} el DOM对象 
	 * @return {Object} x:x坐标；y：y坐标 
	 */ 
	 getPos: function() { 
		 var el = this.elements[0];
		var ua = navigator.userAgent.toLowerCase();
		if (el.parentNode === null || el.style.display == 'none') {
			return {
			x: 0,
			y: 0
		};
		}
		var parent = null;
		var pos = [];
		var box;
		if (el.getBoundingClientRect) //IE
		{
			box = el.getBoundingClientRect();
			var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			return {
				x: box.left + scrollLeft,
				y: box.top + scrollTop
			};
		}
		else 
			if (document.getBoxObjectFor) // gecko    
			{
				box = document.getBoxObjectFor(el);
				var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
				var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
				pos = [box.x - borderLeft, box.y - borderTop];
			}
			else // safari & opera    
			{
				pos = [el.offsetLeft, el.offsetTop];
				parent = el.offsetParent;
				if (parent != el) {
					while (parent) {
						pos[0] += parent.offsetLeft;
						pos[1] += parent.offsetTop;
						parent = parent.offsetParent;
					}
				}
				if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
					pos[0] -= document.body.offsetLeft;
					pos[1] -= document.body.offsetTop;
				}
			}
		if (el.parentNode) {
			parent = el.parentNode;
		}
		else {
			parent = null;
		}
		while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
			pos[0] -= parent.scrollLeft;
			pos[1] -= parent.scrollTop;
			if (parent.parentNode) {
				parent = parent.parentNode;
			}
			else {
				parent = null;
			}
		}
		return {
			x: pos[0],
			y: pos[1]
		};
	 },
	 
     /**
      * 设置元素的坐标
      * @param {Object} x 水平坐标
      * @param {Object} y 垂直坐标
      * @return {Object}  KUI对象
      */
	 setPos: function(x, y) { 
		this.each(function(els){
			els.style.position = "absolute";
			els.style.top = parseInt(y)+"px";
			els.style.left = parseInt(x)+"px";
		});
		return this;
	 },
	 
	 /**  
	 * 设置元素的居中 
	 * @return {Object}  KUI对象  
	 */ 
	 center: function() { 
		var WH = KUI.getViewportSize();		
		var size = this.getSize();
		var st = parseInt(document.body.scrollTop)+0;
		var sl = parseInt(document.body.scrollLeft)+0;
		var top = st+(WH.height - size.height)/2; 
		var left = sl+(WH.width - size.width)/2; 
		this.each(function(els){
			els.style.position = "absolute";
			els.style.top = parseInt(top)+"px";
			els.style.left = parseInt(left)+"px";
		});
		return this;
	 }		 
}
KUI.fn.init.prototype = KUI.fn;

//------------下面是选择器 mini selector----------------
/**
 * "mini" Selector Engine 
 * Copyright (c) 2009 James Padolsey 
 * ------------------------------------------------------- 
 * Dual licensed under the MIT and GPL licenses. 
 *    - http://www.opensource.org/licenses/mit-license.php 
 *    - http://www.gnu.org/copyleft/gpl.html 
 * ------------------------------------------------------- 
 * Version: 0.01 (BETA) 
	
	Usage:
	
	var pAnchors = mini('p > a'); // Returns an array.
	
	for (var i = 0, l = pAnchors.length; i < l; ++i) {
		// Do stuff...
	}
	Supported Selectors:
	
	tag 
	tag > .className 
	tag > tag 
	#id > tag.className 
	.className tag 
	tag, tag, #id 
	tag#id.className 
	.className 
	span > * > b 
 */
KUI.selector = (function(){var b=/(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,g=/^(?:[\w\-_]+)?\.([\w\-_]+)/,f=/^(?:[\w\-_]+)?#([\w\-_]+)/,j=/^([\w\*\-_]+)/,h=[null,null];function d(o,m){m=m||document;var k=/^[\w\-_#]+$/.test(o);if(!k&&m.querySelectorAll){return c(m.querySelectorAll(o))}if(o.indexOf(",")>-1){var v=o.split(/,/g),t=[],s=0,r=v.length;for(;s<r;++s){t=t.concat(d(v[s],m))}return e(t)}var p=o.match(b),n=p.pop(),l=(n.match(f)||h)[1],u=!l&&(n.match(g)||h)[1],w=!l&&(n.match(j)||h)[1],q;if(u&&!w&&m.getElementsByClassName){q=c(m.getElementsByClassName(u))}else{q=!l&&c(m.getElementsByTagName(w||"*"));if(u){q=i(q,"className",RegExp("(^|\\s)"+u+"(\\s|$)"))}if(l){var x=m.getElementById(l);return x?[x]:[]}}return p[0]&&q[0]?a(p,q):q}function c(o){try{return Array.prototype.slice.call(o)}catch(n){var l=[],m=0,k=o.length;for(;m<k;++m){l[m]=o[m]}return l}}function a(w,p,n){var q=w.pop();if(q===">"){return a(w,p,true)}var s=[],k=-1,l=(q.match(f)||h)[1],t=!l&&(q.match(g)||h)[1],v=!l&&(q.match(j)||h)[1],u=-1,m,x,o;v=v&&v.toLowerCase();while((m=p[++u])){x=m.parentNode;do{o=!v||v==="*"||v===x.nodeName.toLowerCase();o=o&&(!l||x.id===l);o=o&&(!t||RegExp("(^|\\s)"+t+"(\\s|$)").test(x.className));if(n||o){break}}while((x=x.parentNode));if(o){s[++k]=m}}return w[0]&&s[0]?a(w,s):s}var e=(function(){var k=+new Date();var l=(function(){var m=1;return function(p){var o=p.k,n=m++;if(!o){p.k=n;return true}return false}})();return function(m){var s=m.length,n=[],q=-1,o=0,p;for(;o<s;++o){p=m[o];if(l(p)){n[++q]=p}}k+=1;return n}})();function i(q,k,p){var m=-1,o,n=-1,l=[];while((o=q[++m])){if(p.test(o[k])){l[++n]=o}}return l}return d})(); 

/**
 * 扩展对象
 * @param {Object} destination
 * @param {Object} source
 */
KUI.extend = function(destination, source){
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
};
/**
 * 给对象绑定方法
 * @param {Object} object
 * @param {Object} fun
 */
KUI.bind = function(object, fun){
    return function(){
        return fun.apply(object, arguments);
    }
};

/**
 * 浏览器工具
 * @class KUI Browser类(浏览器工具)
 * 判断IE只需要Browser.Engine.trident 为真
 * 判断IE7只需要Browser.Engine.trident5 为真,同理可推
 */
KUI.Browser = {
    //浏览器内核及版本
    Engine: {
        name: 'unknown',
        version: ''
    },
    //浏览器特性,是否支持xpath及air,使用!!将表达式转为布尔值
    Features: {
        xpath: !!(document.evaluate),
        air: !!(window.runtime)
    }
};

//Opera
if (window.opera) 
	KUI.Browser.Engine = {
		name: 'presto',
		version: ((document.getElementsByClassName) ? 950 : 925)
	};
//IE
else 
	if (window.ActiveXObject) {
		KUI.Browser.Engine = {
			name: 'trident',
			version: (window.XMLHttpRequest) ? 5 : 4
		};
	}
	//Safari
	else 
		if (!navigator.taintEnabled) {
			KUI.Browser.Engine = {
				name: 'webkit',
				version: ((KUI.Browser.Features.xpath) ? 420 : 419)
			};
		}
		//Mozilla
		else {
			if (document.getBoxObjectFor != null) 
				KUI.Browser.Engine = {
					name: 'gecko',
					version: ((document.getElementsByClassName) ? 19 : 18)
				};
		}

KUI.Browser.Engine[KUI.Browser.Engine.name] = KUI.Browser.Engine[KUI.Browser.Engine.name + KUI.Browser.Engine.version] = true;
/**
 * 判断是否IE浏览器
 * @deprecated
 */
KUI.isIE = KUI.Browser.Engine.trident;
/**
 * 判断是否IE浏览器
 */
KUI.Browser.isIE = KUI.Browser.Engine.trident;

/**
 * 判断是否Opera浏览器
 * @deprecated
 */
KUI.isOpera = KUI.Browser.Engine.presto;
/**
 * 判断是否Opera浏览器
 */
KUI.Browser.isOpera = KUI.Browser.Engine.presto;
/**
 * 判断是否Safari浏览器
 * @deprecated
 */
KUI.isSafari = KUI.Browser.Engine.webkit;
/**
 * 判断是否Safari浏览器
 */
KUI.Browser.isSafari = KUI.Browser.Engine.webkit;
/**
 * 判断是否Mozilla浏览器
 * @deprecated 
 */
KUI.isMozilla = KUI.Browser.Engine.gecko;
/**
 * 判断是否Mozilla浏览器
 */
KUI.Browser.isMozilla = KUI.Browser.Engine.gecko;

/**
 * 类，必须有initialize函数
 * @class KUI类对象 
 * @example
 * var AClass= KUI.Class.create();
 * AClass.prototype = {
 * 	initialize:function(name,age){
 * 		this.name = name;
 * 		this.age = age;
 * 	},
 * 	say:function(){
 * 		alert(this.name +" is " + this.age +" years old.");
 * 	}
 * };
 * //实例化一个类
 * var c = new AClass('kit',20);
 * c.say();//调用类的一个方法
 */
KUI.Class = {
    create: function(){
        return function(){
            //相当于构造函数
            this.initialize.apply(this, arguments);
        }
    }
};


/**
 * 事件处理
 * @class KUI Event类(事件处理)
 * @constructor 
 * @example
 * var mouseRouter = new KUI.Event.EventRouter(els, eventName);
 * mouseRouter.addListener(fn);
 */
KUI.Event = new Array(), //构造函数
KUI.Event.EventRouter = function(el, eventType){
    //内部维护一个事件列表
    this.listeners = new Array();
    this.el = el;
    el.eventRouter = this;
    //注册回调函数
    el[eventType] = KUI.Event.EventRouter.callback;
};
//回调函数调用notify
KUI.Event.EventRouter.callback = function(event){
    var e = event || window.event;
    var router = this.eventRouter;
    router.notify(e);
};
KUI.Event.EventRouter.prototype = {
    //添加事件
    addListener: function(listener){
        this.listeners.add(listener, true);
    },
    
    //移除事件
    removeListener: function(listener){
        this.listeners.remove(listener);
    },
    
    //通知所有事件
    notify: function(e){
        var listeners = this.listeners;
        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            listener.call(this, e);
        }
    }
};

KUI.Event.bindAsEventListener = function(object, fun){
    return function(event){
        return fun.call(object, (event || window.event));
    }
};
KUI.Event.addEventHandler = function(oTarget, sEventType, fnHandler){
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    }
    else 
        if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, fnHandler);
        }
        else {
            oTarget["on" + sEventType] = fnHandler;
        }
};

KUI.Event.removeEventHandler = function(oTarget, sEventType, fnHandler){
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    }
    else 
        if (oTarget.detachEvent) {
            oTarget.detachEvent("on" + sEventType, fnHandler);
        }
        else {
            oTarget["on" + sEventType] = null;
        }
};

/**  
 * 创建元素
 * @param {String} tagName DOM对象
 * @return {Object} 文本内容
 */
KUI.createElement = function(tagName){
    return document.createElementNS ? document.createElementNS("http://www.w3.org/1999/xhtml", tagName) : document.createElement(tagName);
};


/**  
 * 取得元素
 * @param {String} id 对象id
 * @return {Object} Dom对象
 */
KUI.get = function(id){
    return "string" == typeof id ? document.getElementById(id) : id;
};

/**  
 * 取得元素当前样式
 * @param {String} id 对象id
 * @return {Object} Dom对象
 */
KUI.currentStyle = function(el){
    return el.style ? el.style : el.currentStyle ? el.currentStyle : window.getComputedStyle(el, null);
};

/**  
 * 获取整个文档宽高，返回的是width:宽度；height:高度
 * @return {Object} width:宽度；height:高度
 */
KUI.getDocSize = function(){
    var _Width = (document.compatMode != "CSS1Compat") ? document.body.scrollWidth : document.documentElement.scrollWidth;
    var _Height = (document.compatMode != "CSS1Compat") ? document.body.scrollHeight : document.documentElement.scrollHeight;
    return {
        width: Math.max(_Width, this.getViewportSize().width),
        height: Math.max(_Height, this.getViewportSize().height)
    };
};
/**  
 * 获取文档可视区宽高，返回的是width:宽度；height:高度
 * @return {Object} width:宽度；height:高度
 */
KUI.getViewportSize = function(){
    return {
        width: window.innerWidth ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth,
        height: window.innerHeight ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight
    };
};


/**
 * 设置应用的根目录
 * @example
 * KUI.setAppPath('/kui');
 * KUI.getAppPath();
 * @param {string } path 项目根目录
 */
KUI.setAppPath = function(path){
    KUI.appPath = path;
}
KUI.getAppPath = function(path){
    if (!KUI.appPath) {
        alert('请使用setAppPath()方法初始化应用的路径!');
        return;
    }
    return KUI.appPath;
}


/**
 * 格式化字符串模板
 * @example
 * var str = "{0} loves {1}";
 * KUI.format(str,"Jhon", "Marry");
 * 结果：Jhon loves Marry.
 */
KUI.format = function(){
	var a = [].slice.apply(arguments);
	var s = a.shift();//s为参数中待替换的目标字符串: {0} loves {1}
    return s.replace(/\{[0-9]+\}/g, function(d){
		//d为{0},{1}等
		//d.slice(1, -1)把{0}前后 去掉，剩下数字0,1等
		//a[d.slice(1, -1)]参数中的要替换的值Jhon,Maryr等
        return a[d.slice(1, -1)];
    });
};

//------------扩展Array----------------
/**
 * 扩展Array，添加元素
 * @param {Object} obj
 * @param {Object} nodup
 */
Array.prototype.add = function(obj, nodup){
	if (nodup) {
	    this[this.length] = obj;
	}
};
/**
 * 扩展Array，删除元素
 * @param {Object} obj
 * @param {Object} nodup
 */
Array.prototype.remove = function(o){
	var i = this.indexOf(o);
	if (i > -1) {
	    this.splice(i, 1);
	}
	return (i > -1);
};

//------------扩展，使firefox支持outerHTML----------------
if(typeof(HTMLElement)!="undefined" && !window.opera) 
{ 
    HTMLElement.prototype.__defineGetter__("outerHTML",function() 
    { 
        var a=this.attributes, str="<"+this.tagName, i=0;for(;i<a.length;i++) 
        if(a[i].specified) 
            str+=" "+a[i].name+'="'+a[i].value+'"'; 
        if(!this.canHaveChildren) 
            return str+" />"; 
        return str+">"+this.innerHTML+"</"+this.tagName+">"; 
    }); 
    HTMLElement.prototype.__defineSetter__("outerHTML",function(s) 
    { 
        var r = this.ownerDocument.createRange(); 
        r.setStartBefore(this); 
        var df = r.createContextualFragment(s); 
        this.parentNode.replaceChild(df, this); 
        return s; 
    }); 
    HTMLElement.prototype.__defineGetter__("canHaveChildren",function() 
    { 
        return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/.test(this.tagName.toLowerCase()); 
    }); 
} 

/*-------------- KUI core end -------------------*/


/*-------------- KUI Map start -------------------*/

/**
 * @fileoverview KUI Map的实现
 * @date 2010年6月30日, 10:46:23
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
*/

/**
 * KUI Map
 * @class KUI Map
 * @constructor
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
 * @example
 * var map = new KUI.Map();
 * map.add(key, value);
 */
KUI.Map = KUI.Class.create();
KUI.Map.prototype = {
    initialize: function(options){
        this.map = {}; //initialize with an empty array   
        this.size = 0;
    },
	/**
	 * 元素个数
	 */
    count: function(){
        return this.size;
    },
    get: function(key){
        if (this.exists(key)) {
            return this.map[key];
        }
        else {
            return null;
        }
    },
    add: function(key, value){
        if (!this.exists(key)) {
            this.size++;
        }
        this.map[key] = value;
    },
    remove: function(key){
        var newMap = {};
        for (var i in this.map) {
            if (i != key) {
                newMap[i] = this.map[i];
            }
            else {
                this.size--;
            }
        }
        this.map = newMap;
    },
    removeAll: function(){
        this.map = {};
        this.size = 0;
    },
	/**
	 * 获取Map里的所有元素
	 */	
    items: function(){
        var array = [];
        for (var key in this.map) {
            array.push(this.map[key]);
        }
        return array;
    },
    keys: function(){
        var array = [];
        for (var key in this.map) {
            array.push(key);
        }
        return array;
    },
    exists: function(key){
        if (typeof this.map[key] != "undefined") {
            return true;
        }
        else {
            return false;
        }
    }
}
/*-------------- KUI Map end -------------------*/


/*-------------- KUI Drag start -------------------*/

/**
 * @fileoverview KUI 拖动类(源自互联网)
 * @date 2010年6月30日, 10:46:23
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
*/
/**
 * KUI Drag(源自互联网)
 * @class KUI Drag
 * @constructor
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
 */
KUI.Drag = KUI.Class.create();

KUI.Drag.prototype = {
    /**
	 * 构造函数
	 * @param {Object} drag 被拖动对象(dom 或者id)
	 * @param {Object} options 参数列表
     */
    initialize: function(drag, options){
        this.Drag = KUI.get(drag);
        this._x = this._y = 0;//记录鼠标相对拖放对象的位置
        this._marginLeft = this._marginTop = 0;//记录margin
        //事件对象(用于绑定移除事件)
        this._fM = KUI.Event.bindAsEventListener(this, this.Move);
        this._fS = KUI.bind(this, this.Stop);
        
        this.SetOptions(options);        
        this.Limit = !!this.options.Limit;
        this.mxLeft = parseInt(this.options.mxLeft);
        this.mxRight = parseInt(this.options.mxRight);
        this.mxTop = parseInt(this.options.mxTop);
        this.mxBottom = parseInt(this.options.mxBottom);
        
        this.LockX = !!this.options.LockX;
        this.LockY = !!this.options.LockY;
        this.Lock = !!this.options.Lock;
        
        this.onStart = this.options.onStart;
        this.onMove = this.options.onMove;
        this.onStop = this.options.onStop;
        
        this._Handle = KUI.get(this.options.Handle) || this.Drag;
        this._mxContainer = KUI.get(this.options.mxContainer) || null;
        
        this.Drag.style.position = "absolute";
        //透明
        if (KUI.isIE && !!this.options.Transparent) {
            //填充拖放对象
            with (this._Handle.appendChild(KUI.createElement("div")).style) {
                width = height = "100%";
                backgroundColor = "#fff";
                filter = "alpha(opacity:0)";
                fontSize = 0;
            }
        }
        //修正范围
        this.Repair();
        KUI.Event.addEventHandler(this._Handle, "mousedown", KUI.Event.bindAsEventListener(this, this.Start));
    },
    /**
     *设置默认属性 
     */
    SetOptions: function(options){
    	/**
    	 * 默认属性 
    	 */
        this.options = {//默认值
            Handle: "",//设置触发对象（不设置则使用拖放对象）
            Limit: false,//是否设置范围限制(为true时下面参数有用,可以是负数)
            mxLeft: 0,//左边限制
            mxRight: 9999,//右边限制
            mxTop: 0,//上边限制
            mxBottom: 9999,//下边限制
            mxContainer: "",//指定限制在容器内
            LockX: false,//是否锁定水平方向拖放
            LockY: false,//是否锁定垂直方向拖放
            Lock: false,//是否锁定
            Transparent: false,//是否透明
            /**
             * 开始移动时执行
             */
            onStart: function(){
            },
            /**
             * 移动时执行
             */
            onMove: function(){
            },
            /**
             * 结束移动时执行
             */
            onStop: function(){
            }
        };
        KUI.extend(this.options, options ||
        {});
    },
    
    /**
     * 准备拖动
     * @param {Object} oEvent
     */
    Start: function(oEvent){
        if (this.Lock) {
            return;
        }
        this.Repair();
        //记录鼠标相对拖放对象的位置
        this._x = oEvent.clientX - this.Drag.offsetLeft;
        this._y = oEvent.clientY - this.Drag.offsetTop;
        //记录margin
        this._marginLeft = parseInt(KUI.currentStyle(this.Drag).marginLeft) || 0;
        this._marginTop = parseInt(KUI.currentStyle(this.Drag).marginTop) || 0;
        //mousemove时移动 mouseup时停止
        KUI.Event.addEventHandler(document, "mousemove", this._fM);
        KUI.Event.addEventHandler(document, "mouseup", this._fS);
        if (KUI.isIE) {
            //焦点丢失
            KUI.Event.addEventHandler(this._Handle, "losecapture", this._fS);
            //设置鼠标捕获
            this._Handle.setCapture();
        }
        else {
            //焦点丢失
            KUI.Event.addEventHandler(window, "blur", this._fS);
            //阻止默认动作
            oEvent.preventDefault();
        };
        //附加程序
        this.onStart();
    },
    /**
     * 修正范围
     */
    Repair: function(){
        if (this.Limit) {
            //修正错误范围参数
            this.mxRight = Math.max(this.mxRight, this.mxLeft + this.Drag.offsetWidth);
            this.mxBottom = Math.max(this.mxBottom, this.mxTop + this.Drag.offsetHeight);
            //如果有容器必须设置position为relative或absolute来相对或绝对定位，并在获取offset之前设置
            !this._mxContainer || KUI.currentStyle(this._mxContainer).position == "relative" || KUI.currentStyle(this._mxContainer).position == "absolute" || (this._mxContainer.style.position = "relative");
        }
    },
    /**
     * 拖动
     * @param {Object} oEvent
     */
    Move: function(oEvent){
        //判断是否锁定
        if (this.Lock) {
            this.Stop();
            return;
        };
        //清除选择
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //设置移动参数
        var iLeft = oEvent.clientX - this._x, iTop = oEvent.clientY - this._y;
        //设置范围限制
        if (this.Limit) {
            //设置范围参数
            var mxLeft = this.mxLeft, mxRight = this.mxRight, mxTop = this.mxTop, mxBottom = this.mxBottom;
            //如果设置了容器，再修正范围参数
            if (!!this._mxContainer) {
                mxLeft = Math.max(mxLeft, 0);
                mxTop = Math.max(mxTop, 0);
                mxRight = Math.min(mxRight, this._mxContainer.clientWidth);
                mxBottom = Math.min(mxBottom, this._mxContainer.clientHeight);
            };
            //修正移动参数
            iLeft = Math.max(Math.min(iLeft, mxRight - this.Drag.offsetWidth), mxLeft);
            iTop = Math.max(Math.min(iTop, mxBottom - this.Drag.offsetHeight), mxTop);
        }
        //设置位置，并修正margin
        if (!this.LockX) {
            this.Drag.style.left = iLeft - this._marginLeft + "px";
        }
        if (!this.LockY) {
            this.Drag.style.top = iTop - this._marginTop + "px";
        }
        //附加程序
        this.onMove();
    },
    /**
     * 停止拖动
     */
    Stop: function(){
        //移除事件
        KUI.Event.removeEventHandler(document, "mousemove", this._fM);
        KUI.Event.removeEventHandler(document, "mouseup", this._fS);
        if (KUI.isIE) {
            KUI.Event.removeEventHandler(this._Handle, "losecapture", this._fS);
            this._Handle.releaseCapture();
        }
        else {
            KUI.Event.removeEventHandler(window, "blur", this._fS);
        };
        //附加程序
        this.onStop();
    }
};
/*-------------- KUI Drag end -------------------*/


/*-------------- KUI Animation start -------------------*/

/**
 * @fileoverview KUI 动画(渐显、渐隐)类
 * 感谢：http://www.cnblogs.com/rubylouvre/archive/2009/09/16/1566699.html
 * @date 2009.12.29
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
*/

/**
 * 动画(渐显、渐隐)类
 * @class KUI 动画类(渐显、渐隐、渐大、渐小、移动)
 * @constructor
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
 * @example
 * 渐显：KUI.Animation.fadeIn(el);
 * 渐隐：KUI.Animation.fadeOut(el, function(){
 * 			alert('finished!');
 * 		});
 */
KUI.Animation = {
	/**
	 * 渐显函数
	 * @param {Object} id dom元素id或者元素本身
	 * @param {Function} callback 回调函数
	 * @example
	 * KUI.Animation.fadeIn(el, function(){
	 * 		alert('finished!');
	 * }); 
	 */
    fadeIn: function(id, callback){
        this.fade({
            id: id,
            begin: 0,
            end: 100,
            duration: 500,
            callback: callback
        });
    },
	/**
	 * 渐隐函数
	 * @param {Object} id dom元素id或者元素本身
	 * @param {Function} callback 回调函数
	 * @example
	 * KUI.Animation.fadeOut(el, function(){
	 * 		alert('finished!');
	 * }); 
	 */
    fadeOut: function(id, callback){
        this.fade({
            id: id,
            begin: 100,
            end: 0,
            duration: 500,
            callback: callback
        });
    },
	/**
	 * 渐显渐显函数，可设定开始透明和结果透明度
	 * @param {Object} options {<br/>
	 * id: dom元素或者元素id, <br/>
	 * begin: 初始值(1-100), <br/>
	 * end: 结束值, <br/>
	 * duration: 持续时间, <br/>
	 * effectName: 效果名称(Tween属性swingTo,bounce,bouncePast,easeFromTo,easeFrom,easeTo,linear),<br/> 
	 * callback: 回调函数<br/>
	 * }
	 * @example
	 * KUI.Animation.fade({
	 * 	id: dom元素或者元素id, 
	 * 	begin: 初始值(1-100), 
	 * 	end: 结束值, 
	 * 	duration: 持续时间, 
	 * 	effectName: 缓动公式(Tween属性swingTo,bounce,bouncePast,easeFromTo,easeFrom,easeTo,linear), 
	 * 	callback: function(){
	 * 		}
	 * 	}); 
	 */	
    fade: function(options){
        var id = options.id, begin = options.begin, end = options.end, duration = options.duration, effectName = options.effectName, callback = options.callback;
        this.transition(id, {
            begin: begin,
            change: end - begin,
            duration: duration ? duration : 500,
            field: 'opacity',
            effectName: effectName ? effectName : 'easeTo',
            callback: callback
        });//easeOutSine
    },
	/**
	 * 移动函数
	 * @param {Object} options {<br/>
	 * id: 待移动元素的id, <br/>
	 * x: 目标位置水平坐标, <br/>
	 * y: 目标位置垂直坐标, <br/>
	 * duration: 持续时间，单位毫秒, <br/>
	 * effectName: 过渡效果的名称<br/>
	 * }
	 * @example
	 * KUI.Animation.move({
     * 	id: 待移动元素的id
     * 	x: 目标位置水平坐标
     * 	y: 目标位置垂直坐标
	 * 	duration: 持续时间, 
	 * 	effectName: 缓动公式(Tween属性swingTo,bounce,bouncePast,easeFromTo,easeFrom,easeTo,linear), 
	 * 	callback: function(){
	 * 		}
	 * }); 
	 */		
    move: function(options){
        var id = options.id, x = options.x, y = options.y, duration = options.duration, effectName = options.effectName, callback = options.callback;
        
        var target = (typeof id == "string" ? KUI("#" + id) : KUI(id));
        var pos = target.getPos();
        //x轴
        this.transition(id, {
            begin: pos.x,
            change: x - pos.x,
            duration: duration ? duration : 300,
            field: 'left',
            effectName: effectName ? effectName : 'easeTo'
        });//easeOutSine
        //y轴
        this.transition(id, {
            begin: pos.y,
            change: y - pos.y,
            duration: duration ? duration : 300,
            field: 'top',
            effectName: effectName ? effectName : 'easeTo',
            callback: callback
        });
    },
	/**
	 * 改大小缓动函数
	 * @param {Object} id id或者dom元素本身
	 * @param {Object} w 宽度
	 * @param {Object} h 高度
	 * @param {Object} duration 持续时间
	 * @param {Object} effectName 效果名称
	 * @param {Object} callback 回调函数
	 */
    resize: function(id, w, h, duration, effectName, callback){
        var target = (typeof id == "string" ? KUI("#" + id) : KUI(id));
        var size = target.getSize(), oldPos = target.getPos();
        //宽度
        this.transition(id, {
            begin: size.width,
            change: w - size.width,
            duration: duration ? duration : 300,
            field: 'width',
            effectName: effectName ? effectName : 'easeTo'
        });
        //高度
        this.transition(id, {
            begin: size.height,
            change: h - size.height,
            duration: duration ? duration : 300,
            field: 'height',
            effectName: effectName ? effectName : 'easeTo',
            callback: callback
        });
    },
    /**
     * 针对width, height, left, top的通用缓动函数
     * @param {Object} id 元素id
     * @param {Object} options {<br/>
     * 	begin:开始位置, <br/>
     * 	change: 变化量, <br/>
     * 	duration: 缓动效果持续时间(毫秒)默认500, <br/>
     * 	field: 必须指定(top,left,width,height) , <br/>
     * 	ftp: 频率 ，默认50, <br/>
     * 	effectName: 要使用的缓动公式,默认为linear<br/>
     * }
     */
    transition: function(id, options){
        var target = KUI.get(id), 
		begin = options.begin,//开始位置
		change = options.change,//变化量
		duration = options.duration || 500,//缓动效果持续时间
		field = options.field,//必须指定，基本上对top,left,width,height这个属性进行设置
		ftp = options.ftp || 50, effectName = options.effectName || 'linear',//要使用的缓动公式
		end = begin + change,//结束位置
		callback = options.callback,//回调函数
		startTime = new Date().getTime();//开始执行的时间
        (function(){
            setTimeout(function(){
                var newTime = new Date().getTime(),//当前帧开始的时间
     			timestamp = newTime - startTime,//逝去时间
                delta = Tween[effectName](timestamp / duration);
                if (field == 'opacity') {
                    target.style.opacity = (Math.ceil(begin + delta * change) / 100);
                    target.style.filter = 'alpha(opacity=' + (Math.ceil(begin + delta * change)) + ')';
                    if (duration <= timestamp) {
                        target.style.opacity = (end / 100);
                        target.style.filter = 'alpha(opacity=' + end + ')';
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                    else {
                        setTimeout(arguments.callee, 1000 / ftp);
                    }
                }
                else {
                    target.style[field] = Math.ceil(begin + delta * change) + "px";
                    if (duration <= timestamp) {
                        target.style[field] = end + "px";
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                    else {
                        setTimeout(arguments.callee, 1000 / ftp);
                    }
                }
            }, 1000 / ftp);
        })();
    }
}
/*-------------- KUI Animation end -------------------*/


/*-------------- KUI Dialog start -------------------*/

/**
* @fileoverview KUI 弹出窗口
 * @date 2009.12.29
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
*/

/**
* KUI 弹出窗口<br>
* 示例：<br>
* var t2 = new KUI.Dialog({<br>
* 	width:200, <br>
* 	height:100, <br>
* 	title:"编辑新闻", <br>
* 	content: "感觉你写这个东西好像没有什么用吧?"<br>
* });<br><br>
* <b>参数说明：</b><br>
* id: 指定id(非必要),<br>
* width: 宽度,<br>
* height: 高度(非必要),<br>
* title: 标题,<br>
* content: 内容(支持html),<br>
* url: 直接打开网址，一般content与url只填一个，如果两者都有会优先url,<br>
* autoClose: 自动关闭时间(秒)(非必要),<br>
* hasEffect: 是否有效果(非必要),<br>
* autoSize: 打开一个url时是否自动适应内容页面的大小(非必要),<br>
* visible: 创建窗口时默认是否显示(非必要),<br>
* onClose: 关闭后执行的函数(非必要),<br>
* param: 接受传递过来的参数，用于传递参数(非必要)<br>
* @class KUI 弹出窗口
* @constructor
*/	
KUI.Dialog = KUI.Class.create();
KUI.Dialog.prototype = {
	/**
	 * 默认的构造方法
	 * @param options {<br>
	 * id: 指定id(非必要),<br>
	 * width: 宽度,<br>
	 * height: 高度(非必要),<br>
	 * title: 标题,<br>
	 * content: 内容(支持html),<br>
	 * url: 直接打开网址，一般content与url只填一个，如果两者都有会优先url,<br>
	 * autoClose: 自动关闭时间(秒)(非必要),<br>
	 * hasEffect: 是否有效果(非必要),<br>
	 * autoSize: 打开一个url时是否自动适应内容页面的大小(非必要),<br>
	 * visible: 创建窗口时默认是否显示(非必要),<br>
	 * onClose: 关闭后执行的函数(非必要),<br>
	 * param: 接受传递过来的参数，用于传递参数(非必要)<br>
	 * }
	 */	 
	initialize: function(options){
		this.setOption(options||{});
		this.dialog = KUI.createElement("div");
		this.dialog.className = "Dialog";
		this.dialog.id = "dialog_"+this.id;
		var w = this.width, h = this.height;
		KUI(this.dialog).setStyle({width:w,height:h,position:"absolute",left:"-500px",top:"-100px",display:"none"});
		//this.dialog.style.zIndex = 1000;
		
		//顶部(icon，标题，关闭按钮)
		this.dialogHandler = KUI.createElement("div");
		this.dialogHandler.className = "DialogHandler";
		this.dialogHandler.id = "dialogHandler_"+this.id;
		//鼠标放到标题栏的时候变成为十字形状，ie不支持在css里面写
		this.dialogHandler.setAttribute("onmouseover", "this.style.cursor='move';");
		
		//icon图标
		this.dialogIcon = KUI.createElement("div");
		this.dialogIcon.className = "DialogIcon";
		
		this.dialogHandler.appendChild(this.dialogIcon);
       
		//关闭图标
		this.dialogCloseBtn = KUI.createElement("div");
		this.dialogCloseBtn.className = "DialogCloseBtn";
		this.dialogCloseBtn.setAttribute("onmouseover", 'KUI(this).addClass("DialogCloseBtn-over");');
		this.dialogCloseBtn.setAttribute("onmouseout", 'KUI(this).removeClass("DialogCloseBtn-over");');
		this.dialogCloseBtn.setAttribute("onmousedown", 'KUI(this).addClass("DialogCloseBtn-down");');
		this.dialogCloseBtn.setAttribute("onmouseup", 'KUI(this).removeClass("DialogCloseBtn-down");');
		var ID = this.id;
		this.dialogCloseBtn.setAttribute("onclick",'KUI.Dialog.Manager.close("'+ID+'")');
		
		this.dialogHandler.appendChild(this.dialogCloseBtn);
		
		//标题
		this.dialogTitle = KUI.createElement("div");
		this.dialogTitle.className = "DialogTitle";
		this.dialogTitle.id = "dialogTitle_"+this.id;
		this.dialogTitle.innerHTML = this.title;
		
		this.dialogHandler.appendChild(this.dialogTitle);
		
		
		//内容部分
		this.dialogContent = KUI.createElement("div");
		this.dialogContent.className = "DialogContent";
		this.dialogContent.className = "DialogContent";
		this.dialogContent.id = "dialogContent_"+this.id;
		
		//如果填写了网址，则创建一个iframe显示
		if(this.url){
			var dialogContentIframeHTML = '<iframe scrolling="no" frameborder="0" class="DialogContentIframe" id="dialogContentIframe_'+this.id+'" onload="';
			//如果设置了高度并且没设置自动大小，则把该高度设置为最大高度
			if(parseInt(h) > 0 && !this.autoSize) {
				this.dialogContent.style.height = (parseInt(h)-43)+"px";
			}else{//自适应内容
				//如果没设置高度则，通过给定的宽度自动计算高度，但最高不起过浏览器可视区域高度，超过则出现滚动条
				//this.dialogContent.style.height = (parseInt(KUI.getViewportSize().height)-43)+"px";
				var vHieght = parseInt(KUI.getViewportSize().height);
				//左右外边9px*2，上下外边34px+9px
				dialogContentIframeHTML += 'var id = '+this.id+'; var frameId = this.id; var frameDoc = KUI.Dialog.getIFrameDocument(frameId); var d = KUI.Dialog.Manager.get(id);  d.setSize(parseInt(frameDoc.body.scrollWidth)+18,parseInt(frameDoc.body.scrollHeight)>'+vHieght+'?'+vHieght+':parseInt(frameDoc.body.scrollHeight)+43, function(){var contentIframe=KUI.get(frameId);contentIframe.style.height =frameDoc.body.scrollHeight+\'px\'; contentIframe.style.width = frameDoc.body.scrollWidth+\'px\';var dom = KUI(\'input\', frameDoc.body).getDom();if(dom){dom.focus();}}); ';
			}
			dialogContentIframeHTML += '" src="'+this.url+'" ></iframe>';
			this.dialogContent.innerHTML = dialogContentIframeHTML;
			
		}else{
			this.dialogContentText = KUI.createElement("div");
			this.dialogContentText.className = "DialogContentText";
			this.dialogContentText.innerHTML = this.content;
			this.dialogContent.appendChild(this.dialogContentText);
		}

		var html = KUI.Dialog.getDialogHTML(this.dialogHandler, this.dialogContent, this.id);
		this.dialog.innerHTML = html;
		
		document.body.appendChild(this.dialog);
		//加入到管理器当中
		KUI.Dialog.Manager.add(this);		
		//显示窗口
		this.show();
		//居中
		this.center();
		
		//ie6 fix
		if (KUI.Browser.Engine.trident4) {
			//png fix
			pngfix();
			//是ie6的话创建一个iframe，遮盖select等元素
			this.dialogIframe = KUI.createElement("iframe");
			this.dialogIframe.className = "DialogIframe";
			this.dialogIframe.id = "dialogIframe_"+this.id;
			this.dialogIframe.style.filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';				
			this.dialogIframe.style.height=this.height;
			this.dialog.appendChild(this.dialogIframe);
		}	
		//自动关闭
        if (this.autoClose && this.autoClose > 0) {
			var t = this;
			var i = this.autoClose;
			var title = KUI.get(t.dialogTitle.id);
			if(title){
				var tt = title.innerHTML;
	            setTimeout((function(){
					if (--i > 0) {
						title.innerHTML = tt+"("+i+")秒";
						setTimeout(arguments.callee,1000);
					}
					else {
						t.close();
					}
	            }), 1000);
            }
        }
		this.setSize(parseInt(this.width), parseInt(this.height));
		//拖动
        (function(THIS){
            var WH = KUI.getViewportSize();
            new KUI.Drag(THIS.dialog.id, {
                Handle: THIS.dialogHandler.id,
                Limit: true,
                mxRight: WH.width
            });
            //当页面滚动时，保持位置一样
            if (document.all) {
                window.attachEvent('onscroll', function(){
                	KUI.Dialog.fixPos(THIS.id);
                });
                window.attachEvent('onresize', function(){
					var mask = KUI.get("dialogMask_"+THIS.id);
					if (mask) {
						var WH = KUI.getDocSize();
						mask.style.width = WH.width +"px";
						mask.style.height = WH.height+ "px";
					}
					KUI.Dialog.fixPos(THIS.id);
				});
            }
            else {
                window.addEventListener('scroll', function(){
                    KUI.Dialog.fixPos(THIS.id);
                }, false);
                window.addEventListener('resize', function(){
					var mask = KUI.get("dialogMask_"+THIS.id);
					if (mask) {
						var WH = KUI.getDocSize();
						mask.style.width = WH.width +"px";
						mask.style.height = WH.height+ "px";
					}
					KUI.Dialog.fixPos(THIS.id);
				}, false);
            }
            
        })(this);
	},
	setOption: function(options){
		this.id = options.id||""+Math.round(Math.random()*10000);//id
		this.title = options.title||"弹出窗口";//标题
		this.width = (parseInt(options.width)||500)+"px";//宽度
		this.autoClose = options.autoClose;//自动关闭时间,单位秒
		this.onClose = options.onClose;//关闭后执行的函数
		this.content = options.content||"there is no message to display.";//内容，可为html
		this.url = options.url;//直接打开网址
		this.hasEffect = options.hasEffect||true;//是否有效果
		this.autoSize = options.autoSize||false;//打开一个url时是否自动适应内容页面的大小
		this.visible = options.visible||false;//创建窗口时默认是否显示
		//接受传递过来的参数
		this.param = options.param||{};//用于是传递参数
		this.height = (parseInt(options.height)?(parseInt(options.height)+"px"):"auto");//高度
		if (!this.url) {
			//如果设置了高度并且没设置自动大小，则把该高度设置为最大高度
			var dHeight = 0;//窗口高度
			if (parseInt(options.height) > 0 && !this.autoSize) {
				this.height = parseInt(options.height)+"px";
			}
			else {
				//如果没设置高度则，通过给定的宽度自动计算高度，但最高不起过浏览器可视区域高度，超过则出现滚动条
				//this.dialogContent.style.height = (parseInt(KUI.getViewportSize().height)-43)+"px";
				//this.dialogContent.style.overflow = "auto";
				//通过计算内容加载到body中来计算高度，自适应内容
				var vHieght = parseInt(KUI.getViewportSize().height);
				dHeight = parseInt(KUI.Dialog.getDivHeight(this.content, parseInt(this.width) - 18));
				this.height = (dHeight + 43 > vHieght ? vHieght : dHeight + 43);//加上标题栏高度和底部背景高度
			}
		}
	},
	/**
	 * 显示窗口
	 */	
	show: function(){
		this.showMask();
        this.dialog.style.display = "";		
		this.dialog.style.visibility = "visible";
	},
	/**
	 * 显示灰色背景
	 */	
	showMask: function(){
		//黑色背景
        this.mask = KUI.createElement('div');
        this.mask.id = "dialogMask_"+this.id;
        this.mask.className = "DialogMask";
        document.body.appendChild(this.mask);
		var WH = KUI.getDocSize();	
        KUI(this.mask).setStyle('width:'+WH.width+'px;height:'+WH.height+'px').setPos(0,0);
		KUI.Animation.fade({id:this.mask,begin:0,end:20,duration:1000});
	},
	/**
	 * 销毁窗口
	 */
    close: function(){
        //从管理器中删除记录
        KUI.Dialog.Manager.remove(this.dialog.id);
		var THIS = this;
        if (this.hasEffect) {
			KUI.Animation.fadeOut(THIS.dialog);
			KUI.Animation.fadeOut(THIS.mask, function(){
					try{
						THIS.mask.innerHTML = null;
						THIS.dialogContent.innerHTML= null;
						THIS.dialog.innerHTML = null;
						var m = document.getElementById(THIS.mask.id);
						if(m){
							document.body.removeChild(m);
						}
						var d = document.getElementById(THIS.dialog.id);
						if(d){
							document.body.removeChild(d);
						}
						
					}catch(e){
					}
				});
		}
		else {
			try{
				THIS.mask.innerHTML = null;
				THIS.dialogContent.innerHTML= null;
				THIS.dialog.innerHTML = null;
				var m = document.getElementById(THIS.mask.id);
				if(m){
					document.body.removeChild(m);
				}
				var d = document.getElementById(THIS.dialog.id);
				if(d){
					document.body.removeChild(d);
				}
			}catch(e){
			}
			CollectGarbage(); 
		}
		if(this.onClose){
			this.onClose();
		}
    },
	/**
	 * 运行时动态改变标题
	 * @param {Object} title
	 */
	setTitle: function(title){
		KUI.get("dialogTitle_"+this.id).innerHTML = title;
	},
	/**
	 * 运行时动态改变内容
	 * @param {Object} content
	 */
	setContent: function(content){
		KUI.get("dialogContent_"+this.id).innerHTML = content;
	},
	/**
	 * 取内容部分的dom
	 */	
	getContentDiv: function(){
		return KUI.get("dialogContent_"+this.id);
	},
	/**
	 * 设置窗口的位置
	 */	
    setPos: function(x, y){
        if (x && y) {
            KUI(this.dialog).setStyle({position:"absolute",left: x + "px",top:y + "px"});
        }
    },
	/**
	 * 设置窗口的尺寸
	 */	
	setSize: function(w, h, callback){
        if (w && h) {
        	var WH = KUI.getViewportSize();	
        	if(h > WH.height){
        		h = WH.height;
        	}
			this.dialog.style.width = w + "px";
			this.dialog.style.height = h + "px";
			
			if (this.dialogIframe) {
				this.dialogIframe.style.height = w + "px";
				this.dialogIframe.style.height = h + "px";
			}
			//middle
			var middle = KUI.get('dialogMiddle_'+this.id);
			middle.style.width = w + "px";
			middle.style.height = (h-43) + "px";
			
			//content
			var content = KUI.get(this.dialogContent.id);
			content.style.width = (w-18) + "px";
			content.style.height = (h-43) + "px";
			content.style.overflowY = "auto";
			content.style.overflowX = "hidden";
			//重新居中
			this.center(callback);
        }
    },
    setContentIframeSize: function(w, h){
     var contentIframe = KUI("#dialogContentIframe_"+this.id);
     if(contentIframe.size() > 0){
     	contentIframe.setStyle({width:parseInt(w)+"px",height:parseInt(h)+"px"})
     }
    },
	/**
	 * 重新设置窗口的位置
	 */		
    resize: function(w, h, callback){
        if(h > WH.height){
       		h = WH.height;
       	}
        if (this.hasEffect) {
            //ie6 fix
			if (this.dialogIframe) {
				KUI.Animation.resize('dialogIframe_' + this.id, w, h, 500, 'easeTo');
			}
			
	         KUI.Animation.resize('dialogMiddle_'+this.id, w, h-43, 500, 'easeTo');
			 KUI.Animation.resize(this.dialogContent.id, w-18, h-43, 500, 'easeTo');
			 
			 (function(THIS){
			 	KUI.Animation.resize(THIS.dialog.id, w, h, 500, 'easeTo', function(){
			 	THIS.center();
			 });
			 })(this);
        }
        else {
            this.setSize(w, h);
        }
        if(callback){
        	callback();
        }
    },
	/**
	 * 移动窗口
	 */		
    move: function(x, y, callback){
        if (this.hasEffect) {
			var THIS = this;
			KUI.Animation.move({
				id: THIS.dialog.id,
				x: x,
				y: y,
				callback:callback
			});
		}else{
			this.setPos(x, y);
			if(callback){
				callback();
			}
		}
    },
	/**
	 * 设置窗口居中
	 */		
	center: function(callback){
		var WH = KUI.getViewportSize();	
		var size = KUI("#"+this.dialog.id).getSize();
		var left = (WH.width - size.width)/2; 
		var top = (WH.height - size.height)/2;
		top += Math.max(document.body.scrollTop,document.documentElement.scrollTop);//当页面滚动时
		left += Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);//当页面滚动时
		if (this.hasEffect) {
			var THIS = this;
			KUI.Animation.move({
				id: THIS.dialog.id,
				x: left,
				y: top,
				callback:callback
			});
		}else{
			this.setPos(left, top);
			if(callback){
				callback();
			}
		}
	}
}
/**
 * 管理器，方便统一管理已经创建的窗口(例如从外部关闭某个窗口)
 */
KUI.Dialog.Manager = {};
KUI.Dialog.Manager.pool = new KUI.Map();
KUI.Dialog.Manager.size = function(){
    return KUI.Dialog.Manager.pool.count();
};
KUI.Dialog.Manager.add = function(dialog){//dialog为dialog对象，不是dialog div的id
    KUI.Dialog.Manager.pool.add(dialog.id, dialog);
};
KUI.Dialog.Manager.get = function(id){
    return KUI.Dialog.Manager.pool.get(id);
};
KUI.Dialog.Manager.remove = function(id){
    KUI.Dialog.Manager.pool.remove(id);
};
KUI.Dialog.Manager.close = function(id){
	var d = KUI.Dialog.Manager.get(id);
    //从管理器中删除记录
    KUI.Dialog.Manager.remove(id);
	d.close();    
}
KUI.Dialog.getDialogHTML = function(handlerDiv, contentDiv, id){
	return '<div class="DialogTC"><span>'+(handlerDiv?handlerDiv.outerHTML:"")+'</span></div><span class="DialogTL"></span><span class="DialogTR"></span><div class="DialogMiddle" id="dialogMiddle_'+id+'"><span class="DialogML"></span><span class="DialogMR"></span>'+(contentDiv?contentDiv.outerHTML:"")+'</div><div class="DialogBC"><span></span></div><span class="DialogBL"></span><span class="DialogBR"></span>'; 
};
/**
 * 获取Iframe子窗口的document对象
 */	
KUI.Dialog.getIFrameDocument = function(aID){
    var rv = null;
    var frame = KUI.get(aID);
    // if contentDocument exists, W3C compliant (e.g. Mozilla)
    if (frame && frame.contentDocument) {
        rv = frame.contentDocument;
    }
    else { // bad IE  ;)
        rv = document.frames[aID].document;
    }
    return rv;
}

/**
 * 获取div高度
 * @param {Object} content
 * @param {Object} width
 */
KUI.Dialog.getDivHeight = function(content, width){
    var dHeight = 0;
    var testSize = KUI.createElement("div");
    testSize.style.width = parseInt(width) + "px";
    testSize.innerHTML = content;
    document.body.appendChild(testSize);
    dHeight = parseInt(KUI(testSize).getSize().height);
    document.body.removeChild(testSize);
    return dHeight;
}

/**
 * 当滚动时保持div位置
 * @param {Object} DIALOGID
 */
KUI.Dialog.fixPos = function(DIALOGID){
	var d = KUI.Dialog.Manager.get(DIALOGID);
	if(!d)return;
	var WH = KUI.getViewportSize(),
		target = KUI(d.dialog),
		size = target.getSize(),
		pos = target.getPos();//原来相对于是屏幕的位置
        var sTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);//当页面滚动时
        var sLeft = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);//当页面滚动时
        //相对于可视区域的位置
        var left = (WH.width - size.width) / 2, top = (WH.height - size.height) / 2;
        if ((pos.x != (left + sLeft)) || (pos.y != (top + sTop))) {
            if (this.hasEffect) {
                KUI.Animation.move({
                    id: d.dialog.id,
                    x: left + sLeft,
                    y: top + sTop
                });
            }
            else {
                d.setPos(left + sLeft, top + sTop);
            }
            
        }
}

/**
* KUI 提示确认窗口<br>
* var t2 = new KUI.Confirm({<br>
* &nbsp;&nbsp;&nbsp;&nbsp;title:"编辑新闻", <br>
* &nbsp;&nbsp;&nbsp;&nbsp;content: "感觉你写这个东西好像没有什么用吧?",<br>
* &nbsp;&nbsp;&nbsp;&nbsp;onOk:function(){<br>
* &nbsp;&nbsp;&nbsp;&nbsp;}<br>
* });<br>
* 参数列表：<br>
* {title:标题, content:内容, onOk: 按‘确定’之后执行函数, onCancel: 按‘取消’之后执行函数, [, width:宽度, height:高度, autoClose:自动关闭时间(秒), onClose:关闭后执行]}
* @class KUI 提示确认窗口
* @constructor
*/	
KUI.Confirm = function(options){
	
	var tempH = KUI.Dialog.getDivHeight(options.content, options.width||300),
	height = ((tempH<100?80:tempH)+43+30);
	//alert(tempH + "," + height)		
	//标题+底部=43，按钮栏=30
	var d = new KUI.Dialog({title:options.title||"系统提示",content:options.content, width:options.width||300,height:height,autoClose:options.autoClose,onClose:options.onClose}),
	contentDiv = d.getContentDiv(),
	cs = contentDiv.style;
	contentDiv.innerHTML = "";
	
	//内容区 position:relative; top:-50%; left:0;
	var cDiv = KUI.createElement("div");
	cDiv.className = "DialogAlertContentDiv";		
	cDiv.innerHTML = options.content;
	cds = cDiv.style;
	cds.position = "relative";
	
	contentDiv.appendChild(cDiv);
	//垂直居中显示
	cds.top = (height-tempH-73)/2 + "px";
	
	//按钮区
	var btnDiv = KUI.createElement("div");
	btnDiv.className = "DialogAlertBtnDiv";		
	contentDiv.parentNode.insertBefore(btnDiv,contentDiv.nextSibling);//加到contentDiv后面
	
	//加入按钮
	btnDiv.innerHTML = '<a class="button" href="javascript:void(0)" onclick="this.blur(); return false;"><span>&nbsp;&nbsp;确定&nbsp;&nbsp;</span></a>';
	btnDiv.innerHTML += '<a class="button" href="javascript:void(0)" onclick="this.blur(); return false;"><span>&nbsp;&nbsp;取消</span></a>';
	/**
	 * 为自定义按钮加onclick事件
	 */
	btnDiv.childNodes[0].onclick = function(){
		this.blur();
		//如果定义了事件则执行相应的事件函数
		if (options.onOk) {
			options.onOk();
		}
		d.close();
		return false;
	}
	/**
	 * 为自定义按钮加onclick事件
	 */
	btnDiv.childNodes[1].onclick = function(){
		this.blur();
		//如果定义了事件则执行相应的事件函数
		if (options.onCancel) {
			options.onCancel();
		}
		d.close();
		return false;
	}
} 


/**
* KUI 信息提示窗口<br>
* 示例：<br>
* var t2 = new KUI.Alert({<br>
* &nbsp;&nbsp;&nbsp;&nbsp;title:"编辑新闻", <br>
* &nbsp;&nbsp;&nbsp;&nbsp;content: "感觉你写这个东西好像没有什么用吧?",<br>
* &nbsp;&nbsp;&nbsp;&nbsp;onOk:function(){<br>
* &nbsp;&nbsp;&nbsp;&nbsp;}<br>
* });<br>
* 参数列表 {title:标题, content:内容, onOk: 按‘确定’之后执行函数 [, width:宽度, height:高度, autoClose:自动关闭时间(秒), onClose:关闭后执行]}
* @class KUI 提示确认窗口
* @constructor
*/	
KUI.Alert = function(options){
	
	var tempH = KUI.Dialog.getDivHeight(options.content, options.width||300),
	height = ((tempH<100?80:tempH)+43+30);
	//alert(tempH + "," + height)		
	//标题+底部=43，按钮栏=30
	var d = new KUI.Dialog({title:options.title||"系统提示",content:options.content, width:options.width||300,height:height,autoClose:options.autoClose,onClose:options.onClose}),
	contentDiv = d.getContentDiv(),
	cs = contentDiv.style;
	contentDiv.innerHTML = "";
	
	//内容区 position:relative; top:-50%; left:0;
	var cDiv = KUI.createElement("div");
	cDiv.className = "DialogAlertContentDiv";		
	cDiv.innerHTML = options.content;
	cds = cDiv.style;
	cds.position = "relative";
	
	contentDiv.appendChild(cDiv);
	//垂直居中显示
	cds.top = parseInt((height-tempH-73)/2) + "px";
	
	//按钮区
	var btnDiv = KUI.createElement("div");
	btnDiv.className = "DialogAlertBtnDiv";		
	contentDiv.parentNode.insertBefore(btnDiv,contentDiv.nextSibling);//加到contentDiv后面
	
	//加入按钮
	btnDiv.innerHTML = '<a class="button" href="javascript:void(0)" onclick="this.blur(); return false;"><span>&nbsp;&nbsp;确定&nbsp;&nbsp;</span></a>';
	/**
	 * 为自定义按钮加onclick事件
	 */
	btnDiv.childNodes[0].onclick = function(){
		this.blur();
		//如果定义了事件则执行相应的事件函数
		if (options.onOk) {
			options.onOk();
		}
		d.close();
		return false;
	}
} 
/*-------------- KUI Dialog end -------------------*/


/*-------------- KUI Loading start -------------------*/

/**
 * @fileoverview KUI Loading类
 * @date 2010年6月30日, 10:46:23
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
*/

/**
 * KUI Loading类
 * @class KUI Loading
 * @constructor
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
 * @example
 * var loading = new KUI.Loading(); 
 * loading.show()
 */
KUI.Loading = KUI.Class.create();
KUI.Loading.prototype = {
    /**
	 * 实现默认的构造方法
     */		
    initialize: function(){
        if (KUI("#loading").size() < 1) {
            //loading div
            var loading = KUI.createElement('div');
            document.body.appendChild(loading);
            loading.innerHTML = "正在加载数据... ";
            loading.setAttribute("id", "loading");
            this.loading = KUI("#loading").setStyle('position:absolute;z-index:10000; border:#888 solid 5px;width:100px;height:22px;padding-top:5px;padding-left:20px;line-height:12px;font:normal 12px arial,sans-serif;background:#fff url("' + KUI.getAppPath() + '/images/main/Loading.gif") 2px 50% no-repeat').center();
            //loading黑色背景
            var loadingMask = KUI.createElement('div');
            document.body.appendChild(loadingMask);
            loadingMask.setAttribute("id", "loadingMask");
			var WH = KUI.getDocSize();	
            this.loadingMask = KUI("#loadingMask").setStyle('position:absolute;z-index:9999;background:#000;display:none;padding:0;margin:0;width:'+WH.width+'px;height:'+WH.height+'px').setOpacity(10).setPos(0, 0);
            this.hide();
        }
    },
	/**
	 * 显示loading
	 */
    show: function(){
        this.loading.setStyle({
            'display': ''
        });
        this.loadingMask.setStyle({
            'display': ''
        });
    },
	/**
	 * 隐藏loading
	 */    
    hide: function(){
        this.loading.setStyle({
            'display': 'none'
        });
        this.loadingMask.setStyle({
            'display': 'none'
        });
    }
}
/*-------------- KUI Loading end -------------------*/

/*-------------- KUI Tip start -------------------*/

/**
* @fileoverview KUI Tip带箭头的提示信息
 * @date 2010-6-25
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
*/

/**
* KUI Tip带箭头的提示信息
* @class KUI Tip带箭头的提示信息
* @constructor
* @example
* var t = new KUI.Tip({
* 	id:"tip_123", 
* 	showTo: field, 
* 	content: msg
* });
* t.hide(); 
*/	
KUI.Tip = KUI.Class.create();
KUI.Tip.prototype = {
	    /**
		 * 实现默认的构造方法
		 * @param {Object} {<br/>
		 * 	id: 给定id(非必要),<br/>
		 *  autoHide: 自动隐藏时间(秒),<br/>
		 *  showTo: id,即在某个元素下面显示,<br/>
		 *  content: 显示的内容<br/>
		 * }
	     */	
		initialize: function(options){
		this.setOption(options||{});
		//创建三个div
		this.tip = KUI.get(this.id)?KUI.get(this.id):KUI.createElement("div");
		this.tip.id = this.id;
		this.tip.className = "tip";
		
		var tipArrow = KUI.createElement("div");
		tipArrow.className = "tipArrow";
		this.tipContent = KUI.createElement("div");
		this.tipContent.className = "tipContent";
		this.tip.appendChild(tipArrow);
		this.tip.appendChild(this.tipContent);
		this.tip.style.display = "none";
		if(this.showToElement){
			this.showTo(this.showToElement,this.content);
		}else {
			document.body.appendChild(this.tip);
		}
	},
	setOption: function(options){
		this.id = options.id||"tip_"+Math.round(Math.random()*10000);
		this.autoHide = options.autoHide;
		this.showToElement = options.showTo;
		this.content = options.content||"message content.";
	},
	/**
	 * 显示到某个位置
	 * @param {int} x 水平坐标
	 * @param {int} y 垂直坐标
	 * @param {String} content 内容
	 */
	show: function(x, y, content){
		this.setContent(content);
		KUI(this.tip).setStyle({position:"absolute", left: x+"px", top: y+"px", display: ""});
		KUI.Animation.fadeIn(this.tip);
		if(this.autoHide){
			//利用闭包向setTimeout传递参数
	        setTimeout((function(t){
	            return (function(){
	                t.hide();
	            });
	        })(this), this.autoHide*1000);
		}
	},
	/**
	 * 显示到某个元素下
	 * @param {Object} target 目标元素
	 * @param {String} content 内容
	 */
	showTo: function(target, content){
		var tObj = KUI(typeof target == "object"? target: "#"+target);
		var pos = tObj.getPos();//获取目标的坐标
		var size = tObj.getSize();//获取目标的尺寸
		this.setContent(content);
		
		tDom = tObj.getDom();
		tDom.parentNode.insertBefore(this.tip,tDom.nextSibling);//加到目标dom后面
		//KUI(this.tip).setStyle({position:"absolute", left: (pos.x+size.width)+"px", top: pos.y+"px", display: ""});
		KUI(this.tip).setStyle({display: ""});//在目标元素的下方显示
		KUI.Animation.fadeIn(this.tip);
		if(this.autoHide){
			//利用闭包向setTimeout传递参数
	        setTimeout((function(t){
	            return (function(){
	                t.hide();
	            });
	        })(this), this.autoHide*1000);
		}
	},
	/**
	 * 隐藏(自动销毁)
	 */
	hide: function(){
		var tip = this.tip;
		KUI.Animation.fadeOut(this.tip, function(){
			tip.innerHTML = null;
			tip.parentNode.removeChild(tip);
		});
	},
	/**
	 * 设定内容
	 */
	setContent: function(content){
		this.tipContent.innerHTML = content;
	}
	
}
/*-------------- KUI Tip end -------------------*/

/*-------------- KUI Validation start -------------------*/

/**
 * 参考:<br>
 * rapid-validation:http://code.google.com/p/rapid-validation/<br>
 * JavaScript Form Validator (gen_validatorv31.js)http://www.javascript-coder.com/html-form/javascript-form-validation.phtml<br>
 * @fileoverview KUI 表单验证类
 * @date 2010-6-25
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
 */
/**
 * KUI 表单验证类<br>
 * var vld = new KUI.Validattion({formId: 表单id, immediate: 立即验证，即失去焦点时就验证});<br>
 * if(!vld.validate()){<br>
 * &nbsp;&nbsp;&nbsp;&nbsp;alert("有错误！不能提交表单");<br>
 * }<br>
 * 参考:<br>
 * rapid-validation:http://code.google.com/p/rapid-validation/<br>
 * JavaScript Form Validator (gen_validatorv31.js)http://www.javascript-coder.com/html-form/javascript-form-validation.phtml<br>
 * @class KUI 表单验证类
 * @date 2010-6-25
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
 * @example
 * var vld = new KUI.Validattion({formId: 表单id, immediate: 立即验证，即失去焦点时就验证});
 * if(!vld.validate()){
 * &nbsp;&nbsp;&nbsp;&nbsp;alert("有错误！不能提交表单");
 * }
 */
KUI.Validation = KUI.Class.create();
KUI.Validation.prototype = {
	/**
	 * 默认的构造方法
	 * @param {Object} options
	 */
    initialize: function(options){
        this.setOption(options ||{});
        this.tips = {};
        this.pass = false;
        if (this.immediate) {
            this.initValue();
        }
    },
	/**
	 * 初始化参数
	 * @param {Object} options {formId: 表单id, immediate: 立即验证，即失去焦点时就验证}
	 */
	setOption: function(options){
		this.formId = this.formId||options.formId;
		this.form = KUI.get(this.formId);
		this.immediate = options.immediate || false;
	},
	/**
	 * 初始化表单值
	 */	
	initValue: function(){		
		//获取表单项目//需要验证的
        this.fields = this.fields||KUI.Validation.getFormFields(this.formId);//防止即时验证与提交验证重复检索表单项
		var tmpFields = [];
        
        /*过滤出现待验证的项.
         *分离出验证类型与验证规则，即从minLength=5分离出minLength和5
         *&lt;<input name="username" id="username" type="text" validate="required,betweenLength=1-5"/&lt;
         *field.validate = {required:"", betweenLength:"1-5", minLength:"5"}
         */
		var selfObj = this;
		/**
		 * 对每个元素进行绑定
		 */
        this.fields.each(function(/**每个表单元素*/eg){
            if (eg.getAttribute("validation")) {				
                tmpFields[tmpFields.length] = eg;	
                tmpFields[tmpFields.length - 1].rule = KUI.Validation.getRule(eg);				
				//即时验证，绑定onblur事件
                if (selfObj.immediate) {
					/**
					 * 当失去焦点时验证当前表单域
					 */					
                    eg.onblur = (function(){
						var field = tmpFields[tmpFields.length - 1];
						return function(){
							selfObj.validateOne(selfObj.fields, field);	
						}						
					})();						          
                }
            }
        });
        this.vFields = tmpFields;
	},
    validate: function(){
		this.initValue();
		var hasFocus = false;
        for (var i = 0, l = this.vFields.length; i < l; i++) {
        	if(this.vFields[i].tip && this.vFields[i].tip.tip){
        		this.vFields[i].tip.tip.innerHTML = null;
        		if(this.vFields[i].tip.tip.parentNode){this.vFields[i].tip.tip.parentNode.removeChild(this.vFields[i].tip.tip);}
        	}
            var msg = this.validateOne(this.fields, this.vFields[i]);
			if (msg) {
				//显示提示信息
				//KUI.Validation.showMsg(this, this.vFields[i], msg);
				//设置当前焦点，注意：只把第一个表单项fosus
				if (!hasFocus) {
					//this.vFields[i].focus();
					hasFocus = true;
					continue;
				}
           	}
        }
		//如果有设置过焦点，即有错误，验证不通过返回false
        if (hasFocus) {
            return false;
        }
        else {
            return true;
        }
    },
	validateOne: function(fields, currentField){		
        var msg = "";		
        try {//把原来的错误信息清除
			var errTip = KUI.get("tip_" + currentField.id);
			if(errTip){
				errTip.parentNode.removeChild(errTip);
			}            	
        } 
        catch (e) {
			alert(e);
        }		
        for (var p in currentField.rule) {            
            //如果验证返回false,则要加入错误提示信息了			
            var value = KUI.Validation.getValue(fields, currentField, p);			
            if (!KUI.Validation.check(value, p, currentField.rule[p])) {
                msg += (msg == "" ? "" : ",") + KUI.Validation.getErrorMsg(p, currentField.rule[p]);
            }
            if (msg) {
                //alert(msg);
                //显示提示信息
                KUI.Validation.showMsg(this, currentField, msg);                            
                //currentField.select();
                //TODO 如果出现了一个错误，就返回，停止验证当前表单项目
                return msg;
            }
        }
	}
}


/**
 * 根据规则验证
 */
KUI.Validation.check = function(value, type, rule){
	if(type != "required" && value==""){
		return true;
	}
	switch(type){
		case "required":{
			if (!rule) {
				return !((value == null) || (value.length == 0) || /^[\s|\u3000]+$/.test(value));
			}else{
				var rs = rule.split("-");
				if(rs.length != 1 && rs.length !=2){
					alert("\"required\" should have null, 1 or 2 argument(s)!(e.g.,required,required=1,required=1-5)");
					return false;
				}
				if (rs.length == 1) {
					return parseInt(rule) == parseInt(value);
				}
				else 
					if (rs.length == 2) {
						return (parseInt(rs[0]) <= parseInt(value))&&(parseInt(rs[1]) >= parseInt(value));
					}
			}
			return false;
		}
		case "minValue":{
			if (!rule) {
				alert("\"minValue\" should have 1 argument!(e.g.,minValue=1)");
			}else{
				var rs = rule.split("-");
				if(rs.length == 1){
					return parseFloat(value)>=parseFloat(rs[0]);
				}else {
					alert("\"minValue\" should have 1 argument!(e.g.,minValue=1)");
				}
			}
			return false;
		}
		case "maxValue":{
			if (!rule) {
				alert("\"maxValue\" should have 1 argument!(e.g.,maxValue=1)");
			}else{
				var rs = rule.split("-");
				if(rs.length == 1){
					return parseFloat(value)<=parseFloat(rs[0]);
				}else {
					alert("\"maxValue\" should have 1 argument!(e.g.,maxValue=1)");
				}
			}
			return false;
		}
		case "betweenValue":{
			if (!rule) {
				alert("\"betweenValue\" should have 2 arguments!(e.g.,betweenValue=1-5)");
			}else{
				var rs = rule.split("-");
				if(rs.length == 2){
					return (parseFloat(rs[0])<=parseFloat(value))&&(parseFloat(value)<=parseFloat(rs[1]));
				}else {
					alert("\"betweenValue\" should have 2 arguments!(e.g.,betweenValue=1-5)");
				}
			}
			return false;
		}
		case "minLength":{
			if (!rule) {
				alert("\"minLength\" should have 1 argument!(e.g.,minLength=1)");
			}else{
				var rs = rule.split("-");
				if(rs.length == 1){
					return value.length >= parseInt(rs[0]);
				}else {
					alert("\"minLength\" should have 1 argument!(e.g.,minLength=1)");
				}
			}
			return false;
		}
		case "maxLength":{
			if (!rule) {
				alert("\"maxLength\" should have 1 argument!(e.g.,maxLength=1)");
			}else{
				var rs = rule.split("-");
				if(rs.length == 1){
					return value.length <= parseInt(rs[0]);
				}else {
					alert("\"maxLength\" should have 1 argument!(e.g.,maxLength=1)");
				}
			}
			return false;
		}
		case "betweenLength":{
			if (!rule) {
				alert("\"betweenLength\" should have 2 arguments!(e.g.,betweenLength=1-5)");
			}else{
				var rs = rule.split("-");
				if(rs.length == 2){
					return (parseInt(rs[0])<= value.length)&&(value.length <=parseInt(rs[1]));
				}else {
					alert("\"betweenLength\" should have 2 arguments!(e.g.,betweenLength=1-5)");
				}
			}
			return false;
		}
		//equals=password_id
		case "equals":{
			//rule为要作比较的元素id
			return value == document.getElementById(rule).value;
		}
		//整数(-1，0，1...)
		case "integer":{
			return /^[-+]?[1-9]\d*$|^0$/.test(value);
		}
		//数字[0-9]
		case "number":{
			return /^[0-9]+(\.[0-9]+)?$/.test(value);
		}
		//小数
		case "decimal":{
			return /^[0-9]+\.[0-9]+$/.test(value);
		}
		//英文字母
		case "alpha":{
			return /^[a-zA-Z]+$/.test(value);
		}
		//英文数字
		case "alphanum":{
			return /^[a-zA-Z0-9]+$/.test(value);
		}
		case "email":{
			return /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value);
		}
		case "url":{
			var strRegex = "^((https|http|ftp|rtsp|mms)://)"
				+ "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
				+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
				+ "|" // 允许IP和DOMAIN（域名）
				+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
				+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
				+ "[a-z]{2,6})" // first level domain- .com or .museum
				+ "(:[0-9]{1,4})?" // 端口- :80
				+ "((/?)|" // a slash isn't required if there is no file name
				+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
			return new RegExp(strRegex).test(value);
		}
		case "idNumber":{
			return true;
		}
		case "chinese":{ return /^[\u4e00-\u9fa5]+$/.test(value); }
		case "tel":{return /^((0[1-9]{3})?(0[12][0-9])?[-])?\d{6,8}$/.test(value);}
		case "mobile":{return /(^0?[1][358][0-9]{9}$)/.test(value);}
		case "zip":{return /^[1-9]\d{5}$/.test(value);}
		case "qq":{return /^[1-9]\d{4,8}$/.test(value);}
		case "pattern":{return new RegExp(rule).test(value);}
		case "ip":{
			return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
		}
		case "date":{
			return (KUI.Validation.isDate(value));
		}
		case "dateTime":{
			return (KUI.Validation.isDateTime(value));
		}
		//当前选择的日期(如2010-06-10)要比另一个日期(2010-06-20)早(前)
		case "dateBefore":{
			var another = KUI.get(rule).value;
			//另一个日期不是正确的日期格式或不存在
            if (!another) {
                //alert("element(id=" + rule + ") does not exist or element value(value=" + another + ") is an invalid Date.");
                return false;
            }
            if (KUI.Validation.isDate(value) || KUI.Validation.isDateTime(value)) {
                if (KUI.Validation.isDate(another) || KUI.Validation.isDateTime(another)) {
                    //当前选择的日期
                    var currentSelectedDate = new Date(value.replace(/\-/g, "\/"));
                    var anotherDate = new Date(another.replace(/\-/g, "\/"));
                    return (currentSelectedDate - anotherDate < 0);
                }
                else {
                    //alert("element value(value=" + another + ") is an invalid Date.");
                    return false;
                }
            }
            else {
                //alert("current value(value=" + value + ") is an invalid Date.");
                return false;
            }

		}
		//当前选择的日期(如2010-06-10)要比另一个日期(2010-06-01)晚(后)
		case "dateAfter":{
			var another = KUI.get(rule).value;
			//另一个日期不是正确的日期格式或不存在
            if (!another) {
                //alert("element(id=" + rule + ") does not exist or element value(value=" + another + ") is an invalid Date.");
                return false;
            }
            
            if (KUI.Validation.isDate(value) || KUI.Validation.isDateTime(value)) {
                if (KUI.Validation.isDate(another) || KUI.Validation.isDateTime(another)) {
                    //当前选择的日期
					var currentSelectedDate = new Date(value.replace(/\-/g, "\/"));
					var anotherDate = new Date(another.replace(/\-/g, "\/"));
					return (currentSelectedDate - anotherDate > 0);
                }
                else {
                    //alert("element value(value=" + another + ") is an invalid Date.");
                    return false;
                }
            }
            else {
                //alert("current value(value=" + value + ") is an invalid Date.");
                return false;
            }
			
		}

		case "dateRange":{
			if(!rule){
				alert("\"dateRange\" should have 1 argument!(e.g.,dateRange=1)");
				return false;
			}
			if (KUI.Validation.isDate(value) || KUI.Validation.isDateTime(value)) {
				//当前选择的日期
				var currentSelectedDate = new Date(value.replace(/\-/g, "\/"));
				//范围，单位：天
				var range = parseInt(rule);
				var now = new Date();
				//alert(0 <= currentSelectedDate - now)
				if(range >= 0){
					return (0 <=(currentSelectedDate - now)) &&  ((currentSelectedDate - now)<= range*24*60*60*1000); 
				}else {
					//return (0 >=(currentSelectedDate - now)) &&  ((currentSelectedDate - now)>= range*24*60*60*1000);
					alert("dateRange argument have to be natural number.");
					return false;
				}  				
			}else {
				//alert("current value("+value+") is an invalid Date.");
				return false;
			}
			
		}		
		case "lessThan":{
			var v = document.getElementById(rule).value;
			//alert("value=" + value + ", v="+v);
			//alert("less " + (value < v));
			return value < v;
		}
		case "greaterThan":{
			var v = document.getElementById(rule).value;
			//alert("value=" + value + ", v="+v);
			//alert("greater " + (value > v));
			return value > v;
		}
		case "file": {
			var ext = value.substring(value.lastIndexOf(".")+1);//后缀名
			return (rule.toUpperCase().indexOf(ext.toUpperCase()) != -1);
		}
		
		default:{
			alert("can not recorgnize validation type: " + type);
		}

	}
	return false;
}

/**
 * 获取验证提示信息
 */
KUI.Validation.getErrorMsg = function(type, rule){
	if(!KUI.Validation.errorMsg[type]){
		alert("this is no error message for validation type: " + type);
		return null;
	}
	//错误信息以key-value形式保存，value为数组
	var msg = "";
	if(!rule){
		msg = KUI.Validation.errorMsg[type][0];
	}else{
        //		//排除参数为正负数的情况，如dateRange=-5
        //		if(rule.charAt(0)!='-'){
        var rs = rule.split("-");
        var fStr = "KUI.format(msg";
        if(type == 'file'){
        	msg = KUI.Validation.errorMsg[type][0];
            fStr += ",\"" + rs.join(",") + "\"";
        }else if(type == 'lessThan' || type == 'greaterThan'){
        	msg = KUI.Validation.errorMsg[type][0];
        }
        else{
	        msg = (rs.length == 1) ? KUI.Validation.errorMsg[type][1] : KUI.Validation.errorMsg[type][2];
	        for (var i = 0, l = rs.length; i < l; i++) {
            	fStr += ",\"" + rs[i] + "\"";
        	}
        }
        fStr += ")";
        //格式化字符符
        msg = eval(fStr);
	}            
	return msg;
}
KUI.Validation.showMsg = function(val, field, msg){
	if(field){
		//给定id，方便再次验证时删除提示信息层
		var t = new KUI.Tip({id:"tip_"+(field.id?field.id : Math.round(Math.random()*10000)), showTo: field, content: msg});
		field.tip = t;//把每个信息层绑定到每个对象，方便管理
	}
	return;
}
/**
 * 验证提示信息
 * 规则：验证规则为0，1，2个参数分别对应提示信息中下标
 */
KUI.Validation.errorMsg = {
    required: ["此项不能为空.", "请选择{0}个", "请选择{0}至{1}个"],
    minValue: ["","最小值为{0}"],
    maxValue: ["","最大值为{0}"],
    minLength: ["","最小长度为{0}."],
    maxLength: ["","最大长度为{0}."],
    betweenValue: ["","","输入值应该为 {0} 至 {1} 之间"],
    betweenLength: ["","","输入值的长度应该在 {0} 至{1} 之间"],
    equals: ["","两次输入不一致,请重新输入."],
    integer: ["请输入整数."],
    number: ["请输入数字."],
    decimal: ["请输入小数."],
    alpha: ["请输入英文字母(半角)."],
    alphanum: ["请输入英文字母或是数字(半角)."],
    email: ["请输入有效的邮件地址,如 username@example.com."],
    url: ["请输入有效的URL地址,如 http://www.baidu.com"],
    pattern: [""],
    ip: ["请输入正确的IP地址"],
    lessThan: ["请输入小于前面的值"],
    greaterThan: ["请输入大于前面的值"],
    date: ["请输入有效的日期,格式为2010-10-11."],
    dateTime: ["请输入有效的时间,格式为2010-10-11 15:00:00."],
    dateAfter: ["","日期应该晚于第一个日期"],
    dateBefore: ["","日期应该早于第一个日期"],
    dateRange: ["","选择的日期必须大于现在时间并且相差超过{0}天"],
    file: ["有效文件类型应为{0}"],
    idNumber: ["请输入合法的身份证号码"],
    chinese: ["请输入中文"],
    tel: ["请输入正确的电话号码,如:010-29392929."],
    mobile: ["请输入正确的手机号码."],
    zip: ["请输入有效的邮政编码"],
    qq: ["请输入有效的QQ号码."]
}

/**
 * 获取表单项 select,input
 */
KUI.Validation.getFormFields = function(formId){
	var form = null;
	if(formId && (form = KUI.get(formId))){
		return KUI("input,textarea,select",form);
	}
	else{
		return KUI("input,textarea,select");
	}
}
/**
 * 获取表单项validation属性值，并分享出现验证类型与规则
 * 分离出验证类型与验证规则，即从<I> minLength=5 </I>分离出<I> minLength </I>和<I> 5 </I><br/>
 * &lt;input name="username" id="username" type="text" validate="required,betweenLength=1-5"&gt;<br/>
 * field.rule = {required:"", betweenLength:"1-5", minLength:"5"} 
 */
KUI.Validation.getRule = function(el){
	var valRule = {};
	if(el && (el.getAttribute("validation") || el.getAttribute("kvalidation"))){
		var rules;
		if(el.getAttribute("validation")){
			rules = el.getAttribute("validation").split(",");
		}
		if(el.getAttribute("kvalidation")){
			rules = el.getAttribute("kvalidation").split(",");
		}
		for(var i = 0, l = rules.length; i < l; i ++){
			//betweenLength=1-5
			var rule = rules[i].split("=");
			valRule[rule[0]] = rule[1];
		}
	}
	return valRule;
}

/**
 * 获取表单项的值，有input，select等
 */
KUI.Validation.getValue = function(allFields, el, valType){
	var sType = el.type;	
	switch(sType)
    {
        case "text":
        case "hidden":
        case "password":
        case "file":
        case "textarea": return el.value;
        //radio,checkbox这两种只需要计算选中个数就可以了
		case "checkbox":
        case "radio": return (function(allFields, el){
			if(allFields){
				var valueCount = 0;
				allFields.each(function(e){
					if(e.name == el.name && e.checked)valueCount++;
				});
			}else{
				alert("argument:allFields should not be null");
			}
			return valueCount;
		})(allFields, el);
		//select-one,select-multiple这两种只需要计算选中个数就可以了
        case "select-one":
        case "select-multiple": return (function(el){
            var valueCount = 0;
            for (var i = 0, l = el.options.length; i < l; i++) {
                if (el.options[i].selected && el.options[i].value!="") {
					if(valType=="lessThan" || valType=="greaterThan"){
						return el.options[i].value;
					}
					valueCount++;
				}
            }
			return valueCount;
		})(el);
    }
	
}

/**  
 * 判断输入框中输入的日期格式是否为 yyyy-mm-dd,yyyy-m-d 或者 yyyy/mm/dd,yyyy/m/d
 */
KUI.Validation.isDate = function(dateStr){
    var date = dateStr.replace(/(^\s*)|(\s*$)/g, "");//trim()
	if (date == "") 
        return false;
		
    //年月日
    var r = date.match(/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/);
    if (r == null) {
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[5]);
	var num = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[5]);
    if (num == 0) {
       return false;
    }
    return (num != 0);
    
}

/**  
 * 判断输入框中输入的日期格式是否为年月日时分秒 即
 * yyyy-MM-dd hh:mm:ss, yyyy/MM/dd hh:mm:ss
 */  

KUI.Validation.isDateTime = function(dateStr){
    var date = dateStr.replace(/(^\s*)|(\s*$)/g, "");//trim()
    //年月日时分秒
    var r = date.match(/^(\d{1,4})(-|\/|)(\d{1,2})(-|\/)(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
    if (r == null) {
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[5], r[6], r[7], r[8]);
    var num = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[5] && d.getHours() == r[6] && d.getMinutes() == r[7] && d.getSeconds() == r[8]);
    if (num == 0) {
        return false;
    }
    return (num != 0);
}
/*-------------- KUI Validation end -------------------*/


/*-------------- KUI Tween start -------------------*/
/**
 * @fileoverview KUI 动画支持函数
 * @date 2010-6-25
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
 */
/**
 * @class KUI 动画支持函数
 * @date 2010-6-25
 * @author Kit.Liao
 * @copyright kingkit.com.cn
 * @version 0.9.0
 */
var Tween = {
    swingTo: function(pos){
        var s = 1.70158;
        return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },    
    bounce: function(pos){
        if (pos < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        }
        else 
            if (pos < (2 / 2.75)) {
                return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
            }
            else 
                if (pos < (2.5 / 2.75)) {
                    return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
                }
                else {
                    return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
                }
    },    
    bouncePast: function(pos){
        if (pos < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        }
        else 
            if (pos < (2 / 2.75)) {
                return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
            }
            else 
                if (pos < (2.5 / 2.75)) {
                    return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
                }
                else {
                    return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
                }
    },    
    easeFromTo: function(pos){
        if ((pos /= 0.5) < 1) 
            return 0.5 * Math.pow(pos, 4);
        return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
    },    
    easeFrom: function(pos){
        return Math.pow(pos, 4);
    },    
    easeTo: function(pos){
        return Math.pow(pos, 0.25);
    },    
    linear: function(pos){
        return pos
    }
}
/*-------------- KUI Tween end -------------------*/
