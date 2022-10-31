package com.preproject.server.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtil {

    private final List<String> USER_ROLE = List.of("USER");
    private final List<String> ADMIN_ROLE = List.of("USER","ADMIN");

    public List<String> getRole() {

        return USER_ROLE;
    }

    public List<GrantedAuthority> convertStringToGrantedAuthority(List<String> strRole) {

        return strRole.stream().map(str->new SimpleGrantedAuthority("ROLE_"+str)).collect(Collectors.toList());
    }
}
