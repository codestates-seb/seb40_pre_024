package com.preproject.server.security.config;


import com.preproject.server.filter.JwtAuthenticationFilter;
import com.preproject.server.filter.JwtVerificationFilter;
import com.preproject.server.jwt.JwtTokenizer;
import com.preproject.server.security.handler.CustomAuthenticationEntryPoint;
import com.preproject.server.security.handler.CustomAuthenticationFailureHandler;
import com.preproject.server.security.handler.CustomAuthenticationSuccesshandler;
import com.preproject.server.utils.CustomAuthorityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {


    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtil customAuthorityUtil;

    private final RedisTemplate redisTemplate;
    @Value("${client.url}")
    private String clientUrl;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {


        //필요 기능, H2를 위해 iframe 같은 태그에서 서버로 요청이 가능하도록 허용 O
        //폼로그인 비활성화 0
        //HttpBasic이라고 Header에 id, password 보내는 기능 비활성화 0
        //세션 비활성화 -------------- 기억 해내지 못함 0
        //csrf 비활성화 ... ------------- 이유는 알아봐야함 0

        //chain의 구성을 등로 (필터 등록 위해) 0
        //에러 발생시 핸들러                    // 우선 제외 *
        //권한에 맞지 않는 상황 발생시 핸들러      // 우선 제외 *
        //url에 대한 권한 설정
        //cors 설정 -------------- 기억 해내지 못함, O


        httpSecurity.headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .exceptionHandling()
//                .accessDeniedHandler() //권한에 맞지 않는 요청시 거부핸들러
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint()) //인증 처리시 예외처리 핸들러
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/api/members/**").hasAnyRole("USER") //멤버 정보
                        .antMatchers(HttpMethod.POST, "/api/members/logout").hasAnyRole("USER") //멤버 로그아웃

                        .antMatchers(HttpMethod.DELETE, "/api/questions/**").hasAnyRole("USER") //질문 삭제
                        .antMatchers(HttpMethod.PATCH, "/api/questions/**").hasAnyRole("USER") //질문 수정
                        .antMatchers(HttpMethod.POST, "/api/questions").hasAnyRole("USER") //질문 등록

                        .antMatchers(HttpMethod.DELETE,"/api/answer/**").hasAnyRole("USER") //답변 삭제
                        .antMatchers(HttpMethod.PATCH,"/api/answer/**").hasAnyRole("USER") //답변 수정
                        .antMatchers(HttpMethod.POST,"/api/answer").hasAnyRole("USER") //답변 등록

                        .anyRequest().permitAll() //임시로 모든 요청 허용
                );


        return httpSecurity.build();
    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);


            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);

            jwtAuthenticationFilter.setFilterProcessesUrl("/api/members/login");

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccesshandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());


            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, customAuthorityUtil, redisTemplate);


            builder.addFilter(jwtAuthenticationFilter)
                            .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);


        }
    }




    //cors 설정자 빈 등록
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(clientUrl));
        configuration.setAllowedMethods(Arrays.asList("GET","POST"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
