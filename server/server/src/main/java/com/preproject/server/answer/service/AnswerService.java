package com.preproject.server.answer.service;

import com.preproject.server.answer.entity.Answer;
import com.preproject.server.answer.repository.AnswerRepository;
import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service

public class AnswerService {

    private final AnswerRepository answerRepository;


    public AnswerService(AnswerRepository answerRepository) {

        this.answerRepository = answerRepository;
    }


    public Answer createAnswer(Answer answer) {
        Answer savedAnswer = answerRepository.save(answer);

        return savedAnswer;
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = verifyExistsAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getAnswerContent())
                .ifPresent(answerContent -> findAnswer.setAnswerContent(answerContent));

        Answer updateAnswer = answerRepository.save(findAnswer);

        return updateAnswer;
    }

    private Answer verifyExistsAnswer(Long answerId) {

        return  answerRepository.findById(answerId).orElseThrow(() ->
        {throw new BusinessException(ExceptionCode.ANSWER_NOT_EXISTS);
        });

    }

    public Answer findAnswer(long answerId) {
        return verifyExistsAnswer(answerId);
    }

    public Page<Answer> findAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page, size,
                Sort.by("answerId").descending()));
    }

    public void deleteAnswer(long answerId) {
        Answer answer = verifyExistsAnswer(answerId);
        answerRepository.delete(answer);
    }

}
