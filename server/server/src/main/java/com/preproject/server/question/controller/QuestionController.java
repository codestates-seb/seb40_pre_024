package com.preproject.server.question.controller;

import com.preproject.server.question.dto.QuestionPatchDto;
import com.preproject.server.question.dto.QuestionPostDto;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.mapper.QuestionMapper;
import com.preproject.server.question.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/members/questions")
@Validated
public class QuestionController {

    private final QuestionMapper mapper;
    private final QuestionService service;

    public QuestionController(QuestionMapper mapper, QuestionService service) {
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postQuestion(@Valid  @RequestBody QuestionPostDto questionPostDto) {

        Question question = mapper.questionPostDtoToQuestion(questionPostDto);

        return new ResponseEntity<>(question, HttpStatus.CREATED);
    }

    @PatchMapping("{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") Long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto) {

        Question question = mapper.questionPatchDtoToQuestion(questionPatchDto);

        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @GetMapping // 전체 질문 조회
    public ResponseEntity getQuestions(int page,
                                       int size) {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("{question-id}") // 질문을 클릭했을 때
    public ResponseEntity getQuestion(@PathVariable("question-id") Long questionId){

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") Long questionId) {

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
