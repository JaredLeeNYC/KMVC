<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page isELIgnored="false" %>
<%@ page import="java.text.*" %>  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: visible;">
    <jsp:include page="../../include/IncludeMain.jsp"></jsp:include>
  <body style="overflow-y: visible!important;overflow-y: scroll;">
	    	<table class="mainTable">
				<thead>
					<tr class="tableController">
						<th colspan="2">
							<h3>【温馨提示】</h3>
						</th>
					</tr>
					<tr>
						<th class="InstructionInfo"  colspan="2">
							<div id="time">
							</div>
							<script>
							//document.getElementById('time').innerHTML= '今天是：' +new Date().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay());
							//setInterval("document.getElementById('time').innerHTML= '今天是：' +new Date().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay());",1000);
							<!--      
							/**      
							* 对Date的扩展，将 Date 转化为指定格式的String      
							* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
							* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
							* eg:      
							* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
							* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
							* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
							* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
							* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
							*/        
							Date.prototype.pattern=function(fmt) {         
							    var o = {         
							    "M+" : this.getMonth()+1, //月份         
							    "d+" : this.getDate(), //日         
							    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
							    "H+" : this.getHours(), //小时         
							    "m+" : this.getMinutes(), //分         
							    "s+" : this.getSeconds(), //秒         
							    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
							    "S" : this.getMilliseconds() //毫秒         
							    };         
							    var week = {         
							    "0" : "\u65e5",         
							    "1" : "\u4e00",         
							    "2" : "\u4e8c",         
							    "3" : "\u4e09",         
							    "4" : "\u56db",         
							    "5" : "\u4e94",         
							    "6" : "\u516d"        
							    };         
							    if(/(y+)/.test(fmt)){         
							        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
							    }         
							    if(/(E+)/.test(fmt)){         
							        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);         
							    }         
							    for(var k in o){         
							        if(new RegExp("("+ k +")").test(fmt)){         
							            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
							        }         
							    }         
							    return fmt;         
							}       
							     
							//var date = new Date();      
							//window.alert(date.pattern("yyyy-MM-dd hh:mm:ss"));   
							// -->  
							function setTime(){
								var date = new Date();
								document.getElementById('time').innerHTML='今天是：<span style="color:blue;">'+date.pattern("yyyy-MM-dd EEE hh:mm:ss")+"</span>";
								window.setTimeout("setTime()",1000);
							}
							setTime();
							</script>
						</th>
					</tr>
				</thead>
		</table>
		<br/>
	    	<table class="mainTable">
				<thead>
					<tr class="tableController">
						<th colspan="2">
							<h3>【相关信息】</h3>
						</th>
					</tr>
					<tr>
						<th class="InstructionInfo" colspan="2">
							以下为服务器相关信息，供参考：
						</th>
					</tr>
					<tr class="tableTitle">
						<th>
							<h3>&nbsp;</h3>
						</th>
						<th>
							<h3>&nbsp;</h3>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td width="200" align="right">服务器信息</td>
						<td>
							<%=getServletConfig().getServletContext().getServerInfo() %>
						</td>
					</tr> 					
					<tr>
						<td width="200" align="right">服务器名称</td>
						<td>
							<%=request. getServerName() %>
						</td>
					</tr> 					
					<tr>
						<td width="200" align="right">服务器IP</td>
						<td>
						<%=request.getLocalAddr()%>
						</td>
					</tr> 					
					<tr>
						<td width="200" align="right">服务器监听端口</td>
						<td>
						<%=request.getServerPort() %>
						</td>
					</tr> 					
					<tr>
						<td width="200" align="right">客户端IP</td>
						<td>
							<%=request.getRemoteAddr() %>
						</td>
					</tr> 					
					<tr>
						<td width="200" align="right">客户端主机名</td>
						<td>
							<%=request.getRemoteHost() %>
						</td>
					</tr> 					
					<tr>
						<td width="200" align="right">客户端User-Agent</td>
						<td>
							<%=request.getHeader("User-Agent") %>
						</td>
					</tr> 					
				</tbody>
		</table>
		<br/>
	    	<table class="mainTable">
				<thead>
					<tr class="tableController">
						<th colspan="2">
							<h3>【技术支持】</h3>
						</th>
					</tr>
					<tr>
						<th class="InstructionInfo" colspan="2">
							<p>&nbsp;&nbsp;&nbsp;&nbsp;亲爱的用户，如果您在使用过程中遇到解决不了的问题，可咨询<a href="http://kingkit.com.cn" target="_blank">荆棘鸟科技</a>，官方网站：kingkit.com.cn。</p>
							<p>&nbsp;&nbsp;&nbsp;&nbsp;荆棘鸟软件科技研发中心是一家专注于教育信息化应用的解决方案服务提供商。<br>&nbsp;&nbsp;&nbsp;&nbsp;荆棘鸟重点发展安全性能高、运行快速稳定以及用户体验优越的教育信息化系统。目前，主要产品是基于JAVA平台而开发高安全性，高效率的Web应用系统，其中包括荆棘鸟网络投票评选系统(K-VOTE)、荆棘鸟报名登记 系统(K-RMS)、以及荆棘鸟实验室仪器预约系统(K-ERMS)，经过四年的高速发展，荆棘鸟致力于成为全国规模庞大，服务顶尖的教育信息化系统解决方案的提供商。<p>
						</th>
					</tr>
					<tr class="tableTitle">
						<th>
							<h3>&nbsp;</h3>
						</th>
						<th>
							<h3>&nbsp;</h3>
						</th>
					</tr>
				</thead>
		</table>
  </body>
</html>
