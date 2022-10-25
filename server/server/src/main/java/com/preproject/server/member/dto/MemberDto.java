package com.preproject.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

public class MemberDto {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Post{


        private Long memberId;

        @Email
        private String memberEmail;

        //정규식 필요
        private String memberName;

        private String memberImageUrl;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Patch{

        //정규식 필요
        private String memberName;

    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{

        private Long memberId;

        private String memberEmail;

        private String memberName;

        private String memberImageUrl;

    }
}
