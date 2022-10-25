package com.preproject.server.question.controller;

import com.preproject.server.question.dto.QuestionDto;
import com.preproject.server.question.dto.QuestionPatchDto;
import com.preproject.server.question.dto.QuestionPostDto;
import com.preproject.server.question.dto.QuestionResponseDto;
import com.preproject.server.question.entity.Question;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/questions")
@Validated
public class QuestionController {


    @PostMapping("/members/questions")
    public ResponseEntity postQuestion(@Valid  @RequestBody QuestionPostDto questionPostDto) {


        return new ResponseEntity<QuestionPostDto>(questionPostDto, HttpStatus.CREATED);
    }

    @PatchMapping("/members/questions/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") Long questionId,
                                        @Valid QuestionPatchDto questionPatchDto) {

        return new ResponseEntity<QuestionPatchDto>(questionPatchDto, HttpStatus.OK);
    }

    @GetMapping("/members/questions") // 전체 질문 조회
    public ResponseEntity getQuestions(int page,
                                       int size) {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/members/questions/{question-id}") // 질문을 클릭했을 때
    public ResponseEntity getQuestion(@PathVariable("question-id") Long questionId){

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/members/questions/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") Long questionId) {

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }



}
