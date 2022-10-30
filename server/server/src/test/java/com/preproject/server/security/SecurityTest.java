//package com.preproject.server.security;
//
//
//
//import com.google.gson.Gson;
//import com.preproject.server.filter.JwtAuthenticationFilter;
//import com.preproject.server.jwt.JwtTokenizer;
//import com.preproject.server.member.dto.MemberDto;
//import com.preproject.server.member.entity.Member;
//import com.preproject.server.member.repository.MemberRepository;
//import com.preproject.server.member.service.MemberService;
//import com.preproject.server.security.dto.LoginDto;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.ResultActions;
//
//import javax.transaction.Transactional;
//import java.util.ArrayList;
//import java.util.List;
//
//import static com.preproject.server.util.ApiDocumentUtils.getRequestPreProcessor;
//import static com.preproject.server.util.ApiDocumentUtils.getResponsePreProcessor;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//
//@Transactional
//@AutoConfigureRestDocs
//@AutoConfigureMockMvc
//@SpringBootTest
//public class SecurityTest {
//
//    @Autowired
//    MockMvc mockMvc;
//
//    String baseUrl = "/api/members";
//
//    MediaType mediaType = MediaType.APPLICATION_JSON;
//
//    @Autowired
//    Gson gson;
//
//    @MockBean
//    AuthenticationManager authenticationManager;
//
//
//
//    @Autowired
//    MemberService memberService;
//
//
//    @Test
//    void login_success() throws Exception {
//
//
//
//
//        //given
//        String username = "januaryKim@gmail.com";
//        String password = "12341234";
//        Member member = Member.builder().memberName("januaryKim").memberEmail(username)
//                        .memberPwd(password).build();
//        memberService.createMember(member);
//
//
//
//
////        String username = "jake";
////        String password = "12341234";
////        List<GrantedAuthority> grantedAuthorityList = new ArrayList<>();
////        grantedAuthorityList.add(new SimpleGrantedAuthority("ROLE_USER"));
//        LoginDto loginDto = new LoginDto();
//        loginDto.setUsername(username);
//        loginDto.setPassword(password);
//        String content = gson.toJson(loginDto);
////
////        Authentication authentication = new UsernamePasswordAuthenticationToken("jake",password,grantedAuthorityList);
////        given(authenticationManager.authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class))).willReturn(authentication);
//
//
//
//
//
//        //when
//        ResultActions actions = mockMvc.perform(post(baseUrl + "/login").contentType(mediaType).accept(mediaType).content(content));
//
//
//        //then
//        MvcResult result = actions.andExpect(status().isOk())
//                .andDo(document("login-member",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("username").type(JsonFieldType.STRING).description("이메일"),
//                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
//                                )
//                        )
//                )).andReturn();
//
//
//
//
//        System.out.println(result.getResponse().getContentAsString());
//    }
//
//
//
//
//
//
////    @Test
////    void realTest() throws Exception {
////        //given
////        MemberDto.Post post = MemberDto.Post.builder().memberEmail("wot00@naver.com").memberName("wotkk")
////                .memberPwd("12341234").build();
////
////        MemberDto.Response response = MemberDto.Response.builder().memberId(1L)
////                .memberEmail("wot00@naver.com").memberName("wotkk")
////                .roles(List.of("USER"))
////                .build();
////
////        given(jwtTokenizer.getAccessTokenExpirationMinutes()).willReturn(18181818);
////
////
////
////        String content = gson.toJson(post);
////        System.out.println(content);
////        //when
////
////        ResultActions perform = mockMvc.perform(post(baseUrl)
////                .accept(mediaType)
////                .contentType(mediaType)
////                .content(content)
////        );
////
////        MvcResult mvcResult = perform.andReturn();
////        System.out.println("mvcResult.getRequest().getContentAsString() "+mvcResult.getRequest().getContentAsString());
////        System.out.println();
////        System.out.println("mvcResult.getResponse().getContentAsString() "+mvcResult.getResponse().getContentAsString());
////
////
////        //then
////
////        MvcResult result = perform.andExpect(status().isCreated())
////                .andExpect(jsonPath("$.data.memberId").value(response.getMemberId()))
////                .andExpect(jsonPath("$.data.memberEmail").value(post.getMemberEmail()))
////                .andExpect(jsonPath("$.data.memberName").value(post.getMemberName()))
////                .andExpect(jsonPath("$.data.roles").isArray())
////                .andReturn();
////    }
//}
