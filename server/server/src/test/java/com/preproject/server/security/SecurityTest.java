package com.preproject.server.security;

import com.google.gson.Gson;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.service.MemberService;
import com.preproject.server.security.dto.LoginDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import javax.transaction.Transactional;
import java.util.List;
import static com.preproject.server.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.preproject.server.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Transactional
@AutoConfigureRestDocs
@AutoConfigureMockMvc
@SpringBootTest
public class SecurityTest {

    @Autowired
    MockMvc mockMvc;

    String baseUrl = "/api/members";

    MediaType mediaType = MediaType.APPLICATION_JSON;

    @Autowired
    Gson gson;

    @MockBean
    AuthenticationManager authenticationManager;

    @Autowired
    MemberService memberService;

    @Test
    void login_success() throws Exception {

        //given
        String username = "januaryKim@gmail.com";
        String password = "12341234";
        Member member = Member.builder().memberName("januaryKim").memberEmail(username)
                        .memberPwd(password).build();
        memberService.createMember(member);

        LoginDto loginDto = new LoginDto();
        loginDto.setUsername(username);
        loginDto.setPassword(password);
        String content = gson.toJson(loginDto);


        //when
        ResultActions actions = mockMvc.perform(post(baseUrl + "/login").contentType(mediaType).accept(mediaType).content(content));


        //then
        MvcResult result = actions.andExpect(status().isOk())
                .andDo(document("login-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
                                )
                        )
                )).andReturn();


        System.out.println(result.getResponse().getContentAsString());
    }

}
