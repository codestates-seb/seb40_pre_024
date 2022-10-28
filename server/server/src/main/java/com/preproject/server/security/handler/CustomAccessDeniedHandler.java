package com.preproject.server.security.handler;

import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        System.out.println(accessDeniedException.getMessage());

        //임시
        throw new BusinessException(ExceptionCode.ACCESS_DENIED);
    }
}
