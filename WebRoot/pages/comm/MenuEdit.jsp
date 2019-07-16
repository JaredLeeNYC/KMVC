<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page isELIgnored="false" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html style="overflow-y: visible;">
    <jsp:include page="../../include/IncludeMain.jsp"></jsp:include>
  <body style="overflow-y: visible!important;overflow-y: scroll;">
	  <form action="${pageContext.request.contextPath }/pages/comm/menu.do?act=save" name="myForm" id="myForm" method="post">
	    	<table class="mainTable">
				<thead>
					<tr class="tableController">
						<th colspan="2">
							<h3>菜单编辑</h3>
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
						<td width="200" align="right">菜单名:</td>
						<td>
						<input type="text" validation="required" name="menu.name" id="name" value="${menu.name}"/>
						<input type="hidden" name="menu.id" id="id" value="${requestScope.menu.id==null?"":requestScope.menu.id}"/>
						</td>
					</tr> 
					<tr>
						<td align="right">	链接:</td>
						<td><input type="text" validation="required"  name="menu.url" id="url" value="${menu.url}" size="100"/></td>
					</tr> 
					<tr>
						<td align="right">父菜单:</td>
						<td>
							<select validation="required"  name="menu.pid" id="pid">
								<option value="0" <c:if test="${0 == menu.pid}">selected</c:if>>一级菜单</option>
								<c:forEach items="${menuList}" var="item">
									<option value="${item.id }" <c:if test="${item.id == menu.pid}">selected</c:if>>${item.name}</option>
								</c:forEach>
							</select>
						</td>
					</tr> 
					<tr>
						<td align="right">背景图片:</td>
						<td>
							<select name="menu.image" validation="required" id="image">
								<option value="/images/main/null.png" <c:if test="${0 != menu.pid}">selected</c:if>>
									/images/main/null.png
								</option>
								<option value="/images/main/MenuIcon.png" <c:if test="${0 == menu.pid}">selected</c:if>>
									/images/main/MenuIcon.png
								</option>
							</select>
						</td>
					</tr> 
					<tr>
						<td align="right">菜单资源:</td>
						<td>
							<select validation="required"  name="menu.resourceId" id="resourceId">
								<c:forEach items="${resourceList}" var="item">
									<option value="${item.id }" <c:if test="${item.id == menu.resourceId}">selected</c:if>>${item.name}</option>
								</c:forEach>
							</select>
						</td>
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
