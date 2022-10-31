package com.preproject.server.exception;

import lombok.Getter;
import lombok.Setter;


public enum ExceptionCode {

    MEMBER_ALREADY_EXISTS(400, "멤버가 이미 존재합니다"),
    MEMBER_NOT_EXISTS(404, "멤버가 존재하지 않습니다"),
    QUESTION_NOT_EXISTS(404, "존재하지 않는 질문입니다"),
    ANSWER_NOT_EXISTS(404, "존재하지 않는 답변입니다"),
    ALREADY_LOGOUT_MEMBER(400, "이미 로그아웃이 된 멤버입니다"),
    //인증 실패 코드 (아이디 존재하지 않거나, 비밀번호 틀린경우)
    AUTHENTICATION_FAIL(401, "인증에 실패하였습니다"),
    ACCESS_DENIED(400, "접근할 수 없는 권한의 요청입니다"),

    BAD_REQUEST(400,"잘못된 요청"),
    INVALID_SIGNATURE_TOKEN(400,"유효하지 않은 시그니쳐 토큰입니다"),
    EXPIRED_TOKEN(400,"유효기간이 지난 토큰입니다"),
    INVALID_TOKEN(400,"유효하지 않은 토큰입니다"),

    //일정 수준의 권한이 필요한 리소스에 대하여 접근하는데, 권한이 존재하지 않는 경우 (토큰을 안 보낸 경우)
    UNAUTHORIZED_EXCEPTION(401, "인증이 되지 않았습니다. 먼저 인증을 하십시오");



    @Getter
    private int status;
    @Getter
    private String message;
    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
