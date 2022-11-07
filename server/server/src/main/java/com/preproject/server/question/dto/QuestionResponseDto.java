package com.preproject.server.question.dto;

import com.preproject.server.member.dto.MemberDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Getter
@Setter
public class QuestionResponseDto {

    private Long questionId;
    private String questionTitle;
    private String questionContent;
    private int questionViewed;
    private Long memberId;
    private String memberName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int answerCount;

}
