package com.preproject.server.exception;

public class BusinessException extends RuntimeException{

    ExceptionCode exceptionCode;

    public BusinessException(ExceptionCode exceptionCode) {
        super(exceptionCode.message);
    }
}
