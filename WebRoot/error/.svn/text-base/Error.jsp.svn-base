<%@ page language="java" contentType="text/html; charset=UTF-8" isErrorPage="true" pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*"%>
<%@page isELIgnored="false" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>操作出现异常</title>
	</head>
<body>
对不起, 服务器繁忙!  请稍后再试.<br/>
或者你可以...<br/><a href="javascript:history.go(-1)">返回上一页</a>
<hr>
<div style="display: none;">
<h2><font color=#DB1260>Error Page</font></h2>

<p>An exception was thrown: <b> <%=exception.getClass()%>:<%=exception.getMessage()%></b></p>
访问路径: <%=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/" + request.getAttribute("javax.servlet.forward.request_uri") %><br>
Servlet路径: <%=request.getAttribute("javax.servlet.forward.servlet_path") %>

<p>With the following stack trace:</p>
<pre>
<%
	//exception.printStackTrace();
	ByteArrayOutputStream ostr = new ByteArrayOutputStream();
	exception.printStackTrace(new PrintStream(ostr));
	out.print(ostr);
%>
</pre>
</div>
</body>


