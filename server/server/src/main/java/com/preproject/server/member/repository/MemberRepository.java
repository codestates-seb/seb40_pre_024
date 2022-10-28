package com.preproject.server.member.repository;

import com.preproject.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {

    @Query(value = "select m from Member m where m.memberEmail = :email or m.memberName = :name")
    Optional<Member> findMemberByMemberEmailOrMemberName(@Param("email") String email, @Param("name") String name);

    Optional<Member> findMemberByMemberEmail(String email);
}
