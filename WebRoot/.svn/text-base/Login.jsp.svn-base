<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page isELIgnored="false" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>荆棘鸟系统登陆</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<style type="text/css" rel="stylesheet">
		.STYLE2 {
			font-size: 12px
		}
		
		.STYLE3 {
			color: #0071a8
		}
		
		a {
			color: 0071a8;
			text-decoration: none;
		}
		
		a:hover {
			color: #CC3300;
			text-decoration: none;
		}
		
		#errorMsg {
			text-align: center;
			font-size: 12px;
			color: red;
		}
		</style>
	</head>

	<body bgcolor="#a7e3e3" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="document.getElementById('userName').focus();">
		<form id="formId"	action="${pageContext.request.contextPath}/adminLoginout.do?act=in" style="width: 100%;  text-align: center;" method="POST" onKeyPress="enterDown(event);">
			<table height="735" style="width: 100%; text-align: center;" border="0" cellpadding="0" background="images/login/login_02.jpg">
				<tr>
					<td align="center" valign="middle">
						<table width="575" height="340" border="0" cellpadding="0" cellspacing="0" align="center">
							<tr>
								<td height="213" colspan="3" background="images/login/login_03.jpg"></td>
							</tr>
							<tr>
								<td width="11" height="70" background="images/login/login_05.jpg">
								</td>
								<td width="552" align="center" valign="top" background="images/login/login_06.jpg" style="font-size: 12px; color: #00547c;">
									<table width="100%" border="0"
										cellspacing="0" cellpadding="0" style="margin-top: 5px;">
										<tr>
											<td id="errorMsg" colspan="6" align="center">
												&nbsp;
												<c:forEach items="${requestScope.message }" var="m">
													${m }
												</c:forEach>
											</td>
										</tr>
										<tr>
											<td width="11%" align="right"
												style="font-size: 12px; color: #00547c;">
												用户名：
											</td>
											<td width="16%" align="left">
												<input type="text" name="user.userName" id="userName" style="font-size: 12px; width: 100px; height: 20px; color: #00547c; border: 1px solid #20b8de; line-height: 18px; padding-left: 3px;">
											</td>
											<td width="9%" align="right" style="font-size: 12px; color: #00547c;">
												密码：
											</td>
											<td width="16%" align="left">
												<input  type="password" name="user.password" id="password" style="font-size: 12px; width: 100px; height: 20px; color: #00547c; border: 1px solid #20b8de; line-height: 18px; padding-left: 3px;">
											</td>
											<td width="12%" align="right">
												<input type="button" value="提交" onclick="mylogin();">
											</td>
											<td width="4%" align="right">
												&nbsp;
											</td>
										</tr>
									</table>
								</td>
								<td width="12" height="70" background="images/login/login_07.jpg"></td>
							</tr>
							<tr>
								<td></td>
								<td align="center" style="font-size: 12px; color: #00547c; line-height: 20px;font-family:arial, verdana, sans-serif; ">
									版权所有&nbsp;&copy;&nbsp; 人文与法学学院
									<br />
									技术支持：
									<a href="http://kingkit.com.cn" target="_blank">荆棘鸟科技</a>
								</td>
								<td></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</form>
	</body>
	<script type="text/javascript">
	function mylogin(){
		var userName = document.getElementById("userName").value;
		var password = document.getElementById("password").value;
		if(userName == '' || userName.length == 0){
			document.getElementById("errorMsg").style.display="";
			document.getElementById("errorMsg").innerHTML="用户名不能空！";
			return;
		}else if(password == '' || password.length == 0){
			document.getElementById("errorMsg").style.display="";
			document.getElementById("errorMsg").innerHTML="密码不能空！";
			return;
		}else if(userName.length > 0 && password.length > 0){
			document.getElementById("formId").submit();
		}
	}
	function enterDown(event){
		if(event.keyCode == '13'){
			mylogin();
		}
	}
		
	function myRefresh(){
		if(parent){
			var url = parent.location.href;
			if(url.indexOf("adminLoginout.do") == -1 && url.indexOf("Login.jsp") == -1 ){
				parent.location.href= '${pageContext.request.contextPath}/Login.jsp';
			}
		}
	}
	myRefresh();
</script>
</html>
