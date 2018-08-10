<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'list_user.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
  <a href="save_user.jsp">增加用户</a>
  <br/>
    <table border="1">
    	<tr>
    	  <td>编号</td>
    	  <td>用户名</td>
    	  
    	  <td>可执行操作</td>
    	</tr>
    	<!-- 用EL表达式 进行循环输出 -->
    	<c:forEach var="user" items="${user}">
    	  <tr>
    	  	<td>${user.uid}</td>
    	  	<td>${user.uname}</td>
    	  	
    	  	<td>
    	  	  
    	  	  					<!-- 获取到ID -->
    	  	  <a href="user/deleteuser.do?id=${user.uid}">删除</a>
    	  	  <a href="user/preupdateuser.do?id=${user.uid}">修改</a>
    	  	</td>
    	  </tr>
    	</c:forEach>
    </table>
  </body>
</html>
