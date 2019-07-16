<%@ page language="java" pageEncoding="UTF-8"  isErrorPage="true" %>
<%@page isELIgnored="false" %>
<%
response.setStatus(HttpServletResponse.SC_OK);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>操作出错! </title>
	</head>
	<body style="width: 100%; ">
		<table style='width: 50%; margin: 100px auto; text-align: left; font: bold 18px; color: red; vertical-align: middle; border: 1px solid #e4e4e4;padding:10px;' align="center">
			<tr>
				<td align="left">
				<img src="${pageContext.request.contextPath }/images/main/Bad.gif"/>
				Sorry,操作出现错误了!<br/>
					<hr />
					<font size="2" color="#000">详细信息:</font><br/>
					<!-- 获得异常对象 -->
					${message }
				</td>
			</tr>
			<tr>
				<td align="center">
					<a href="javascript:history.go(-1)">返回上一页</a>
				</td>
			</tr>
		</table>
	</body>	
</html>
