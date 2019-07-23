package com.epi.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "product_module")
public class Product_Module implements Serializable {

    private static final long serialVersionUID = 890345L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER )
    private Module module;

    @JsonIgnore
    @OneToMany(mappedBy = "productModule", cascade = CascadeType.ALL)
    private Set<Company_Product_Module> company_product_modules = new HashSet<>();

    public Product_Module() {
    }

    public Set<Company_Product_Module> getCompany_product_modules() {
        return company_product_modules;
    }

    public void setCompany_product_modules(Set<Company_Product_Module> company_product_modules) {
        this.company_product_modules = company_product_modules;
    }

    public Product_Module(Product product, Module module) {
        this.product = product;
        this.module = module;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }
}
