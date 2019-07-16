<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
 <%@page isELIgnored="false" %>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>荆棘鸟系统管理后台</title>
		<link charset="UTF-8" rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/Main.css"/>
		<script language="javascript" type="text/javascript" src="${pageContext.request.contextPath }/js/Main.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath }/js/My97DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" charset="UTF-8" type="text/css" href="${pageContext.request.contextPath }/js/kui/css/KUI.css"/>
		<!--[if lt IE 7]>
            <script type="text/javascript" src="${pageContext.request.contextPath }/js/kui/unitpngfix/unitpngfix.js"></script>
        <![endif]-->
		<script type="text/javascript" src="${pageContext.request.contextPath }/js/kui/KUI.js"></script>
		<script type="text/javascript">
			function selectAll(checkId){ //全选
				if(!checkId){return;}
				var inputs = document.getElementsByTagName("input");
				if(checkId.checked == true){
					for(var i=0;i<inputs.length;i++){
					      if(inputs[i].getAttribute("type") == "checkbox"){
					        inputs[i].checked = true;
					      }
				    }
				}else{
				    for(var i=0;i<inputs.length;i++){
				      if(inputs[i].getAttribute("type") == "checkbox"){
				        inputs[i].checked = false;
				      }
				    }
			   }
		 	}
		 	function showTip(msg,time,isclose){			
				var d = new KUI.Alert({
		                    title: "温馨提示",
							width: 350,
		                    height: 100,
							autoSize:true,
							autoClose:time?time:2,
		                    content: msg,
		                    onOk: function(){
		                        //alert('ok.');
		                    }
		                });
		 	}				
			function deleteAll(act){
				var ids = [];
				var inputs = KUI("input");
				inputs.each(function(el){
					if(el.getAttribute("type") == "checkbox"){
						if(el.checked == true){
							if(el.value != 'on'){
								ids[ids.length] = el.value;
							}
						}
					}
				});
				if(ids.length == 0){
					showTip('请选择需要删除的选项！',3,true);
				}else{
					new KUI.Confirm({
						content:'警告：您确认要删除这个选项吗？',
						onOk:function(){
								var form = KUI.get("myForm");
								if(act){
									var action = form.action + act;
									form.action = action;
								}
								form.submit();
							}
					});
				}
			}		 	 	
			function deleteOne(url){
				if(url){
					new KUI.Confirm({
						content:'警告：您确认要删除这个选项吗？',
						onOk:function(){
								window.location= url;
							}
					});
				}
			}		
			
			//回收站
				function collectionAll(){
				var ids = [];
				var inputs = KUI("input");
				inputs.each(function(el){
					if(el.getAttribute("type") == "checkbox"){
						if(el.checked == true){
							if(el.value != 'on'){
								ids[ids.length] = el.value;
							}
						}
					}
				});
				if(ids.length == 0){
					showTip('请选择需要删除的选项！',3,true);
				}else{
					new KUI.Confirm({
						content:'警告：您确认要将该选项放进回收站？',
						onOk:function(){
								KUI.get("myForm").submit();
							}
					});
				}
			}		 	 	
			function collectionOne(url){
				if(url){
					new KUI.Confirm({
						content:'警告：您确认要将该选项放进回收站？',
						onOk:function(){
								window.location= url;
							}
					});
				}
			}	
			//还原
			function restoreAll(act){
				var ids = [];
				var inputs = KUI("input");
				inputs.each(function(el){
					if(el.getAttribute("type") == "checkbox"){
						if(el.checked == true){
							if(el.value != 'on'){
								ids[ids.length] = el.value;
							}
						}
					}
				});
				if(ids.length == 0){
					showTip('请选择需要删除的选项！',3,true);
				}else{
						var form = KUI.get("myForm");
						var action = form.action + act;
						form.action = action;
						form.submit();											
				}
			}	
			
	 	 	function saveFind(){
	 	 		KUI.get("find").submit();
	 	 	}
	 	 	
	 	 	function studentsBy(type){
	 	 		var typeId = document.getElementById(type);
	 	 		var url = "${pageContext.request.contextPath }/pages/student/students/students.do?act=list&type="+typeId.value;
	 	 		window.location=url;
	 	 	}
			//表格隔行换色
			function listBy(type,url){
				url+=type;			
				window.location=url;
			}
			function saveNewsTypeId(type){
				var newsTypeId1 = document.getElementById(type);
				var url = '${pageContext.request.contextPath }/pages/official/news/news.do?act=get&news.newsTypeId='+newsTypeId1.value;
				window.location=url;
			}
			changeRowColor(); 	 	
		</script>
	</head>