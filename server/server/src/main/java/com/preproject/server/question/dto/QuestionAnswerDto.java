package com.preproject.server.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionAnswerDto {

    private Long questionId;
    private String questionTitle;
    private String questionContent;
    private int questionViewed;
//    private List<AnswerResponseDto> answer; 질문 상세페이지에 들어갈 dto

}
