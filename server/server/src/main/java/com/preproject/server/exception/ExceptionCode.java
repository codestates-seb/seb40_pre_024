package com.preproject.server.exception;

import lombok.Getter;
import lombok.Setter;


public enum ExceptionCode {

    MEMBER_ALREADY_EXISTS(400, "member_already_exists"),
    MEMBER_NOT_EXISTS(404, "member_not_exists"),
    QUESTION_NOT_EXISTS(404, "question_not_exists"),
    ANSWER_NOT_EXISTS(404, "answer_not_exists"),
    ALREADY_LOGOUT_MEMBER(400, "already_logout_member"),
    //인증 실패 코드 (아이디 존재하지 않거나, 비밀번호 틀린경우)
    AUTHENTICATION_FAIL(401, "authentication_fail"),
    ACCESS_DENIED(400, "access_denied"),

    BAD_REQUEST(400,"bad_request"),
    INVALID_SIGNATURE_TOKEN(400,"invalid_signature_token"),
    EXPIRED_TOKEN(400,"expired_token"),
    INVALID_TOKEN(400,"invalid_token"),

    //일정 수준의 권한이 필요한 리소스에 대하여 접근하는데, 권한이 존재하지 않는 경우 (토큰을 안 보낸 경우)
    UNAUTHORIZED_EXCEPTION(401, "unauthorized_exception");



    @Getter
    private int status;
    @Getter
    private String message;
    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
