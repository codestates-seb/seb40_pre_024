package com.preproject.server.member.controller;

import com.preproject.server.member.dto.MemberDto;
import com.preproject.server.member.entity.Member;
import com.preproject.server.member.mapper.MemberMapper;
import com.preproject.server.member.service.MemberService;
import com.preproject.server.member.stub.MemberStubData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@Validated
@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberMapper mapper;
    private final MemberService service;




    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post dto) {

        Member member = mapper.memberDtoPostToMember(dto);

        //stub
        Member stub = MemberStubData.stubList.get(0);
        MemberDto.Response stubResponse = mapper.memberToMemberDtoResponse(stub);

        return new ResponseEntity(stubResponse, HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@Positive @PathVariable("member-id") Long memberId,
                                      @Valid @RequestBody MemberDto.Patch dto) {

        Member member = mapper.memberDtoPatchToMember(dto);


        //stub
        Member stub = MemberStubData.stubList.get(0);
        MemberDto.Response stubResponse = mapper.memberToMemberDtoResponse(stub);


        return new ResponseEntity(stubResponse, HttpStatus.OK);
    }


    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@Positive @PathVariable("member-id") Long memberId) {

        //stub
        Member stub = MemberStubData.stubList.get(0);
        MemberDto.Response stubResponse = mapper.memberToMemberDtoResponse(stub);

        return new ResponseEntity(stubResponse, HttpStatus.OK);

    }

//    @GetMapping
//    public ResponseEntity getMembers(@Positive @RequestParam("size") Integer size,
//                                     @Positive @RequestParam("page") Integer page) {
//
//        //stub
//        List<Member> stub = new ArrayList<>();
//        for (int i = 0; i < size; i++) {
//            stub.add(MemberStubData.stubList.get(i));
//        }
//
//
//
//
//    }



}
