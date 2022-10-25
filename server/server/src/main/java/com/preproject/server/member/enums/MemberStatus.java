package com.preproject.server.member.enums;

public enum MemberStatus {

    ACTIVE(0),
    LEAVE(1);

    int code;

    MemberStatus(int code) {
        this.code = code;
    }
}
