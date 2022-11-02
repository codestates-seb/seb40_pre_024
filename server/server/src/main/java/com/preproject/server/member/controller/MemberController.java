package com.preproject.server.member.controller;


import com.preproject.server.answer.dto.AnswerPostDto;
import com.preproject.server.answer.entity.Answer;
import com.preproject.server.answer.mapper.AnswerMapper;
import com.preproject.server.member.dto.MemberDto;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.member.service.MemberService;

import com.preproject.server.response.MultiResponseDto;
import com.preproject.server.response.PageInfo;
import com.preproject.server.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;


@Validated
@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class MemberController {

    private final MemberMapper mapper;
    private final MemberService service;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post dto) {


        Member member = mapper.memberDtoPostToMember(dto);
        Member createdMember = service.createMember(member);
        MemberDto.Response response = mapper.memberToMemberDtoResponse(createdMember);
        SingleResponseDto<MemberDto.Response> singleResponseDto = new SingleResponseDto<>(response);

        return new ResponseEntity(singleResponseDto,HttpStatus.CREATED);
    }


//    @DeleteMapping("/{member-id}")
//    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") Long memberId) {
//
//        service.removeMember(memberId);
//        return new ResponseEntity(HttpStatus.NO_CONTENT);
//    }


    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@Positive @PathVariable("member-id") Long memberId) {

        Member findMember = service.findMember(memberId);
        MemberDto.Response response = mapper.memberToMemberDtoResponse(findMember);
        SingleResponseDto<MemberDto.Response> singleResponseDto = new SingleResponseDto<>(response);
        return new ResponseEntity(singleResponseDto, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logOut(HttpServletRequest request) {
        System.out.println("로그아웃");
        service.outMember(request);

        return new ResponseEntity(HttpStatus.OK);
    }



//    @PatchMapping("/{member-id}")
//    public ResponseEntity patchMember(@Positive @PathVariable("member-id") Long memberId,
//                                      @Valid @RequestBody MemberDto.Patch dto) {
//
//        Member member = mapper.memberDtoPatchToMember(dto);
//
//
//        //stub
////        Member stub = MemberStubData.stubList.get(0);
////        MemberDto.Response stubResponse = mapper.memberToMemberDtoResponse(stub);
////        SingleResponseDto<MemberDto.Response> response = new SingleResponseDto<>(stubResponse);
//
//
//        return new ResponseEntity(response, HttpStatus.OK);
//    }


    //테스트용의 전체 조회
    @GetMapping
    public ResponseEntity getMembers() {

        List<Member> members = service.findMembers();
        List<MemberDto.Response> responses = mapper.memberListToMemberDtoResponseList(members);
        MultiResponseDto<MemberDto.Response> multiResponseDto = new MultiResponseDto<>(responses, new PageInfo(0,0,0,0));
        return new ResponseEntity(multiResponseDto, HttpStatus.OK);
    }

}
