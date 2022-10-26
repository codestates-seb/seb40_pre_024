package com.preproject.server.filter;

import com.preproject.server.jwt.JwtTokenizer;
import com.preproject.server.utils.CustomAuthorityUtil;
import lombok.RequiredArgsConstructor;
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
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    //-- 필요 작업
    //토큰이 유효한지
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtil customAuthorityUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String jws = header.replace("bearer", "");

        Map<String, Object> claims = jwtTokenizer.verifyJws(jws); //검증 부분

        setSecurityContext(claims);

        filterChain.doFilter(request,response);
    }



    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        if (request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("bearer")) {
            return true;
        }

        return false;
    }

    private void setSecurityContext(Map<String, Object> claims) {

        String username = claims.get("username").toString();
        List<String> roles = (List)claims.get("roles");
        List<GrantedAuthority> grantedAuthorities = customAuthorityUtil.convertStringToGrantedAuthority(roles);

        SecurityContext sc = SecurityContextHolder.getContext();
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(username, null,grantedAuthorities);
        sc.setAuthentication(usernamePasswordAuthenticationToken);
    }
}
