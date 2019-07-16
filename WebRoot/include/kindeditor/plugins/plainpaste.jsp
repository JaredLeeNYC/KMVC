<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'plainpaste.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<style type="text/css" rel="stylesheet">
    body {
    margin: 0px;
    font-size:12px;
    background-color:#F0F0EE;
    }
    #textArea {
    width:320px;
    height:250px;
    border:1px solid #000000;
    overflow: auto;
    }
  </style>
  </head>
  
  <body>
    <div style="margin-bottom:10px;">请使用快捷键(Ctrl+V)把内容粘贴到下面的方框里。</div>
<textarea id="textArea" style="width:320px;height:250px;border:1px solid #000000;"></textarea>
  </body>
</html>
