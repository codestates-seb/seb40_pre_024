package com.preproject.server.exception;

public enum ExceptionCode {

    MEMBER_ALREADY_EXISTS(400, "member_already_exists"),
    MEMBER_NOT_EXISTS(404, "member_not_exists"),
    QUESTION_NOT_EXISTS(404, "question_not_exists"),
    ANSWER_NOT_EXISTS(404, "answer_not_exists"),
    ALREADY_LOGOUT_MEMBER(400, "already_logout_member"),

    //임시
    AUTHENTICATION_FAIL(400, "authentication_fail"),
    ACCESS_DENIED(400, "access_denied");

    int code;
    String message;
    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
