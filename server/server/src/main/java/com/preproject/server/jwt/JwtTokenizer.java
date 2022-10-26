package com.preproject.server.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.*;


public class JwtTokenizer {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access-token-exp}")
    private int accessTokenExp;

    @Value("${jwt.refresh-token-exp}")
    private int refreshTokenExp;



    /** 실질적으로 액세스 토큰을 만드는 메소드 **/
    public String createAccessToken(Map<String,Object> claims,
                                    Date issuedAt,
                                    Date expAt,
                                    String subject,
                                    Key secretKey
                                    ) {

        String accessKey = Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(issuedAt)
                .setExpiration(expAt)
                .signWith(secretKey)
                .compact();

        return accessKey;
    }


    /** 실질적으로 리프레쉬 토큰을 만드는 메소드 **/
    public String createRefreshToken(Date issuedAt,
                                     Date expAt,
                                     String subject,
                                     Key secretKey) {

        String accessKey = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(issuedAt)
                .setExpiration(expAt)
                .signWith(secretKey)
                .compact();

        return accessKey;
    }


    public Date getAccessTokenExpDate() {

        Calendar currentCalendar = Calendar.getInstance();
        currentCalendar.add(Calendar.MINUTE, accessTokenExp);
        return currentCalendar.getTime();
    }

    public Date getRefreshTokenExpDate() {

        Calendar currentCalendar = Calendar.getInstance();
        currentCalendar.add(Calendar.MINUTE, refreshTokenExp);
        return currentCalendar.getTime();
    }

    /** 단순히 현재 시간을 Date 형태로 얻어오는 메소드 **/
    public Date getCurrentDate() {

        Calendar currentCalendar = Calendar.getInstance();
        return currentCalendar.getTime();
    }



    public Key getSecretKeyFromPlainSecretKey() {

        byte[] bytes = this.secretKey.getBytes();
        SecretKey secretKey = Keys.hmacShaKeyFor(bytes);
        return secretKey;

    }




}
