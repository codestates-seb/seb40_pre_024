package com.preproject.server.member.dto;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

public class MemberDto {

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Post{

        @NotBlank
        @Length(max = 50, message = "잘못된 이메일 형식입니다")
        @Email
        private String memberEmail;

        //정규식 필요
        @NotBlank
        @Pattern(regexp = "^[가-힣a-zA-Z]*$", message = "멤버 네임은 한글과 영문만 가능합니다")
        private String memberName;

        @NotBlank
        @Length(min = 8, max = 16, message = "비밀번호는 8자 이상 16자 이하의 길이이여야 합니다")
        private String memberPwd;

    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Patch{

        //정규식 필요
        @NotBlank
        @Pattern(regexp = "^[가-힣a-zA-Z]*$", message = "멤버 네임은 한글과 영문만 가능합니다")
        private String memberName;

    }

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{

        private Long memberId;

        private String memberEmail;

        private String memberName;

//        private String memberImageUrl;

        private List<String> roles;

    }
}
