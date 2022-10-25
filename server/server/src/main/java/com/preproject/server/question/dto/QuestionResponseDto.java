package com.preproject.server.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionResponseDto {

    private Long questionId;
    private String questionTitle;
    private String questionContent;
    private int questionViewed;

}
