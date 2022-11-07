package com.preproject.server.member.stub;

import com.preproject.server.member.entity.Member;
import org.springframework.http.HttpMethod;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemberStubData {

    public static List<Member> MEMBER_LIST = new ArrayList<>();



    static {



        for (long i = 0; i < 20; i++) {
            Member member = Member.builder().memberId(i+1).memberEmail((i+1) + "member@naver.com")
                    .memberName((i+1)+ "멤버")
                    .memberPwd("12341234")
                    .roles(List.of("USER")).build();

            MEMBER_LIST.add(member);
        }
    }


}
