package com.preproject.server.answer.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class AnswerPostDto {

    private Long memberId;

    private Long questionId;

    @Length(min = 5)
    @NotBlank
    private String answerContent;


}
