<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'media.jsp' starting page</title>
    
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
    }
    td.left {
    font-size:12px;
    width: 40px;
    padding: 2px;
    }
    td.right {
    font-size:12px;
    padding: 2px;
    }
    div.preview {
    border: 1px solid #AAAAAA;
    background-color: #FFFFFF;
    width: 270px;
    height: 200px;
    margin: 0px 0px 10px 0px;
    }
    div.preview div {
    margin: 5px;
    }
  </style>
  </head>
  
  <body>
   <div class="preview"><div id="previewDiv"></div></div>
  <table border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td class="left">URL:</td>
      <td class="right">
        <input type="text" id="url" name="url" value="http://" maxlength="255" style="width:210px;" />
      </td>
    </tr>
  </table>
  </body>
</html>
