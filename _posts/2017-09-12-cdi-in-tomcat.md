---
layout: post
title:  "Tomcat and CDI"
categories: tomcat java cdi
---
Running different technologies or products to work together can be sometimes quite a challenge, especially for beginners. Therefore, in the next article, we will show how to easily configure Tomcat along with Weld, the reference CDI implementation.

## Introduction
Fully running and installed Tomcat is one of prerequisites. The instllation itself is not particularly challenging and indeed well documented and covered by many tutorials and videos. I will use Tomcat 8.5.11 (for supported versions, see the official Weld documention).

## Maven
At the beginning, we will create a *blank* maven project. For this purpose, use the command:
```bash
$ mvn archetype:generate -DgroupId=com.hradecek.cdi -DartifactId=tomcat-cdi -DinteractiveMode=false
```
By editing the `pom.xml` file, we add war-plugin:
```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-war-plugin</artifactId>
      <version>3.1.0</version>
    </plugin>
  </plugins>
</build>
```
This plugin will ensure that maven will not complain about the missing `web.xml` descriptor when compiling the project. Note that since version `3.0.0, you do not have to explicitly set `failOnMissinWebXml` property, whose default value has change to true (see documentation).

## Tomcat
Tomcat 8 has support for Servlet API 3.1. (a.k.a. JSR-340) that we add to our project. We define new dependency in `pom.xml`:
```xml
<dependency>
  <groupId>javax</groupId>
  <artifactId>javaee-web-api</artifactId>
  <version>7.0</version>
  <scope>provided</scope>
</dependency>
```
The `<scope>provided</scope>` definition gives us the assurance that the libraries will not be included in the resulting web archive (`.war`), because we want ot use server-side libraries already included in Tomcat.

## CDI
As a CDI implementation we use Weld, which as we already mentioned, is a reference implementation for CDI and has direct support in Tomcat.

Because we want to compile our project against the CDI specificatoin, we need to add the CDI API dependency to the project:
```xml
<dependency>
  <groupId>javax.enterprise</groupId>
  <artifactId>cdi-api</artifactId>
  <version>1.2</version>
  <scope>provided</scope>
</dependency>
```
This dependency has a defined `</scope>` as `provided`, just like the ServletAPI, as it will be used only at the time of the project compilatoin and during the runtime, Weld libraries will be used, which will be added to the project with the `runtime` scope, which means that libraries are not necessary for compilatoin, but for application run.
```xml
<dependency>
  <groupId>org.jboss.weld.servlet</groupId>
  <artifactId>weld-servlet</artifactId>
  <version>2.4.3.Final</version>
  <scope>runtime</scope>
</dependency>
```

For CDI support, we must add the `beans.xml` file (even if empty) as specification told us. In the `WEB-INF` folder, create a `beans.xml` file with the following content:
```xml
<beans xmlns="http://xmlns.jcp.org/xml/ns/javaee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/beans_1_2.xsd"
       version="1.2"
       bean-discovery-mode="all">
</beans>
```
META-INF/context.xml
```xml
<Context>
  <Resource name="BeanManager"
            auth="Container"
            type="javax.enterprise.inject.spi.BeanManager"
            factory="org.jboss.weld.resources.ManagerObjectFactory"/>
</Context>
```

```python
  print("Hello World")
```

