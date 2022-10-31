package com.preproject.server.answer.controller;

import com.preproject.server.answer.dto.AnswerPatchDto;
import com.preproject.server.answer.dto.AnswerPostDto;
import com.preproject.server.answer.dto.AnswerResponseDto;
import com.preproject.server.answer.entity.Answer;
import com.preproject.server.answer.mapper.AnswerMapper;
import com.preproject.server.answer.service.AnswerService;
import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.member.service.MemberService;
import com.preproject.server.member.wrapper.WrapperUserNamePasswordAuthenticationToken;
import com.preproject.server.question.dto.QuestionResponseDto;
import com.preproject.server.question.entity.Question;
import com.preproject.server.response.MultiResponseDto;
import com.preproject.server.response.SingleResponseDto;
import com.preproject.server.tx.NeedMemberId;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/answers")
@Validated


public class AnswerController {
    private AnswerService answerService;
    private AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.mapper = mapper;
    }
    @NeedMemberId
    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto, Long authMemberId) {

//        WrapperUserNamePasswordAuthenticationToken wrapperUserNamePasswordAuthenticationToken = (WrapperUserNamePasswordAuthenticationToken)authentication;
//        Integer memberId = wrapperUserNamePasswordAuthenticationToken.getMemberId();

        Member member = new Member();
        answerPostDto.setMemberId(authMemberId);

        Answer answer = mapper.answerPostDtoToAnswer(answerPostDto);

        Answer createdAnswer = answerService.createAnswer(answer);

        SingleResponseDto<AnswerResponseDto> singleResponseDto =
                new SingleResponseDto<>(mapper.answerToAnswerResponseDto(createdAnswer));
        return new ResponseEntity<>(singleResponseDto, HttpStatus.CREATED);
    }
    @NeedMemberId
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto,
                                      Long authMemberId) {

        Answer answer = mapper.answerPatchDtoToAnswer(answerPatchDto);
        answer.setAnswerId(answerId);
        Answer updateAnswer = answerService.updateAnswer(answer, authMemberId);

        SingleResponseDto<AnswerResponseDto> singleResponseDto =
                new SingleResponseDto<>(mapper.answerToAnswerResponseDto(updateAnswer));

        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive long answerId) {
        Answer answer = answerService.findAnswer(answerId);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.answerToAnswerResponseDto(answer)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswers(@Positive @RequestParam(defaultValue = "1") int page,
                                     @Positive @RequestParam(defaultValue = "15") int size) {
        Page<Answer> pageAnswers = answerService.findAnswers(page - 1, size);
        List<Answer> answers = pageAnswers.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.answerToAnswerResponseDtos(answers), pageAnswers),
                HttpStatus.OK);
    }
    @NeedMemberId
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId, Long authMemberId) {


        answerService.deleteAnswer(answerId, authMemberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}