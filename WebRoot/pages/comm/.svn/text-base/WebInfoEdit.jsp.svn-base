<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page isELIgnored="false" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: visible;">
    <jsp:include page="../../include/IncludeMain.jsp"></jsp:include>
  <body style="overflow-y: visible!important;overflow-y: scroll;">
	  <form action="${pageContext.request.contextPath }/pages/webInfo.do?act=save" name="myForm" id="myForm" method="post">
	    	<table class="mainTable">
				<thead>
					<tr class="tableController">
						<th colspan="2">
							<h3>网页信息编辑</h3>
						</th>
					</tr>
					<tr>
						<th>&nbsp;	</th>
						<th class="errorTip" style='<c:if test="${empty message}">display:none</c:if>'>
							<c:forEach items="${message}" var="m">
								${m }
							</c:forEach>
						</th>
					</tr>
					<tr class="tableTitle" >
						<th >
						
							<h3 >&nbsp;	</h3>
						</th>
						<th>
							<h3>&nbsp;	&nbsp;	&nbsp;		<c:if test="${flag==true}"><font color="red">修改成功</font></c:if></h3>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td width="200" align="right">网站关键字:</td>
						<td>
						<input type="text" validation="required" name="webInfo.keywords" id="keywords" value="${webInfo.keywords}" size="60"/>
						<input type="hidden" name="webInfo.id" id="id" value="${webInfo.id}"/>
						</td>
					</tr> 
					<tr>
					      <td width="200" align="right">网站描述:</td>
	                    <td>
						<input type="text" validation="required" name="webInfo.description" id="description" value="${webInfo.description}" size="100"/>
						</td>
					</tr> 
					<tr>
						<td width="200" align="right">网站标题:</td>
                        <td>
						<input type="text" validation="required" name="webInfo.title" id="title" value="${webInfo.title}" size="60"/>
						</td>
					</tr> 
					<tr>
						<td width="200" align="right">脚本内容:</td>
						<td>
						<textarea rows="5" cols="50" name="webInfo.foot" id="foot" >${webInfo.foot}	</textarea>
						</td>
					</tr> 
				</tbody>
				<tfoot>
					<tr  class="tableController_bottom">
						<td align="center">
							&nbsp;
						</td>
						<td align="left">
							<a class="button" href="javascript:void(0)" onclick="this.blur();save();return false;"><span><img src="${pageContext.request.contextPath }/js/kui/icons/disk.png" align="absmiddle"/>&nbsp;保存</span></a>
						</td>
					</tr>
				</tfoot>
		</table>
		</form>
		<script type="text/javascript">
			var formId = 'myForm';
			var valid = new KUI.Validation({formId: formId, immediate: true});
			function save(){
				if(valid.validate()){
					document.getElementById(formId).submit();
				}
			}
		</script>
  </body>
</html>
