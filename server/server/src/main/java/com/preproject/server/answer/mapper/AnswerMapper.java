package com.preproject.server.answer.mapper;

import com.preproject.server.answer.dto.AnswerPatchDto;
import com.preproject.server.answer.dto.AnswerPostDto;
import com.preproject.server.answer.dto.AnswerResponseDto;
import com.preproject.server.answer.entity.Answer;
import com.preproject.server.member.dto.MemberDto;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.question.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "Spring")
public interface AnswerMapper {
    default Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto) {
        Answer answer = new Answer();
        answer.setAnswerContent(answerPostDto.getAnswerContent());

        Member member = new Member(); // memberId를 answer에 저장
        member.setMemberId(answerPostDto.getMemberId());
        answer.setMember(member);

        Question question = new Question(); // questionId를 answer에 저장
        question.setQuestionId(answerPostDto.getQuestionId());
        answer.setQuestion(question);

        return answer;
    }

    default Answer answerPatchDtoToAnswer(Answer answer) {
        AnswerResponseDto answerResponseDto = new AnswerResponseDto();

        if ( answer.getAnswerId() != null ) {
            answerResponseDto.setAnswerId( answer.getAnswerId() );
        }

        answer.setAnswerId(answer.getAnswerId());
        answer.setAnswerContent(answer.getAnswerContent());

        return answer;
    }
    default AnswerResponseDto answerToAnswerResponseDto(MemberMapper memberMapper, Answer answer){
        AnswerResponseDto answerResponseDto = new AnswerResponseDto();
        answerResponseDto.setAnswerId(answer.getAnswerId());
        answerResponseDto.setAnswerContent(answer.getAnswerContent());

        return answerResponseDto;
    }
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);
    MemberDto.Response memberToMemberResponseDto(Member member);

    default AnswerResponseDto answerToAnswerResponseDto(Answer answer) {
        if (answer == null) {
            return null;
        }
        Member member = answer.getMember();
        AnswerResponseDto answerResponseDto = new AnswerResponseDto();

        if ( answer.getAnswerId() != null ) {
            answerResponseDto.setAnswerId( answer.getAnswerId() );
        }
        answerResponseDto.setAnswerContent( answer.getAnswerContent() );
        answerResponseDto.setCreatedAt( answer.getCreatedAt() );
        answerResponseDto.setModifiedAt( answer.getModifiedAt() );
        answerResponseDto.setMemberResponseDto(memberToMemberResponseDto(member));

        return answerResponseDto;
    }
    List<AnswerResponseDto> answerToAnswerResponseDtos(List<Answer> answers);
}
