package com.preproject.server.exception;

import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

/** Authentication & Authorize 관련 Exception 정보를 담은 예외 클래스 **/
public class AuthException extends AuthenticationException {

    @Getter
    ExceptionCode exceptionCode;

    public AuthException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
