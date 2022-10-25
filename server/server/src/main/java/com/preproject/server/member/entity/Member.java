package com.preproject.server.member.entity;

import com.preproject.server.auditable.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Member extends Auditable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long memberId;


    @Length(min = 16, max = 16)
    @Column(nullable = false)
    private String memberPwd;

    @Length(min = 1, max = 50)
    @Column(nullable = false)
    private String memberEmail;

    @Length(min = 16, max = 16)
    @Column(nullable = false)
    private String memberName;

    @Length(max = 300)
    private String memberImageUrl;

}
