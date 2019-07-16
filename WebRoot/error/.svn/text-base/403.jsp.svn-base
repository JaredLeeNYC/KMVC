<%@ page contentType="text/html;charset=UTF-8"  isErrorPage="true" %>
<%@page isELIgnored="false" %>
<%
response.setStatus(HttpServletResponse.SC_OK);
%>
<html>
	<head>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<title>您没有权限访问该资源!</title>
	</head>
	<body style="width: 100%; ">
		<table style='width: 50%; margin: 100px auto; text-align: left; font: bold 18px; color: red; vertical-align: middle; border: 1px solid #e4e4e4;padding:10px;' align="center">
			<tr>
				<td align="left">
				<img src="${pageContext.request.contextPath }/images/main/Bad.gif"/>
				Sorry,您没有权限访问该资源!<br/>
					<hr />
					<font size="2" color="#000">详细信息:</font><br/>
					<%
					String msg = request.getParameter("message");
					msg = new String(msg.getBytes("ISO-8859-1"), "UTF-8");
					out.print(msg);
					%>
					
				</td>
			</tr>
			<tr>
				<td>
					<font size="2" color="#000">问题可能由于:</font>
					<ol style="margin-top: 0;">
						<li>您没有被授权访问;</li>
						<li>您没有登录;</li>
						<li>您登录后长时间没有操作;</li>
					</ol>
					&nbsp;&nbsp;&nbsp;&nbsp;<a href="${pageContext.request.contextPath }/Login.jsp">重新登录</a>
				</td>
			</tr>
		</table>
	</body>
<html>