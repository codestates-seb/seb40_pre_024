package com.preproject.server.member.entity;

import com.preproject.server.auditable.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
    private String memberPwd;

    @Length(min = 1, max = 50)
    private String memberEmail;

    @Length(min = 16, max = 16)
    private String memberName;

    @Length(max = 300)
    private String memberImageUrl;

}
