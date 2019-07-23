package com.epi.jhipster.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "UserProductDetailsRepository")
public class UserProductDetails {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.MERGE)
    private Company_Product_Module companyProductModule;

//    @OneToMany(mappedBy = "userProductDetails", cascade = CascadeType.ALL)
//    private Set<UserProductDetails> userProductDetails = new HashSet<>();
//
//    public Set<UserProductDetails> getUserProductDetails() {
//        return userProductDetails;
//    }
//
//    public void setUserProductDetails(Set<UserProductDetails> userProductDetails) {
//        this.userProductDetails = userProductDetails;
//    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public Company_Product_Module getCompanyProductModule() {
        return companyProductModule;
    }

    public void setCompanyProductModule(Company_Product_Module companyProductModule) {
        this.companyProductModule = companyProductModule;
    }
}
