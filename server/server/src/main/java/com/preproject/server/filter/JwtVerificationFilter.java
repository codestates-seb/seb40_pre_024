package com.preproject.server.filter;

import com.preproject.server.exception.AuthException;
import com.preproject.server.exception.BusinessException;
import com.preproject.server.exception.ExceptionCode;
import com.preproject.server.jwt.JwtTokenizer;
import com.preproject.server.member.wrapper.WrapperUserNamePasswordAuthenticationToken;
import com.preproject.server.utils.CustomAuthorityUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/** 토큰 검증 필터 **/
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    //-- 필요 작업
    //토큰이 유효한지
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtil customAuthorityUtil;
    private final RedisTemplate redisTemplate;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        try {
            String header = request.getHeader("Authorization");
            String jws = header.replace("bearer", "");

            //토큰 검증
            Map<String, Object> claims = jwtTokenizer.verifyJws(jws); //검증 부분, 파싱할때 Long이였던 memberId가 자동으로 Integer로 파싱됨..

            //로그아웃 토큰 여부 확인, 정상적인 토큰일 경우만 로그아웃 여부 확인
            verifyLoginToken(jws);

            setSecurityContext(claims);

            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {

            throw new AuthException(ExceptionCode.EXPIRED_TOKEN, e.getMessage());

        } catch (SignatureException e) {

            throw new AuthException(ExceptionCode.INVALID_SIGNATURE_TOKEN, e.getMessage());

        } catch (RuntimeException e) {

            throw new AuthException(ExceptionCode.INVALID_TOKEN, e.getMessage());
        }

    }

    private void verifyLoginToken(String jws) {

        ValueOperations valueOperations = redisTemplate.opsForValue();
        String key = "logout_" + jws;
        String username = (String)valueOperations.get(key);

        if(username != null)
            throw new BusinessException(ExceptionCode.ALREADY_LOGOUT_MEMBER);
    }


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        if (request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("bearer")) {
            return true;
        }

        return false;
    }



    private void setSecurityContext(Map<String, Object> claims) {

        long memberId = (Integer)claims.get("memberId");
        String username = claims.get("username").toString();
        List<String> roles = (List)claims.get("roles");


        List<GrantedAuthority> grantedAuthorities = customAuthorityUtil.convertStringToGrantedAuthority(roles);

        SecurityContext sc = SecurityContextHolder.getContext();

        WrapperUserNamePasswordAuthenticationToken wrapperUserNamePasswordAuthenticationToken = new WrapperUserNamePasswordAuthenticationToken(username, null, grantedAuthorities, memberId);

        sc.setAuthentication(wrapperUserNamePasswordAuthenticationToken);

//        원래코드
//        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
//                new UsernamePasswordAuthenticationToken(username, null,grantedAuthorities);
//        sc.setAuthentication(usernamePasswordAuthenticationToken);
    }


}
