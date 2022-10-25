package com.preproject.server.answer.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class AnswerPostDto {
    @NotBlank
    private String answerContent;

    @Positive
    private long memberId;

    @Positive
    private long questionId;
}
