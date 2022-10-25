package com.preproject.server.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "QUESTION")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false) // length = 100 글자수 제한
    private String questionTitle;

    @Column(nullable = false)
    private String questionContent;

    @Column(nullable = false)
    private int questionViewed;

//    private int questionVote;
}
