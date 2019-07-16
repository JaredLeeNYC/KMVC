<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'link.jsp' starting page</title>
    
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
    font-size:12px;
    margin: 5px;
    background-color:#F0F0EE;
    }
    td.left {
    font-size: 12px;
    width: 70px;
    padding: 2px;
    }
    td.right {
    padding: 2px;
    }
  </style>

  </head>
  
  <body>
    <table border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td class="left">URL: </td>
      <td class="right"><input type="text" id="hyperLink" name="hyperLink" value="http://" style="width:200px;" /></td>
    </tr>
    <tr>
      <td class="left">打开类型: </td>
      <td class="right">
        <select id="linkType" name="linkType">
          <option value="_blank">新窗口</option>
          <option value="_self">当前窗口</option>
        </select>
      </td>
    </tr>
  </table>
  </body>
</html>
