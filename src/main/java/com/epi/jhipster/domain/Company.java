package com.epi.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "company" )
public class Company {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String companyName;

    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private Set<User> user = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private Set<CompanyProductDetails> companyProductDetails = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private Set<PMProduct> pmProduct = new HashSet<>();



    public Set<CompanyProductDetails> getCompanyProductDetails() {
        return companyProductDetails;
    }

    public void setCompanyProductDetails(Set<CompanyProductDetails> companyProductDetails) {
        this.companyProductDetails = companyProductDetails;
    }

    public Set<User> getUser() {
        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Set<PMProduct> getPmProduct() {
        return pmProduct;
    }

    public void setPmProduct(Set<PMProduct> pmProduct) {
        this.pmProduct = pmProduct;
    }
}
