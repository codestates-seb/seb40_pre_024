package com.preproject.server.question.controller;

import com.preproject.server.answer.mapper.AnswerMapper;
import com.preproject.server.answer.service.AnswerService;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.member.service.MemberService;
import com.preproject.server.question.dto.QuestionAnswerDto;
import com.preproject.server.question.dto.QuestionPatchDto;
import com.preproject.server.question.dto.QuestionPostDto;
import com.preproject.server.question.dto.QuestionResponseDto;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.mapper.QuestionMapper;
import com.preproject.server.question.service.QuestionService;
import com.preproject.server.response.MultiResponseDto;
import com.preproject.server.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public QuestionController(QuestionMapper mapper, QuestionService service, MemberMapper memberMapper, AnswerMapper answerMapper) {
        this.mapper = mapper;
        this.service = service;
        this.memberMapper = memberMapper;
        this.answerMapper = answerMapper;
    }

    private final AnswerMapper answerMapper;


    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto) {

        Question question = mapper.questionPostDtoToQuestion(questionPostDto);
        Question createdQuestion = service.createQuestion(question);

        SingleResponseDto<QuestionResponseDto> singleResponseDto =
                new SingleResponseDto<>(mapper.questionToQuestionResponseDto(createdQuestion, memberMapper));

        return new ResponseEntity<>(singleResponseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive Long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto) {

        Question question = mapper.questionPatchDtoToQuestion(questionPatchDto);
        question.setQuestionId(questionId);
        Question updateQuestion = service.updateQuestion(question);

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
                new SingleResponseDto<>(mapper.questionToQuestionAnswerDto(question, memberMapper, answerMapper));

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


    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive Long questionId) {
        service.deleteQuestion(questionId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
