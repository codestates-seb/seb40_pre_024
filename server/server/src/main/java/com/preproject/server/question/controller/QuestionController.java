package com.preproject.server.question.controller;

import com.preproject.server.answer.mapper.AnswerMapper;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.question.dto.QuestionAnswerDto;
import com.preproject.server.question.dto.QuestionPatchDto;
import com.preproject.server.question.dto.QuestionPostDto;
import com.preproject.server.question.dto.QuestionResponseDto;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.mapper.QuestionMapper;
import com.preproject.server.question.service.QuestionService;
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

@Validated
@RequestMapping("/api/questions")
@RestController
public class QuestionController {

    private final QuestionMapper mapper;
    private final QuestionService service;

    private final MemberMapper memberMapper;

    private final AnswerMapper answerMapper;

    public QuestionController(QuestionMapper mapper, QuestionService service, MemberMapper memberMapper, AnswerMapper answerMapper) {
        this.mapper = mapper;
        this.service = service;
        this.memberMapper = memberMapper;
        this.answerMapper = answerMapper;
    }

    @NeedMemberId //파라미터로 서버에서 인증된 MemberId가 필요한 경우 붙이면 되는 사용자 정의 어노테이션
    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto, Long authMemberId) {

        Question question = mapper.questionPostDtoToQuestion(questionPostDto);

        Member member = new Member();
        member.setMemberId(authMemberId);
        question.setMember(member);

        Question createdQuestion = service.createQuestion(question);

        SingleResponseDto<QuestionResponseDto> singleResponseDto =
                new SingleResponseDto<>(mapper.questionToQuestionResponseDto(createdQuestion, memberMapper));

        return new ResponseEntity<>(singleResponseDto, HttpStatus.CREATED);
    }

    @NeedMemberId
    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive Long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto,
                                        Long authMemberId) {

        Question question = mapper.questionPatchDtoToQuestion(questionPatchDto);
        question.setQuestionId(questionId);
        Question updateQuestion = service.updateQuestion(question, authMemberId);

        SingleResponseDto<QuestionResponseDto> singleResponseDto =
                new SingleResponseDto<>(mapper.questionToQuestionResponseDto(updateQuestion, memberMapper));

        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{question-id}") // 질문을 클릭했을 때
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive Long questionId,
                                      @Positive @RequestParam(defaultValue = "1") int page,
                                      @Positive @RequestParam(defaultValue = "15") int size){
        Question question = service.findQuestion(questionId);

        SingleResponseDto<QuestionAnswerDto> singleResponseDto =
                new SingleResponseDto<>(mapper.questionToQuestionAnswerDto(question, memberMapper, answerMapper, page-1));

        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

    @GetMapping // 전체 질문 조회
    public ResponseEntity getQuestions(@Positive @RequestParam(defaultValue = "1") int page,
                                       @Positive @RequestParam(defaultValue = "15") int size) {
        Page<Question> pageQuestions = service.findQuestions(page - 1, size);
        List<Question> questions = pageQuestions.getContent();

        MultiResponseDto<QuestionResponseDto> multiResponseDto =
                new MultiResponseDto<>(mapper.questionsToQuestionResponseDtoList(questions, memberMapper), pageQuestions);


        return new ResponseEntity(multiResponseDto, HttpStatus.OK);
    }

    @NeedMemberId
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive Long questionId,
                                         Long authMemberId) {
        service.deleteQuestion(questionId, authMemberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
