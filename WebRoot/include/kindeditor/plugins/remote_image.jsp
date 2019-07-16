<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'remote_image.jsp' starting page</title>
    
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
      margin: 0px;
      background-color:#F0F0EE;
      overflow: hidden;
      }
      td.left1 {
      font-size:12px;
      width: 50px;
      padding: 2px;
      }
      td.right1 {
      font-size:12px;
      padding: 2px;
      }
      td.left2 {
      font-size:12px;
      width: 35px;
      padding: 2px;
      }
      td.right2 {
      font-size:12px;
      padding: 2px;
      width: 50px;
      }
    </style>
  </head>
  
  <body>
    <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td class="left1">URL:</td>
        <td class="right1">
          <input type="text" id="url" name="url" value="http://" maxlength="255" style="width:220px;" />
        </td>
      </tr>
      <tr>
        <td class="left1">说明:</td>
        <td class="right1">
          <input type="text" id="imgTitle" name="imgTitle" value="" maxlength="100" style="width:220px;" />
        </td>
      </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td class="left2">宽度: </td>
        <td class="right2">
          <input type="text" name="imgWidth" id="imgWidth" value="0" maxlength="4" style="width:40px;" />
        </td>
        <td class="left2">高度: </td>
        <td class="right2">
          <input type="text" name="imgHeight" id="imgHeight" value="0" maxlength="4" style="width:40px;" />
        </td>
        <td class="left2">边框: </td>
        <td class="right2">
          <input type="text" name="imgBorder" id="imgBorder" value="0" maxlength="1" style="width:40px;" />
        </td>
      </tr>
    </table>
  </body>
</html>
