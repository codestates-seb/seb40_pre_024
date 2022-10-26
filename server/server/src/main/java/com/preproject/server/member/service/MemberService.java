package com.preproject.server.member.service;

import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.enums.MemberStatus;
import com.preproject.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;
    public Member createMember(Member member) {

        verifyNotExistsMember(member.getMemberEmail(), member.getMemberName());
        member.setMemberPwd(passwordEncoder.encode(member.getPassword()));
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }


    public Member removeMember(Long memberId) {
        Member deletingMember = verifyExistsMember(memberId);
//        deletingMember.setMemberStatus(MemberStatus.LEAVE);
        Member deletedMember = memberRepository.save(deletingMember);
        return deletedMember;
    }

    public Member findMember(Long memberId) {

        Member findMember = verifyExistsMember(memberId);
        return findMember;
    }

//    public Page<Member> findMembers() {
//
//        return null;
//    }


    //    public Member updateMember(Member member) {
//
//        return null;
//    }

    //----------------------- 핸들러 메소드 영역 -------------------------------


    private Member verifyExistsMember(Long memberId) {

        return memberRepository.findById(memberId).orElseThrow(()->
        {throw new BusinessException(ExceptionCode.MEMBER_NOT_EXISTS);});

    }


    private void verifyNotExistsMember(String email, String name) {

        memberRepository.findMemberByMemberEmailOrMemberName(email, name).ifPresent(
                findMember -> {throw new BusinessException(ExceptionCode.MEMBER_ALREADY_EXISTS);});

    }




}
