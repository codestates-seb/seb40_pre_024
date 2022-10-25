package com.preproject.server.answer.entity;


import com.preproject.server.auditable.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "ANSWERS")

public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Length(min = 5, max = 1000)
    @Column(nullable = false)
    private String answerContent;

}
