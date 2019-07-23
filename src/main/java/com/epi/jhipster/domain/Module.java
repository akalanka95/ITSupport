package com.epi.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "module")
public class Module implements Serializable {
    private static final long serialVersionUID = 1778L;
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String moduleName;
    private String type;


//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {
//                    CascadeType.PERSIST,
//                    CascadeType.MERGE
//            },
//            mappedBy = "modules")
//    private Set<Product> products = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    private Set<Product_Module> productModules = new HashSet<>();


//    public Module(String moduleName, String type, Set<Product_Module> productModules) {
//        this.moduleName = moduleName;
//        this.type = type;
//        this.productModules = productModules;
//    }

    public Set<Product_Module> getProductModules() {
        return productModules;
    }

    public void setProductModules(Set<Product_Module> productModules) {
        this.productModules = productModules;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
