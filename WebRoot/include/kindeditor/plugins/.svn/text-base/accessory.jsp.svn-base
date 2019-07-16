<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Accessory</title>
    
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
  <script type="text/javascript">
    function changeType(obj) {
        if (obj.value == 1) {
            document.getElementById('url').style.display = 'none';
            document.getElementById('imgFile').style.display = 'block';
        } else {
            document.getElementById('url').style.display = 'block';
            document.getElementById('imgFile').style.display = 'none';
        }
    }
  </script>

  </head>
  
  <body>
  <form name="uploadForm" method="post" enctype="multipart/form-data" action="${pageContext.request.contextPath }/include/kindeditor/upload/uploadaccessory.jsp">
    <input type="hidden" id="editorId" name="id" value="" />
    <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td class="left1">
          <select id="type" name="type" onchange="javascript:changeType(this);"/>             <option value="1" selected="selected">本地</option>
            <option value="2">远程</option>
          </select>
        </td>
        <td class="right1">
          <input type="file" id="imgFile" name="file" style="width:220px;" />
          <input type="text" id="url" name="url" value="http://" maxlength="255" style="width:220px;display:none;" />
        </td>
      </tr>
      <tr>
        <td class="left1">说明:</td>
        <td class="right1">
          <input type="text" id="imgTitle" name="imgTitle" value="" maxlength="100" style="width:220px;" />
        </td>
      </tr>
    </table>
  </form>
</body>
</html>
