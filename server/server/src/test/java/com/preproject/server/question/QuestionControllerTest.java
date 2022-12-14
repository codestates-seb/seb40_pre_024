package com.preproject.server.question;

import com.google.gson.Gson;
import com.preproject.server.answer.dto.AnswerResponseDto;
import com.preproject.server.answer.entity.Answer;
import com.preproject.server.answer.mapper.AnswerMapper;
import com.preproject.server.answer.service.AnswerService;
import com.preproject.server.member.dto.MemberDto;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.question.controller.QuestionController;
import com.preproject.server.question.dto.QuestionAnswerDto;
import com.preproject.server.question.dto.QuestionPatchDto;
import com.preproject.server.question.dto.QuestionPostDto;
import com.preproject.server.question.dto.QuestionResponseDto;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.mapper.QuestionMapper;
import com.preproject.server.question.service.QuestionService;
import com.preproject.server.response.MultiResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static com.preproject.server.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.preproject.server.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@MockBean(JpaMetamodelMappingContext.class)
@WebMvcTest(value = {QuestionController.class,AnswerMapper.class}, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
@AutoConfigureRestDocs
class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuestionService service;

    @MockBean
    private QuestionMapper mapper;

    @MockBean
    private MemberMapper memberMapper;

//    @MockBean
    @Autowired
    private AnswerMapper answerMapper;

    @MockBean
    private AnswerService answerService;

    @Autowired
    private Gson gson;


    @Test
    void postQuestion() throws Exception {

        //given
        QuestionPostDto post = new QuestionPostDto();
        post.setQuestionTitle("???????????????5??????");
        post.setQuestionContent("???????????????15????????????????????????????????????");

        Long memberId = 1L;

        String content = gson.toJson(post);

        MemberDto.Response response = MemberDto.Response.builder().memberId(1L)
                .memberEmail("wot00@naver.com").memberName("wotkk")
                .roles(List.of("USER"))
                .build();

        QuestionResponseDto responseDto = new QuestionResponseDto();
        responseDto.setQuestionId(1L);
        responseDto.setQuestionTitle("???????????????5??????");
        responseDto.setQuestionContent("???????????????15????????????????????????????????????");
        responseDto.setQuestionViewed(0);
        responseDto.setMemberId(response.getMemberId());
        responseDto.setMemberName(response.getMemberName());
//        responseDto.setMemberResponseDto(response);
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setModifiedAt(LocalDateTime.now());

        given(mapper.questionPostDtoToQuestion(Mockito.any(QuestionPostDto.class), eq(null))).willReturn(new Question());

        given(service.createQuestion(Mockito.any(Question.class))).willReturn(new Question());

        given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class), eq(memberMapper))).willReturn(responseDto);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/api/questions")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.questionTitle").value(post.getQuestionTitle()))
                .andExpect(jsonPath("$.data.questionContent").value(post.getQuestionContent()))
                .andDo(document(
                        "post-question",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("questionTitle").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("questionContent").type(JsonFieldType.STRING).description("?????? ??????")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("?????? ?????????"),
                                        fieldWithPath("data.questionId").type(JsonFieldType.NUMBER).description("?????? ID"),
                                        fieldWithPath("data.questionTitle").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.questionContent").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.questionViewed").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.answerCount").type(JsonFieldType.NUMBER).description("?????? ??????"),

                                        //Member Response

                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("?????? ID"),
                                        fieldWithPath("data.memberName").type(JsonFieldType.STRING).description("?????? ?????????")

//                                        fieldWithPath("data.memberResponseDto").type(JsonFieldType.OBJECT).description("??????????????????"),
//                                        fieldWithPath("data.memberResponseDto.memberId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
//                                        fieldWithPath("data.memberResponseDto.memberEmail").type(JsonFieldType.STRING).description("?????? ?????????"),
//                                        fieldWithPath("data.memberResponseDto.memberName").type(JsonFieldType.STRING).description("?????? ?????????"),
//                                        fieldWithPath("data.memberResponseDto.roles").type(JsonFieldType.ARRAY).description("?????? ?????????")
                                )
                        )
                ));


    }

    @Test
    void patchQuestion() throws Exception {

        //given

        Long questionId = 1L;


        QuestionPatchDto patch = new QuestionPatchDto();
        patch.setQuestionId(questionId);
        patch.setQuestionTitle("???????????????5??????");
        patch.setQuestionContent("???????????????15????????????????????????????????????");

        String content = gson.toJson(patch);

        MemberDto.Response response = MemberDto.Response.builder().memberId(1L)
                .memberEmail("wot00@naver.com").memberName("wotkk")
                .roles(List.of("USER"))
                .build();

        QuestionResponseDto responseDto = new QuestionResponseDto();
        responseDto.setQuestionId(1L);
        responseDto.setQuestionTitle("???????????????5??????");
        responseDto.setQuestionContent("???????????????15????????????????????????????????????");
        responseDto.setQuestionViewed(0);
        responseDto.setMemberId(response.getMemberId());
        responseDto.setMemberName(response.getMemberName());
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setModifiedAt(LocalDateTime.now());

        given(mapper.questionPatchDtoToQuestion(Mockito.any(QuestionPatchDto.class))).willReturn(new Question());

        given(service.updateQuestion(Mockito.any(Question.class), eq(null))).willReturn(new Question());

        given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class), eq(memberMapper))).willReturn(responseDto);

        //when
        ResultActions actions =
                mockMvc.perform(
                        patch("/api/questions/{question-id}", questionId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.questionId").value(patch.getQuestionId()))
                .andExpect(jsonPath("$.data.questionTitle").value(patch.getQuestionTitle()))
                .andExpect(jsonPath("$.data.questionContent").value(patch.getQuestionContent()))
                .andDo(document(
                        "patch-question",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(

                                List.of(
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("?????? ID"),
                                        fieldWithPath("questionTitle").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("questionContent").type(JsonFieldType.STRING).description("?????? ??????")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("?????? ?????????"),
                                        fieldWithPath("data.questionId").type(JsonFieldType.NUMBER).description("?????? ID"),
                                        fieldWithPath("data.questionTitle").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.questionContent").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.questionViewed").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.answerCount").type(JsonFieldType.NUMBER).description("?????? ??????"),

                                        //Member Response

                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("?????? ID"),
                                        fieldWithPath("data.memberName").type(JsonFieldType.STRING).description("?????? ?????????")

//                                        fieldWithPath("data.memberResponseDto").type(JsonFieldType.OBJECT).description("??????????????????"),
//                                        fieldWithPath("data.memberResponseDto.memberId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
//                                        fieldWithPath("data.memberResponseDto.memberEmail").type(JsonFieldType.STRING).description("?????? ?????????"),
//                                        fieldWithPath("data.memberResponseDto.memberName").type(JsonFieldType.STRING).description("?????? ?????????"),
//                                        fieldWithPath("data.memberResponseDto.roles").type(JsonFieldType.ARRAY).description("?????? ?????????")
                                )
                        )
                ));


    }

    @Test
    void getQuestion() throws Exception {

        //given

        Long questionId = 1L;

        MemberDto.Response response = MemberDto.Response.builder().memberId(1L)
                .memberEmail("wot00@naver.com").memberName("wotkk")
                .roles(List.of("USER"))
                .build();

        Member member = Member.builder().memberId(response.getMemberId()).memberEmail(response.getMemberEmail())
                .memberName(response.getMemberName()).roles(response.getRoles()).build();

        Answer answer1 = new Answer();
        answer1.setAnswerId(1L);
        answer1.setAnswerContent("????????????11111111111111111111");
        answer1.setCreatedAt(LocalDateTime.now());
        answer1.setModifiedAt(LocalDateTime.now());
        answer1.setMember(member);


        Answer answer2 = new Answer();
        answer2.setAnswerId(2L);
        answer2.setAnswerContent("????????????222222222222222222222");
        answer2.setCreatedAt(LocalDateTime.now());
        answer2.setModifiedAt(LocalDateTime.now());
        answer2.setMember(member);

        List<Answer> answerList = new ArrayList<>();
        answerList.add(answer1);
        answerList.add(answer2);

        Page<Answer> answerPage = new PageImpl<>(answerList);

        MultiResponseDto<AnswerResponseDto> multiResponseDto =
                new MultiResponseDto<>(answerMapper.answerToAnswerResponseDtos(answerList), answerPage);

        QuestionAnswerDto responseDto = new QuestionAnswerDto();
        responseDto.setQuestionId(questionId);
        responseDto.setQuestionTitle("???????????????5??????");
        responseDto.setQuestionContent("???????????????15????????????????????????????????????");
        responseDto.setQuestionViewed(0);
        responseDto.setAnswerResponseDto(multiResponseDto);
        responseDto.setMemberId(response.getMemberId());
        responseDto.setMemberName(response.getMemberName());
        responseDto.setCreatedAt(LocalDateTime.now());
        responseDto.setModifiedAt(LocalDateTime.now());
        responseDto.setAnswerCount(2);


        given(service.findQuestion(Mockito.anyLong())).willReturn(new Question());

        given(mapper.questionToQuestionAnswerDto(
                Mockito.any(Question.class), eq(memberMapper), eq(answerMapper), Mockito.anyInt()))
                .willReturn(responseDto);

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/api/questions/{question-id}", questionId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.questionId").value(responseDto.getQuestionId()))
                .andExpect(jsonPath("$.data.questionTitle").value(responseDto.getQuestionTitle()))
                .andExpect(jsonPath("$.data.questionContent").value(responseDto.getQuestionContent()))
                .andDo(document(
                        "get-question",
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("question-id").description("?????? ID")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("?????? ?????????"),
                                        fieldWithPath("data.questionId").type(JsonFieldType.NUMBER).description("?????? ID"),
                                        fieldWithPath("data.questionTitle").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.questionContent").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.questionViewed").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.answerCount").type(JsonFieldType.NUMBER).description("?????? ??????"),

                                        //Answer Response

                                        fieldWithPath("data.answerResponseDto").type(JsonFieldType.OBJECT).description("??????????????????"),
                                        fieldWithPath("data.answerResponseDto.data[]").type(JsonFieldType.ARRAY).description("?????? ?????? ?????????"),
                                        fieldWithPath("data.answerResponseDto.data[].answerId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("data.answerResponseDto.data[].answerContent").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data.answerResponseDto.data[].createdAt").type(JsonFieldType.STRING).description("?????? ?????? ??????"),
                                        fieldWithPath("data.answerResponseDto.data[].modifiedAt").type(JsonFieldType.STRING).description("?????? ?????? ??????"),
                                        fieldWithPath("data.answerResponseDto.data[].memberId").type(JsonFieldType.NUMBER).description("?????? ?????? ?????? ID"),
                                        fieldWithPath("data.answerResponseDto.data[].memberName").type(JsonFieldType.STRING).description("?????? ?????? ?????? ?????????"),
//                                        fieldWithPath("data.answerResponseDto.data[].memberResponseDto").type(JsonFieldType.OBJECT).description("?????? ?????? ????????????"),
//                                        fieldWithPath("data.answerResponseDto.data[].memberResponseDto.memberId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
//                                        fieldWithPath("data.answerResponseDto.data[].memberResponseDto.memberEmail").type(JsonFieldType.STRING).description("?????? ?????????"),
//                                        fieldWithPath("data.answerResponseDto.data[].memberResponseDto.memberName").type(JsonFieldType.STRING).description("?????? ?????????"),
//                                        fieldWithPath("data.answerResponseDto.data[].memberResponseDto.roles").type(JsonFieldType.ARRAY).description("?????? ?????????"),

                                        fieldWithPath("data.answerResponseDto.pageInfo.page").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("data.answerResponseDto.pageInfo.size").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("data.answerResponseDto.pageInfo.totalElements").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("data.answerResponseDto.pageInfo.totalPages").type(JsonFieldType.NUMBER).description("????????????"),

                                        //Member Response

                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("?????? ID"),
                                        fieldWithPath("data.memberName").type(JsonFieldType.STRING).description("?????? ?????????")


//                                        fieldWithPath("data.memberResponseDto").type(JsonFieldType.OBJECT).description("??????????????????"),
//                                        fieldWithPath("data.memberResponseDto.memberId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
//                                        fieldWithPath("data.memberResponseDto.memberEmail").type(JsonFieldType.STRING).description("?????? ?????????"),
//                                        fieldWithPath("data.memberResponseDto.memberName").type(JsonFieldType.STRING).description("?????? ?????????"),
//                                        fieldWithPath("data.memberResponseDto.roles").type(JsonFieldType.ARRAY).description("?????? ?????????")
                                )
                        )
                ));



    }

    @Test
    void getQuestions() throws Exception {

        //given

        int page = 1;
        int size = 15;

        Question question1 = new Question();
        question1.setQuestionId(1L);
        question1.setQuestionTitle("?????????????????????");
        question1.setQuestionContent("?????????????????????111111111111111111");
        question1.setQuestionViewed(0);
        question1.setMember(null);
        question1.setAnswer(null);

        Question question2 = new Question();
        question2.setQuestionId(2L);
        question2.setQuestionTitle("?????????????????????2");
        question2.setQuestionContent("?????????????????????222222222222222222");
        question2.setQuestionViewed(0);
        question2.setMember(null);
        question2.setAnswer(null);

        List<Question> questions = new ArrayList<>();
        questions.add(question1);
        questions.add(question2);

        MemberDto.Response response = MemberDto.Response.builder().memberId(1L)
                .memberEmail("wot00@naver.com").memberName("wotkk")
                .roles(List.of("USER"))
                .build();

        Page<Question> pagequestion = new PageImpl<>(questions);

        QuestionResponseDto responseDto1 = new QuestionResponseDto();
        responseDto1.setQuestionId(1L);
        responseDto1.setQuestionTitle("?????????????????????");
        responseDto1.setQuestionContent("?????????????????????111111111111111111");
        responseDto1.setQuestionViewed(0);
        responseDto1.setMemberId(response.getMemberId());
        responseDto1.setMemberName(response.getMemberName());
        responseDto1.setCreatedAt(LocalDateTime.now());
        responseDto1.setModifiedAt(LocalDateTime.now());
        responseDto1.setAnswerCount(0);

        QuestionResponseDto responseDto2 = new QuestionResponseDto();
        responseDto2.setQuestionId(2L);
        responseDto2.setQuestionTitle("?????????????????????2");
        responseDto2.setQuestionContent("?????????????????????222222222222222222");
        responseDto2.setQuestionViewed(0);
        responseDto2.setMemberId(response.getMemberId());
        responseDto2.setMemberName(response.getMemberName());
        responseDto2.setCreatedAt(LocalDateTime.now());
        responseDto2.setModifiedAt(LocalDateTime.now());
        responseDto2.setAnswerCount(0);



        List<QuestionResponseDto> responseDto = List.of(
                responseDto1, responseDto2
        );

        given(service.findQuestions(Mockito.anyInt(), Mockito.anyInt())).willReturn(pagequestion);

        given(mapper.questionsToQuestionResponseDtoList(Mockito.any(List.class), eq(memberMapper))).willReturn(responseDto);

        //when

        ResultActions actions =
                mockMvc.perform(
                        get("/api/questions?page=1&size=15")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );

        //then

        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "get-questions",
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("page").description("?????????"),
                                parameterWithName("size").description("?????????")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("?????? ?????????"),
                                        fieldWithPath("data[].questionId").type(JsonFieldType.NUMBER).description("?????? ID"),
                                        fieldWithPath("data[].questionTitle").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data[].questionContent").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data[].questionViewed").type(JsonFieldType.NUMBER).description("?????????"),
//                                        fieldWithPath("data[].memberResponseDto").type(JsonFieldType.OBJECT).description("??????????????????"),
//                                        fieldWithPath("data[].memberResponseDto.memberId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
//                                        fieldWithPath("data[].memberResponseDto.memberEmail").type(JsonFieldType.STRING).description("?????? ?????????"),
//                                        fieldWithPath("data[].memberResponseDto.memberName").type(JsonFieldType.STRING).description("?????? ?????????"),
//                                        fieldWithPath("data[].memberResponseDto.roles").type(JsonFieldType.ARRAY).description("?????? ?????????"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data[].answerCount").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("????????????"),

                                        //member

                                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("data[].memberName").type(JsonFieldType.STRING).description("?????? ?????????")
                                )
                        )
                ));

    }

    @Test
    void deleteQuestion() throws Exception {

        postQuestion();

        Long questionId = 1L;

        doNothing().when(service).deleteQuestion(Mockito.anyLong(), eq(null));

        ResultActions actions = mockMvc.perform(
                delete("/api/questions/{question-id}", questionId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "delete-question",
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("question-id").description("?????? ID")
                        )));
    }
}