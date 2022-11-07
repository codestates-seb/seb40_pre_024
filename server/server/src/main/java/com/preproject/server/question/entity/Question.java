package com.preproject.server.question.entity;

import com.preproject.server.answer.entity.Answer;
import com.preproject.server.auditable.Auditable;
import com.preproject.server.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.w3c.dom.Text;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "QUESTION")
public class Question extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String questionTitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String questionContent;

    @Column(nullable = false)
    private int questionViewed;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answer = new ArrayList<>();

    //
}
