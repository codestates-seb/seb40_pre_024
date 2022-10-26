package com.preproject.server.answer.dto;

import com.preproject.server.answer.entity.Answer;
import lombok.Getter;

@Getter
public class AnswerPatchDto {
    private long answerId;

    private String answerContent;

}

