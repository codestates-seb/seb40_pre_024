package com.preproject.server.answer.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class AnswerPatchDto {

    private Long answerId;

    @NotBlank
    @Length(min = 5)
    private String answerContent;

    public void setAnswerId(long answerId) {

        this.answerId = answerId;
    }
}
