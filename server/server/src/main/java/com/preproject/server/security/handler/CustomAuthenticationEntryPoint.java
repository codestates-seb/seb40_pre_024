package com.preproject.server.security.handler;

import com.preproject.server.exception.AuthException;
import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/** 정상적인 상황에서 벗어나 Exception이 발생되는 경우를 처리 하는 핸들러 **/
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        //권한이 필요한 리소스에 대해 접근하는데, 권한이 존재하지 않는 경우 진입
        throw new AuthException(ExceptionCode.UNAUTHORIZED_EXCEPTION);
    }
}
