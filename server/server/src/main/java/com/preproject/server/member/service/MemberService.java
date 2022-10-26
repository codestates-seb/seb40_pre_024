package com.preproject.server.member.service;

import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import com.preproject.server.jwt.JwtTokenizer;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.enums.MemberStatus;
import com.preproject.server.member.repository.MemberRepository;
import com.preproject.server.utils.CustomAuthorityUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.time.Duration;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtil customAuthorityUtil;
    private final JwtTokenizer jwtTokenizer;

    //RedisTemplate 보다 문자열에 특화된 타입으로
    //직열화 측면보다는 템플리의 구성을 최소화 되어있는것에 특화 됨
//    private final CustomRedisTemplate customRedisTemplate;

    private final RedisTemplate redisTemplate;

    public Member createMember(Member member) {

        verifyNotExistsMember(member.getMemberEmail(), member.getMemberName());
        member.setMemberPwd(passwordEncoder.encode(member.getPassword()));
        member.setRoles(customAuthorityUtil.getRole());
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

    public void outMember(HttpServletRequest request) {

        String authentication = request.getHeader("Authorization");
        String jws = authentication.replace("bearer", "");
        registerJws(jws);
    }

    private void registerJws(String jws) {
        Map<String, Object> verifyJws = jwtTokenizer.verifyJws(jws);
        ValueOperations valueOperations = redisTemplate.opsForValue();
        String username = (String)verifyJws.get("username");
        valueOperations.set("logout_"+jws,username,Duration.ofMinutes(jwtTokenizer.getAccessTokenExpirationMinutes()));
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
