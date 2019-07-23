package com.epi.jhipster.service;

import com.epi.jhipster.domain.Product;
import com.epi.jhipster.domain.Product_Module;

import java.util.Set;

public interface ProductService {

    void createProduct(Product product, Set<Product_Module> productModule);
    void createProduct2(Product product, Set<Product_Module> productModule);

}
