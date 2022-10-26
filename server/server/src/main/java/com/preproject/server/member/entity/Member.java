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
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

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

    @ElementCollection
    List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.getRoles().stream().map(strAuth -> new SimpleGrantedAuthority("ROLE_" + strAuth)).collect(Collectors.toList());
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
