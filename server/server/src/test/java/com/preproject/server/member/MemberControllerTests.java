package com.preproject.server.member;

import com.google.gson.Gson;
import com.preproject.server.member.controller.MemberController;
import com.preproject.server.member.dto.MemberDto;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.member.service.MemberService;
import com.preproject.server.member.stub.MemberStubData;
import com.preproject.server.question.controller.QuestionController;
import com.preproject.server.security.dto.LoginDto;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.persistence.ElementCollection;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static com.preproject.server.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.preproject.server.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



@TestInstance(TestInstance.Lifecycle.PER_CLASS) //beforeAll non-static 하려고
@MockBean(JpaMetamodelMappingContext.class) //Auditable 땜에
@WebMvcTest(value = MemberController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class}) //api 레벨 관련 빈, MockMvc 세팅
@AutoConfigureRestDocs //MockMvc에 RestDocs 관련 설정해줌
public class MemberControllerTests {




    @Autowired
    MockMvc mockMvc;

    @MockBean
    MemberService memberService;

    @MockBean
    MemberMapper memberMapper;

    @Autowired
    Gson gson;

    MediaType mediaType = MediaType.APPLICATION_JSON;

    String baseUrl = "/api/members";




    @Test
    void postMemberTest() throws Exception {

        //given
        MemberDto.Post post = MemberDto.Post.builder().memberEmail("wot00@naver.com").memberName("wotkk")
                .memberPwd("12341234").build();

        MemberDto.Response response = MemberDto.Response.builder().memberId(1L)
                .memberEmail("wot00@naver.com").memberName("wotkk")
                .roles(List.of("USER"))
                .build();


        given(memberMapper.memberDtoPostToMember(Mockito.any(MemberDto.Post.class))).willReturn(new Member());
        given(memberService.createMember(Mockito.any(Member.class))).willReturn(new Member());
        given(memberMapper.memberToMemberDtoResponse(Mockito.any(Member.class))).willReturn(response);


        String content = gson.toJson(post);
        System.out.println(content);
        //when

        ResultActions perform = mockMvc.perform(post(baseUrl)
                .accept(mediaType)
                .contentType(mediaType)
                .content(content)
        );

        MvcResult mvcResult = perform.andReturn();
        System.out.println("mvcResult.getRequest().getContentAsString() "+mvcResult.getRequest().getContentAsString());
        System.out.println();
        System.out.println("mvcResult.getResponse().getContentAsString() "+mvcResult.getResponse().getContentAsString());


        //then

        MvcResult result = perform.andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.memberId").value(response.getMemberId()))
                .andExpect(jsonPath("$.data.memberEmail").value(post.getMemberEmail()))
                .andExpect(jsonPath("$.data.memberName").value(post.getMemberName()))
                .andExpect(jsonPath("$.data.roles").isArray())

                .andDo(document("post-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("memberEmail").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("memberName").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("memberPwd").type(JsonFieldType.STRING).description("비밀번호")

                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("멤버 아이디"),
                                        fieldWithPath("data.memberEmail").type(JsonFieldType.STRING).description("멤버 이메일"),
                                        fieldWithPath("data.memberName").type(JsonFieldType.STRING).description("멤버 닉네임"),
                                        fieldWithPath("data.roles").type(JsonFieldType.ARRAY).description("멤버 권한들")
                                ))
                )).andReturn();
    }


    @Test
    void logoutMemberTest() throws Exception {

        //given
        MemberDto.Response response = MemberDto.Response.builder().memberId(1L)
                .memberEmail("wot00@naver.com").memberName("wotkk")
                .roles(List.of("USER"))
                .build();

        doNothing().when(memberService).outMember(Mockito.any(HttpServletRequest.class));

        //when

        ResultActions perform = mockMvc.perform(post(baseUrl+"/logout")
                .accept(mediaType)
                .contentType(mediaType)
                .header("Authorization","bearereyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiamFudWFyeUtpbUBnbWFpbC5jb20iLCJzdWIiOiJqYW51YXJ5S2ltIiwiaWF0IjoxNjY2ODk1MDA3LCJleHAiOjE2NjY5MDIyMDd9.bGlUaOILszD1KZDJkIfHxIa1LR-Y9dm0HPv_fXn7id0")
        );

        //then

        MvcResult result = perform.andExpect(status().isOk())
                .andDo(document("logout-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor()
                )).andReturn();


        System.out.println(result.getResponse().getContentAsString());
    }


}
