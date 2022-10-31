package com.preproject.server.question.mapper;

import com.preproject.server.answer.dto.AnswerResponseDto;
import com.preproject.server.answer.entity.Answer;
import com.preproject.server.answer.mapper.AnswerMapper;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.question.dto.QuestionAnswerDto;
import com.preproject.server.question.dto.QuestionPatchDto;
import com.preproject.server.question.dto.QuestionPostDto;
import com.preproject.server.question.dto.QuestionResponseDto;
import com.preproject.server.question.entity.Question;
import com.preproject.server.response.MultiResponseDto;
import org.mapstruct.Mapper;
import org.springframework.data.domain.PageImpl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    default Question questionPostDtoToQuestion(QuestionPostDto questionPostDto){
        if ( questionPostDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestionTitle( questionPostDto.getQuestionTitle() );
        question.setQuestionContent( questionPostDto.getQuestionContent() );

        Member member = new Member(); // memberId를 question에 저장
        member.setMemberId(questionPostDto.getMemberId());
        question.setMember(member);

        return question;
    }

    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);

    default QuestionResponseDto questionToQuestionResponseDto(Question question, MemberMapper memberMapper) {
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

        Member member = question.getMember(); // question에 저장된 member를 response로
        questionResponseDto.setMemberResponseDto(memberMapper.memberToMemberDtoResponse(member));

        return questionResponseDto;
    }

    // 질문 상세페이지
    default QuestionAnswerDto questionToQuestionAnswerDto(Question question, MemberMapper memberMapper,
                                                          AnswerMapper answerMapper, int answerpage){
        if ( question == null ) {
            return null;
        }

        QuestionAnswerDto questionAnswerDto = new QuestionAnswerDto();

        questionAnswerDto.setQuestionId( question.getQuestionId() );
        questionAnswerDto.setQuestionTitle( question.getQuestionTitle() );
        questionAnswerDto.setQuestionContent( question.getQuestionContent() );
        questionAnswerDto.setQuestionViewed( question.getQuestionViewed() );
        questionAnswerDto.setCreatedAt( question.getCreatedAt() );
        questionAnswerDto.setModifiedAt( question.getModifiedAt() ); // 클릭했을때 수정시간이 변할 이유가?

        Member member = question.getMember(); // question에 저장된 member를 response로
        questionAnswerDto.setMemberResponseDto(memberMapper.memberToMemberDtoResponse(member));

        Collections.reverse(question.getAnswer()); // 리스트 역순으로 정렬

        List<Answer> answerList = question.getAnswer() // 원하는 페이지에서 15개씩 answer 추출
                .stream()
                .skip(15*answerpage)
                .limit(15)
                .collect(Collectors.toList());


        PageImpl page = new PageImpl<>(answerList); // question에 저장된 answer를 response로
        MultiResponseDto<AnswerResponseDto> multiResponseDto =
                new MultiResponseDto<>(answerMapper.answerToAnswerResponseDtos(answerList), page);
        questionAnswerDto.setAnswerResponseDto(multiResponseDto);


        return questionAnswerDto;
    }

    // 질문 리스트
    default List<QuestionResponseDto> questionsToQuestionResponseDtoList(List<Question> questionList, MemberMapper memberMapper) {
        if ( questionList == null ) {
            return null;
        }

        List<QuestionResponseDto> list = new ArrayList<QuestionResponseDto>( questionList.size() );
        for ( Question question : questionList ) {
            list.add( questionToQuestionResponseDto( question, memberMapper ) );
        }

        return list;}
}