package com.epi.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table( name = "Company_product_module")
public class Company_Product_Module {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "company_id")
//    private Company company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_module_id")
    private Product_Module productModule;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    private String brand;
    private String model;
    private String serialNo;
    private String modelNo;
    private String description;
    private String version;


    @JsonIgnore
    @OneToMany(mappedBy = "companyProductModule", cascade = CascadeType.ALL)
    private Set<CompanyProductDetails> companyProductDetails = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "companyProductModule", cascade = CascadeType.ALL)
    private Set<UserProductDetails> userProductDetails = new HashSet<>();

    public Set<CompanyProductDetails> getCompanyProductDetails() {
        return companyProductDetails;
    }


    public Set<UserProductDetails> getUserProductDetails() {
        return userProductDetails;
    }

    public void setUserProductDetails(Set<UserProductDetails> userProductDetails) {
        this.userProductDetails = userProductDetails;
    }

    public void setCompanyProductDetails(Set<CompanyProductDetails> companyProductDetails) {
        this.companyProductDetails = companyProductDetails;
    }

    public Company_Product_Module() {
    }

    public Company_Product_Module(Company company, Product_Module product_module) {
        //this.company = company;
        this.productModule = product_module;
    }


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

//    public Company getCompany() {
//        return company;
//    }
//
//    public void setCompany(Company company) {
//        this.company = company;
//    }

    public Product_Module getProduct_module() {
        return productModule;
    }

    public void setProduct_module(Product_Module product_module) {
        this.productModule = product_module;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getSerialNo() {
        return serialNo;
    }

    public void setSerialNo(String serialNo) {
        this.serialNo = serialNo;
    }

    public String getModelNo() {
        return modelNo;
    }

    public void setModelNo(String modelNo) {
        this.modelNo = modelNo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
