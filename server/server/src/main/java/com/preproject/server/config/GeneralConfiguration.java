package com.preproject.server.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/** 특정 도메인이 아닌 일반적으로 쓰이는 객체들을 빈으로 등록하는 Configuration **/
@Configuration
public class GeneralConfiguration {

    @Bean
    Gson gson() {
        //Gson을 아래와 같이 세팅하고 생성하면
        //변환하는 객체의 필드값이 null이여도 파싱함.
        //반면에 아래와 같이 세팅하지 않으면, 객체의 필드값이 null이면 해당 필드 자체를 변환하지 않아서
        //변환된 json 데이터에 값이 null인 필드가 존재하지 않음
        return new GsonBuilder().setPrettyPrinting().serializeNulls().create();
    }
}
