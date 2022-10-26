package com.preproject.server.question.entity;

import com.preproject.server.auditable.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "QUESTION")
public class Question extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Length(min = 5, max = 100)
    @Column(nullable = false) // length = 100 글자수 제한
    private String questionTitle;

    @Length(min = 15, max = 1000)
    @Column(nullable = false)
    private String questionContent;

    @Column(nullable = false)
    private int questionViewed;

//    private int questionVote;
}
