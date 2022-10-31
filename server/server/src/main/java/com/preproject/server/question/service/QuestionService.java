package com.preproject.server.question.service;

import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question){

        Question savedQuestion = questionRepository.save(question);

        return savedQuestion;
    }

    public Question updateQuestion(Question question, Long authMemberId){
        Question findQuestion = verifyExistsQuestion(question.getQuestionId());

        if(findQuestion.getMember().getMemberId() != authMemberId){
            throw new BusinessException(ExceptionCode.BAD_REQUEST);
        }

//        Optional.ofNullable(question.getModifiedAt())
//                .ifPresent(modifiedAt -> findQuestion.setModifiedAt(modifiedAt));  // 수정날짜는 auditable에서 적용
        Optional.ofNullable(question.getQuestionTitle())
                .ifPresent(questionTitle -> findQuestion.setQuestionTitle(questionTitle));
        Optional.ofNullable(question.getQuestionContent())
                .ifPresent(questionContent -> findQuestion.setQuestionContent(questionContent));

        Question updateQuestion = questionRepository.save(findQuestion);

        return updateQuestion;
    }

    public Question findQuestion(Long questionId){

        Question findQuestion = verifyExistsQuestion(questionId);
        findQuestion.setQuestionViewed(findQuestion.getQuestionViewed()+1); // QuestionViewed+1
        questionRepository.save(findQuestion);

        return findQuestion;
    }

    public Page<Question> findQuestions(int page, int size){

        Page<Question> findQeustions =
                questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));

        return findQeustions;
    }

    public void deleteQuestion(Long questionId, Long authMemberId){

        Question findQuestion = verifyExistsQuestion(questionId);

        if(findQuestion.getMember().getMemberId() != authMemberId){
            throw new BusinessException(ExceptionCode.BAD_REQUEST);
        }

        questionRepository.delete(findQuestion);

    }

    private Question verifyExistsQuestion(Long questionId) {

        return  questionRepository.findById(questionId).orElseThrow(() ->
        {throw new BusinessException(ExceptionCode.QUESTION_NOT_EXISTS);
        });

    }
}
