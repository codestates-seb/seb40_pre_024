package com.preproject.server.security.handler;

import com.preproject.server.exception.AuthException;
import com.preproject.server.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/** Exception 상황은 아니지만, 인증처리를 실패하였을 경우를 처리 하는 핸들러  **/
@Slf4j
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {


    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)  {

        //존재하지 않는 이메일일 경우
        //비밀번호가 틀린 경우 모두 진입함.
        throw new AuthException(ExceptionCode.AUTHENTICATION_FAIL);
    }
}
