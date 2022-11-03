package com.preproject.server.member.service;

import com.preproject.server.exception.AuthException;
import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.repository.MemberRepository;
import com.preproject.server.utils.CustomAuthorityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository repository;
    private final CustomAuthorityUtil customAuthorityUtil;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Member findMember = verifyExistsMember(username);

        return findMember;
    }



    private Member verifyExistsMember(String email) {

        Member findMember = repository.findMemberByMemberEmail(email).orElseThrow(() -> {
            ExceptionCode exceptionCode = ExceptionCode.MEMBER_NOT_EXISTS;
            throw new AuthException(exceptionCode, exceptionCode.getMessage());
        });

        return findMember;
    }
}
