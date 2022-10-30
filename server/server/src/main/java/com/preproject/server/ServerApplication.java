package com.preproject.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.DispatcherServlet;

@EnableJpaAuditing
@SpringBootApplication
public class ServerApplication extends SpringBootServletInitializer {   // 존재하지 않는 리소스에 접근하는 url 처리 위해, 404

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(ServerApplication.class, args);



        // 존재하지 않는 리소스에 접근하는 url 처리 위해, 404
        DispatcherServlet dispatcherServlet = (DispatcherServlet) context.getBean("dispatcherServlet");
        dispatcherServlet.setThrowExceptionIfNoHandlerFound(true);
    }

}
