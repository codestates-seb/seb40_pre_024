package com.preproject.server.member.mapper;

import com.preproject.server.member.dto.MemberDto;
import com.preproject.server.member.entity.Member;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-10-25T18:54:54+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberDtoPostToMember(MemberDto.Post dto) {
        if ( dto == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( dto.getMemberId() );
        member.setMemberEmail( dto.getMemberEmail() );
        member.setMemberName( dto.getMemberName() );
        member.setMemberImageUrl( dto.getMemberImageUrl() );

        return member;
    }

    @Override
    public Member memberDtoPatchToMember(MemberDto.Patch dto) {
        if ( dto == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberName( dto.getMemberName() );

        return member;
    }

    @Override
    public MemberDto.Response memberToMemberDtoResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.Response response = new MemberDto.Response();

        response.setMemberId( member.getMemberId() );
        response.setMemberEmail( member.getMemberEmail() );
        response.setMemberName( member.getMemberName() );
        response.setMemberImageUrl( member.getMemberImageUrl() );

        return response;
    }

    @Override
    public List<MemberDto.Response> memberListToMemberDtoResponseList(List<Member> memberList) {
        if ( memberList == null ) {
            return null;
        }

        List<MemberDto.Response> list = new ArrayList<MemberDto.Response>( memberList.size() );
        for ( Member member : memberList ) {
            list.add( memberToMemberDtoResponse( member ) );
        }

        return list;
    }
}
