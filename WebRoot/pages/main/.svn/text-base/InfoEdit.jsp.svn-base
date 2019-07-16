<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page isELIgnored="false" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: visible;">
    <jsp:include page="../../include/IncludeMain.jsp"></jsp:include>
  <body style="overflow-y: visible!important;overflow-y: scroll;">
	  <form action="${pageContext.request.contextPath }/adminLoginout.do?act=save" name="myForm" id="myForm" method="post">
	    	<table class="mainTable">
				<thead>
					<tr class="tableController">
						<th colspan="2">
							<h3>用户编辑</h3>
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
						<td width="200" align="right">用户名:</td>
						<td>
						<input type="text" validation="required,alpha" name="user.userName" id="userName" value="${requestScope.user.userName}"/>
						<input type="hidden" name="user.id" id="id" value="${requestScope.user.id==null?"":requestScope.user.id}"/>
						<input type="hidden" name="user.roleId" id="roleId" value="${requestScope.user.roleId==null?"":requestScope.user.roleId}"/>
						</td>
					</tr> 
					<tr>
						<td align="right">	密码:</td>
						<td><input type="password" validation="required,minLength=6"  name="user.password" id="password" value="${requestScope.user.password}"/></td>
					</tr> 
					<tr>
						<td align="right">确认密码:</td>
						<td><input type="password" validation="equals=password"  name="" id="password1" value=""/></td>
					</tr> 
					<tr>
						<td align="right">真实姓名:</td>
						<td><input type="text" validation="chinese"  name="user.realName" id="realName" value="${user.realName}"/></td>
					</tr> 
					<tr>
						<td align="right">qq:</td>
						<td><input type="text" name="user.qq" id="qq" value="${user.qq}"/></td>
					</tr> 
					<tr>
						<td align="right">email:</td>
						<td><input type="text" name="user.email" id="email" value="${user.email}"/></td>
					</tr> 
					<tr>
						<td align="right">电话号码:</td>
						<td><input type="text" name="user.tel" id="tel" value="${user.tel}"/></td>
					</tr>
				</tbody>
				<tfoot>
					<tr  class="tableController_bottom">
						<td align="center">
							&nbsp;
						</td>
						<td align="left">
							<a class="button" href="javascript:void(0)" onclick="this.blur(); save();return false;"><span><img src="${pageContext.request.contextPath }/js/kui/icons/disk.png" align="absmiddle"/>&nbsp;保存</span></a>
							<a class="button" href="javascript:void(0)" onclick="this.blur(); history.go(-1);return false;"><span><img src="${pageContext.request.contextPath }/js/kui/icons/anticlockwise.png" align="absmiddle"/>&nbsp;返回</span></a>
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
