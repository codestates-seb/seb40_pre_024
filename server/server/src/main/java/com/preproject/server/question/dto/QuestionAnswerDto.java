package com.preproject.server.question.dto;

import com.preproject.server.answer.dto.AnswerResponseDto;
import com.preproject.server.response.MultiResponseDto;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class QuestionAnswerDto {

    // 질문 상세 페이지

    private Long questionId;
    private String questionTitle;
    private String questionContent;
    private int questionViewed;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private MultiResponseDto<AnswerResponseDto> answerResponseDto;

}
