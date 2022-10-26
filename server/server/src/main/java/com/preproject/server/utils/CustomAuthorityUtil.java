package com.preproject.server.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomAuthorityUtil {

    private final List<String> USER_ROLE = List.of("USER");

    public List<String> getRole() {

        return USER_ROLE;
    }
}
