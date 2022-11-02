package com.preproject.server.answer;

import com.google.gson.Gson;
import com.preproject.server.answer.controller.AnswerController;
import com.preproject.server.answer.dto.AnswerPatchDto;
import com.preproject.server.answer.dto.AnswerPostDto;
import com.preproject.server.answer.dto.AnswerResponseDto;
import com.preproject.server.answer.entity.Answer;
import com.preproject.server.answer.mapper.AnswerMapper;
import com.preproject.server.answer.service.AnswerService;
import com.preproject.server.member.dto.MemberDto;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.question.entity.Question;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.List;
import static com.preproject.server.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.preproject.server.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@MockBean(JpaMetamodelMappingContext.class)
@WebMvcTest(value = AnswerController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
@AutoConfigureRestDocs
public class AnswerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private AnswerService service;

    @MockBean
    private AnswerMapper mapper;

    @MockBean
    private MemberMapper memberMapper;


    @Test
    void postAnswerTest() throws Exception {
        //given

        Question question = new Question();
        question.setQuestionId(1L);

        AnswerPostDto post = new AnswerPostDto();
        post.setAnswerContent("답변은5자리부터");
        post.setQuestionId(question.getQuestionId());

        Long memberId = 1L;

        String content = gson.toJson(post);


        MemberDto.Response response = MemberDto.Response.builder().memberId(1L)
                .memberEmail("abc@naver.com").memberName("abc")
                .roles(List.of("USER"))
                .build();


        AnswerResponseDto responseDto = new AnswerResponseDto();
        responseDto.setAnswerId(1L);
        responseDto.setAnswerContent("답변은5자리부터");
        responseDto.setMemberResponseDto(response);
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setModifiedAt(LocalDateTime.now());

        given(mapper.answerPostDtoToAnswer(Mockito.any(AnswerPostDto.class), eq(null))).willReturn(new Answer());

        given(service.createAnswer(Mockito.any(Answer.class))).willReturn(new Answer());

        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(responseDto);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/api/answers")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );
        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.answerContent").value(post.getAnswerContent()))
                .andDo(document(
                        "post-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 ID"),
                                        fieldWithPath("answerContent").type(JsonFieldType.STRING).description("답변 내용")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.answerId").type(JsonFieldType.NUMBER).description("답변 ID"),
                                        fieldWithPath("data.answerContent").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 시간"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정 시간"),
                                        fieldWithPath("data.memberResponseDto").type(JsonFieldType.OBJECT).description("멤버리스폰스"),
                                        fieldWithPath("data.memberResponseDto.memberId").type(JsonFieldType.NUMBER).description("멤버 아이디"),
                                        fieldWithPath("data.memberResponseDto.memberEmail").type(JsonFieldType.STRING).description("멤버 이메일"),
                                        fieldWithPath("data.memberResponseDto.memberName").type(JsonFieldType.STRING).description("멤버 닉네임"),
                                        fieldWithPath("data.memberResponseDto.roles").type(JsonFieldType.ARRAY).description("멤버 권한들")

                                )
                        )
                ));

    }

    @Test
    void patchAnswerTest() throws Exception {

        postAnswerTest();
        //given

        Long answerId = 1L;

        AnswerPatchDto patch = new AnswerPatchDto();
        patch.setAnswerId(answerId);
        patch.setAnswerContent("답변은5자리부터");

        String content = gson.toJson(patch);

        MemberDto.Response response = MemberDto.Response.builder().memberId(1L)
                .memberEmail("abc@naver.com").memberName("abc")
                .roles(List.of("USER"))
                .build();


        AnswerResponseDto responseDto = new AnswerResponseDto();
        responseDto.setAnswerId(1L);
        responseDto.setAnswerContent("답변은5자리부터");
        responseDto.setMemberResponseDto(response);
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setModifiedAt(LocalDateTime.now());

        given(mapper.answerPatchDtoToAnswer(Mockito.any(AnswerPatchDto.class))).willReturn(new Answer());

        given(service.updateAnswer(Mockito.any(Answer.class),eq(null))).willReturn(new Answer());

        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(responseDto);

        //when
        ResultActions actions =
                mockMvc.perform(
                        patch("/api/answers/{answer-id}", answerId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.answerId").value(patch.getAnswerId()))
                .andExpect(jsonPath("$.data.answerContent").value(patch.getAnswerContent()))
                .andDo(document(
                        "patch-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("answerId").type(JsonFieldType.NUMBER).description("답변 ID"),
                                        fieldWithPath("answerContent").type(JsonFieldType.STRING).description("답변 내용")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.answerId").type(JsonFieldType.NUMBER).description("답변 ID"),
                                        fieldWithPath("data.answerContent").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 시간"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정 시간"),
                                        fieldWithPath("data.memberResponseDto").type(JsonFieldType.OBJECT).description("멤버리스폰스"),
                                        fieldWithPath("data.memberResponseDto.memberId").type(JsonFieldType.NUMBER).description("멤버 아이디"),
                                        fieldWithPath("data.memberResponseDto.memberEmail").type(JsonFieldType.STRING).description("멤버 이메일"),
                                        fieldWithPath("data.memberResponseDto.memberName").type(JsonFieldType.STRING).description("멤버 닉네임"),
                                        fieldWithPath("data.memberResponseDto.roles").type(JsonFieldType.ARRAY).description("멤버 권한들")
                                )
                        )
                ));

    }

    @Test
    void getAnswerTest() throws Exception {

        //given

        Long answerId = 1L;

        MemberDto.Response response = MemberDto.Response.builder().memberId(1L)
                .memberEmail("abc@naver.com").memberName("abc")
                .roles(List.of("USER"))
                .build();


        AnswerResponseDto responseDto = new AnswerResponseDto();
        responseDto.setAnswerId(answerId);
        responseDto.setAnswerContent("답변은5자리부터");
        responseDto.setMemberResponseDto(response);
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setModifiedAt(LocalDateTime.now());


        given(service.findAnswer(Mockito.anyLong())).willReturn(new Answer());

        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(responseDto);


        //when

        ResultActions actions =
                mockMvc.perform(
                        get("/api/answers/{answer-id}", answerId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.answerId").value(responseDto.getAnswerId()))
                .andExpect(jsonPath("$.data.answerContent").value(responseDto.getAnswerContent()))
                .andDo(document(
                        "get-answer",
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 ID")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.answerId").type(JsonFieldType.NUMBER).description("답변 ID"),
                                        fieldWithPath("data.answerContent").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("답변 작성 시간"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간"),
                                        fieldWithPath("data.memberResponseDto").type(JsonFieldType.OBJECT).description("멤버리스폰스"),
                                        fieldWithPath("data.memberResponseDto.memberId").type(JsonFieldType.NUMBER).description("멤버 아이디"),
                                        fieldWithPath("data.memberResponseDto.memberEmail").type(JsonFieldType.STRING).description("멤버 이메일"),
                                        fieldWithPath("data.memberResponseDto.memberName").type(JsonFieldType.STRING).description("멤버 닉네임"),
                                        fieldWithPath("data.memberResponseDto.roles").type(JsonFieldType.ARRAY).description("멤버 권한들")
                                )
                        )
                ));
    }


    @Test
    void deleteAnswerTest() throws Exception {

        //given

        postAnswerTest();

        Long answerId = 1L;
        doNothing().when(service).deleteAnswer(Mockito.anyLong(), eq(null));

        //when
        ResultActions actions = mockMvc.perform(
                delete("/api/answers/{answer-id}", answerId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );
        //then

        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "delete-answer",
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 ID")
                        )));
    }
}
