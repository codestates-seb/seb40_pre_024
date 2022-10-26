package com.preproject.server.question.mapper;

import com.preproject.server.question.dto.QuestionAnswerDto;
import com.preproject.server.question.dto.QuestionPatchDto;
import com.preproject.server.question.dto.QuestionPostDto;
import com.preproject.server.question.dto.QuestionResponseDto;
import com.preproject.server.question.entity.Question;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-10-26T15:00:18+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16 (Azul Systems, Inc.)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public Question questionPostDtoToQuestion(QuestionPostDto questionPostDto) {
        if ( questionPostDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestionTitle( questionPostDto.getQuestionTitle() );
        question.setQuestionContent( questionPostDto.getQuestionContent() );

        return question;
    }

    @Override
    public Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto) {
        if ( questionPatchDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestionId( questionPatchDto.getQuestionId() );
        question.setQuestionTitle( questionPatchDto.getQuestionTitle() );
        question.setQuestionContent( questionPatchDto.getQuestionContent() );

        return question;
    }

    @Override
    public QuestionResponseDto questionToQuestionResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseDto questionResponseDto = new QuestionResponseDto();

        questionResponseDto.setQuestionId( question.getQuestionId() );
        questionResponseDto.setQuestionTitle( question.getQuestionTitle() );
        questionResponseDto.setQuestionContent( question.getQuestionContent() );
        questionResponseDto.setQuestionViewed( question.getQuestionViewed() );
        questionResponseDto.setCreatedAt( question.getCreatedAt() );
        questionResponseDto.setModifiedAt( question.getModifiedAt() );

        return questionResponseDto;
    }

    @Override
    public QuestionAnswerDto questionToQuestionAnswerDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionAnswerDto questionAnswerDto = new QuestionAnswerDto();

        questionAnswerDto.setQuestionId( question.getQuestionId() );
        questionAnswerDto.setQuestionTitle( question.getQuestionTitle() );
        questionAnswerDto.setQuestionContent( question.getQuestionContent() );
        questionAnswerDto.setQuestionViewed( question.getQuestionViewed() );
        questionAnswerDto.setCreatedAt( question.getCreatedAt() );
        questionAnswerDto.setModifiedAt( question.getModifiedAt() );

        return questionAnswerDto;
    }

    @Override
    public List<QuestionResponseDto> questionsToQuestionResponseDtoList(List<Question> questionList) {
        if ( questionList == null ) {
            return null;
        }

        List<QuestionResponseDto> list = new ArrayList<QuestionResponseDto>( questionList.size() );
        for ( Question question : questionList ) {
            list.add( questionToQuestionResponseDto( question ) );
        }

        return list;
    }
}
