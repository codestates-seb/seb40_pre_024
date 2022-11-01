package com.preproject.server.answer.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class AnswerPatchDto {

    private Long memberId;

    private long questionId;
    private long answerId;

    @NotBlank
    @Length(min = 5, max = 1000)
    private String answerContent;

    public void setAnswerId(long answerId) {

        this.answerId = answerId;
    }
}
