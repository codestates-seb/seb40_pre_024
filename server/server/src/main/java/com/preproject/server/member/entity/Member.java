package com.preproject.server.member.entity;

import com.preproject.server.auditable.Auditable;
import com.preproject.server.member.enums.MemberStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Member extends Auditable implements UserDetails {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long memberId;

    @Column(nullable = false)
    private String memberPwd;

    @Column(nullable = false)
    private String memberEmail;

    @Column(nullable = false)
    private String memberName;

//    @Column(nullable = false, length = 10)
//    @Enumerated(EnumType.STRING)
//    private MemberStatus memberStatus = MemberStatus.ACTIVE;

    private String memberImageUrl;


    //Fetch 전략을 EAGER로 하지 않으면 LAZY 전략이 디폴트이므로,
    //getAuthorities() 메소드가 트랜잭션이 종료된 시점이라 영속성 컨텍스트가 존재하지 않아서 데이터를 가져오지 못하고 에러
    @ElementCollection(fetch = FetchType.EAGER)
    List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = this.getRoles().stream().map(strAuth -> new SimpleGrantedAuthority("ROLE_" + strAuth)).collect(Collectors.toList());
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.getMemberPwd();
    }

    @Override
    public String getUsername() {
        return this.getMemberEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
