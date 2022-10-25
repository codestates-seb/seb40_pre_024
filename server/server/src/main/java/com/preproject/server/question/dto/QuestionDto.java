package com.preproject.server.question.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class QuestionDto {

    private Long questionId;
    private String questionTitle;
    private String questionContent;
    private int questionViewed;

}
