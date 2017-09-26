---
layout: post
title:  "Tomcat and CDI"
description: "Configure Tomcat together with CDI implementation Weld from the scratch together with simple web application as a demonstration"
tags: [tomcat, java, cdi]
---
Running different technologies or products to work together can be sometimes challenging, especially for beginners.
Therefore, in the next article, we will show how to easily configure [Tomcat](http://tomcat.apache.org) along with
[Weld](http://weld.cdi-spec.org), the reference CDI implementation.

## Introduction
Before you start ensure Tomcat is successfully installed on your machine. The installation itself is not particularly difficult
and indeed very well documented and already covered by many tutorials and videos. I will use Tomcat 8.5.11  (for supported
versions of Tomcat, see the official Weld's [documentation](https://docs.jboss.org/weld/reference/latest/en-US/html/environments.html#_tomcat)).

## Maven
At the beginning, we will create a *blank* maven project. For this purpose, use the command:
{% highlight bash %}
$ mvn archetype:generate -DgroupId=com.hradecek.cdi -DartifactId=tomcat-cdi -DinteractiveMode=false
{% endhighlight %}
By editing the `pom.xml` file, we add [Apache Maven WAR Plugin](https://maven.apache.org/plugins/maven-war-plugin/):
{% highlight xml %}
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-war-plugin</artifactId>
      <version>3.1.0</version>
    </plugin>
  </plugins>
</build>
{% endhighlight %}
This plugin will ensure that maven will not complain about the missing `web.xml` descriptor in time of compilation.
Note that since version `3.0.0`, you do not have to explicitly set `failOnMissinWebXml` property,
which default value has change to `false` (see [documentation](https://maven.apache.org/plugins/maven-war-plugin/war-mojo.html#failOnMissingWebXml) for details).

*Update*: Moreover, starting with version `3.1.0`, default value is set to `false` only if the project depends on the
Servlet 3.0 API or newer.

## Tomcat
Tomcat 8 has built-in support for Servlet API 3.1. (a.k.a. [https://jcp.org/en/jsr/detail?id=340](https://jcp.org/en/jsr/detail?id=340)),
which is included in Java EE 7 Web Profile.

We define new dependency in `pom.xml`:
{% highlight xml %}
<dependency>
  <groupId>javax</groupId>
  <artifactId>javaee-web-api</artifactId>
  <version>7.0</version>
  <scope>provided</scope>
</dependency>
{% endhighlight %}
The `<scope>provided</scope>` definition gives us the assurance that the libraries will **not** be included in the final
web archive, because we want to use server-side libraries already included in Tomcat.

TUUUUU
## CDI
As a CDI implementation we use Weld, which as we already mentioned, is a reference implementation for CDI and has direct
support in Tomcat.

Because we want to compile our project against the CDI specification, we need to add the CDI API dependency to the project:
{% highlight xml %}
<dependency>
  <groupId>javax.enterprise</groupId>
  <artifactId>cdi-api</artifactId>
  <version>1.2</version>
  <scope>provided</scope>
</dependency>
{% endhighlight %}

This dependency has a defined `</scope>` as `provided`, just like the ServletAPI, as it will be used only at the time of the project compilatoin and during the runtime, Weld libraries will be used, which will be added to the project with the `runtime` scope, which means that libraries are not necessary for compilatoin, but for application run.
{% highlight xml %}
<dependency>
  <groupId>org.jboss.weld.servlet</groupId>
  <artifactId>weld-servlet</artifactId>
  <version>2.4.3.Final</version>
  <scope>runtime</scope>
</dependency>
{% endhighlight %}

For CDI support, we must add the `beans.xml` file (even if empty) as specification told us. In the `WEB-INF` folder, create a `beans.xml` file with the following content:
{% highlight xml %}
<beans xmlns="http://xmlns.jcp.org/xml/ns/javaee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/beans_1_2.xsd"
       version="1.2"
       bean-discovery-mode="all">
</beans>
{% endhighlight %}
META-INF/context.xml
{% highlight xml %}
<Context>
  <Resource name="BeanManager"
            auth="Container"
            type="javax.enterprise.inject.spi.BeanManager"
            factory="org.jboss.weld.resources.ManagerObjectFactory"/>
</Context>
{% endhighlight %}

