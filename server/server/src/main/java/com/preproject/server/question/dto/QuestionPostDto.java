package com.preproject.server.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class QuestionPostDto {

    @NotBlank
    @Length(min = 5, max = 100)
    private String questionTitle;

    @NotBlank
    @Length(min = 15)
    private String questionContent;

}
