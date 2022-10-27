package com.preproject.server.question.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class QuestionPatchDto {

    private Long questionId;

    @NotBlank
    @Length(min = 5, max = 100)
    private String questionTitle;

    @NotBlank
    @Length(min = 15, max = 1000)
    private String questionContent;

}
