package com.preproject.server.member.stub;

import com.preproject.server.member.entity.Member;

import java.util.ArrayList;
import java.util.List;

public class MemberStubData {

    public static List<Member> stubList = new ArrayList<>();

    static{

        for (long i = 0; i < 20; i++) {
            Member member = new Member();
            member.setMemberId(i+1);
            member.setMemberEmail(i+"member@gmail.com");
            member.setMemberName(i+"님");
            member.setMemberPwd("1234");
            stubList.add(member);
        }

    }



}
