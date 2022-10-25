package com.preproject.server.member.service;

import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public Member createMember(Member member) {

        verifyNotExistsMember(member.getMemberEmail(), member.getMemberName());
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    public Member updateMember(Member member) {

        return null;
    }

    public Member deleteMember(Long memberId) {

        return null;
    }

    public Member findMember(Long memberId) {

        Member findMember = verifyExistsMember(memberId);
        return findMember;
    }

    public Page<Member> findMembers() {

        return null;
    }


    private Member verifyExistsMember(Long memberId) {

        return memberRepository.findById(memberId).orElseThrow(()->
        {throw new BusinessException(ExceptionCode.MEMBER_NOT_EXISTS);});

    }


    private void verifyNotExistsMember(String email, String name) {

        memberRepository.findMemberByMemberEmailOrMemberName(email, name).ifPresent(
                findMember -> {throw new BusinessException(ExceptionCode.MEMBER_ALREADY_EXISTS);});

    }


}
