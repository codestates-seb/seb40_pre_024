package com.preproject.server.answer.dto;

import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class AnswerPostDto {

    @Length(min = 5, max = 1000)
    @NotBlank
    private String answerContent;


}
