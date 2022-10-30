package com.preproject.server.security.config;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.preproject.server.filter.FilterChainExceptionHandlerFilter;
import com.preproject.server.filter.FilterExceptionResolver;
import com.preproject.server.filter.JwtAuthenticationFilter;
import com.preproject.server.filter.JwtVerificationFilter;
import com.preproject.server.jwt.JwtTokenizer;
import com.preproject.server.security.handler.CustomAccessDeniedHandler;
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
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity //등록 필터 로그로 확인 위해
@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {


    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtil customAuthorityUtil;

    private final RedisTemplate redisTemplate;
    @Value("${client.url}")
    private String clientUrl;

    private final Gson gson;

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
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .exceptionHandling()
                .accessDeniedHandler(new CustomAccessDeniedHandler()) //권한에 맞지 않는 요청시 거부핸들러, 인증은 됬지만 권한에 맞지 않는 리소스 요청시
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint()) //인증 처리시 예외처리 핸들러, 권한이 필요한 리소스에 대해 접근하는데 인증을 하지 않아 Anonnymous 인 유저일 경우 발생 처리
                .and()
                .authorizeHttpRequests(authorize -> authorize
                                .antMatchers(HttpMethod.PATCH,"/api/questions/*").hasRole("USER")
                                .antMatchers(HttpMethod.DELETE,"/api/questions/*").hasRole("USER")
                                .antMatchers(HttpMethod.POST,"/api/questions").hasRole("USER")  // POST이면서 /api/questions/로 시작하는 것은 USER 권한
                                .antMatchers(HttpMethod.GET,"/api/questions/**").permitAll() // GET이면서 /api/questions/로 시작하는 것은 모두 허용

                                .antMatchers(HttpMethod.GET,"/api/members/**").hasRole("USER")
                                .antMatchers(HttpMethod.POST,"/api/members/logout").hasRole("USER")
                                .antMatchers(HttpMethod.POST,"/api/members/").permitAll()

                                .antMatchers(HttpMethod.PATCH,"/api/answers/*").hasRole("USER")
                                .antMatchers(HttpMethod.DELETE,"/api/answers/*").hasRole("USER")
                                .antMatchers(HttpMethod.POST,"/api/answers").hasRole("USER")  // POST이면서 /api/questions/로 시작하는 것은 USER 권한
                                .antMatchers(HttpMethod.GET,"/api/answers/**").permitAll() // GET이면서 /api/questions/로 시작하는 것은 모두 허용

                );
        return httpSecurity.build();
    }




    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);


            //인증 처리 필터
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);

            jwtAuthenticationFilter.setFilterProcessesUrl("/api/members/login");

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccesshandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());


            //토큰 검증 필터
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, customAuthorityUtil, redisTemplate);


            //인증, 토큰 검증 필터 등록
            builder.addFilter(jwtAuthenticationFilter)
                            .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);

            //인증 관련 예외처리 필터 등록

            builder.addFilterBefore(new FilterChainExceptionHandlerFilter(new FilterExceptionResolver(gson)), LogoutFilter.class);

        }
    }





    //cors 설정자 빈 등록
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList(clientUrl));
//        configuration.setAllowedMethods(Arrays.asList("*"));

        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    //등록 필터 로그로 확인 위해
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.debug(true);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
