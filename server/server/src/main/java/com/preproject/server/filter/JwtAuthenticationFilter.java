package com.preproject.server.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.preproject.server.jwt.JwtTokenizer;
import com.preproject.server.member.entity.Member;
import com.preproject.server.security.dto.LoginDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    //검증이 되지 않은 Authentication을 만들어서 AuthenticationManager에게 넘기고, 리턴으로 검증이 된 Authentication을 넘긴다.
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        ObjectMapper objectMapper = new ObjectMapper();

        LoginDto loginDto;
        try {
            loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        //JWT 토큰 발행 해야함
        Member authenticatedMember = (Member) authResult.getPrincipal();
        String accessToken = delegateGenerateAccessToken(authenticatedMember);
        String refreshToken = delegateGenerateRefreshToken(authenticatedMember.getMemberName());

        //setHeader, addHeader의 차이
        //set은 기존에 같은 헤더키가 존재한다면 덮어씌움
        //add는 기존에 같은 헤더키가 존재한다면 키에 해당하는 값이 복수로 생김,
        response.setHeader("Authorization", "bearer"+accessToken);
        response.setHeader("Refresh", refreshToken);

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        super.unsuccessfulAuthentication(request, response, failed);
    }

    private String delegateGenerateAccessToken(Member member) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getMemberEmail());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());

        Date currentDate = jwtTokenizer.getCurrentDate();
        Date accessTokenExpDate = jwtTokenizer.getAccessTokenExpDate();
        String subject = member.getMemberName();
        Key secretKey = jwtTokenizer.getSecretKeyFromPlainSecretKey();

        return jwtTokenizer.createAccessToken(claims, currentDate, accessTokenExpDate, subject, secretKey);
    }

    private String delegateGenerateRefreshToken(String memberName) {

        Date currentDate = jwtTokenizer.getCurrentDate();
        Date refreshTokenExpDate = jwtTokenizer.getRefreshTokenExpDate();
        String subject = memberName;
        Key secretKey = jwtTokenizer.getSecretKeyFromPlainSecretKey();

        return jwtTokenizer.createRefreshToken(currentDate, refreshTokenExpDate, subject, secretKey);
    }
}
