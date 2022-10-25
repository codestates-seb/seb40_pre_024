package com.preproject.server;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class HelloController {

    @GetMapping("/")
    public ResponseEntity hello() {

        log.info("=  Hello!  =");
        return new ResponseEntity("Hello!", HttpStatus.OK);
    }
}
