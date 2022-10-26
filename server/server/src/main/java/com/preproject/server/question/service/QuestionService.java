package com.preproject.server.question.service;

import com.preproject.server.question.entity.Question;
import com.preproject.server.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private final QuestionRepository repository;

    public QuestionService(QuestionRepository repository) {
        this.repository = repository;
    }

    public Question createQuestion(Question question){

        return repository.save(question);
    }

    public Question updateQuestion(Question question){

        return null;
    }

    public Question findQuestion(Long questionId){

        return null;
    }

    public Page<Question> findQuestions(int page, int size){

        return null;
    }

    public Question deleteQuestion(Long questionId){

        return null;
    }
}
