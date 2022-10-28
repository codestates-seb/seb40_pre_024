package com.preproject.server.security.handler;

import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        System.out.println(authException.getMessage());

        //임시
        throw new BusinessException(ExceptionCode.AUTHENTICATION_FAIL);

    }
}
