package com.preproject.server.answer.dto;

import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Getter
public class AnswerPostDto {

    private Long memberId;

    private Long questionId;

    @Length(min = 5, max = 1000)
    @NotBlank
    private String answerContent;


}
