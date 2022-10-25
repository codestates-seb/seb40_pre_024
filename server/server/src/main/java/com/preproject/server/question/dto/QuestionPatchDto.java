package com.preproject.server.question.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionPatchDto {

    private Long questionId;
    private String questionTitle;
    private String questionContent;

}
