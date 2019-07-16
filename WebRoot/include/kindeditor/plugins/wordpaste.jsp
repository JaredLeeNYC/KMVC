<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'wordpaste.jsp' starting page</title>
    
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
    #wordIframe {
    width:320px;
    height:250px;
    border:1px solid #000000;
    }
  </style>
  <script type="text/javascript">
    function setIframe() {
        var iframe = parent.KE.$('wordIframe', document);
        var iframeDoc = parent.KE.util.getIframeDoc(iframe);
        iframeDoc.designMode = "On";
        iframeDoc.open();
        iframeDoc.write('<html><head><title>WordPaste</title></head>');
        iframeDoc.write('<body style="background-color:#FFFFFF;font-size:12px;margin:2px;" />');
        if (parent.KE.browser != 'IE') iframeDoc.write('<br />');
        iframeDoc.write('</body></html>');
        iframeDoc.close();
    }
  </script>
  </head>
  
  <body onload="setIframe();">
    <div style="margin-bottom:10px;">请使用快捷键(Ctrl+V)把内容粘贴到下面的方框里。</div>
  <iframe id="wordIframe" name="wordIframe" frameBorder="0"></iframe>
  </body>
</html>
