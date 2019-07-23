package com.epi.jhipster.service;


import com.epi.jhipster.domain.Product;
import com.epi.jhipster.domain.Product_Module;
import com.epi.jhipster.repository.ModuleRepository;
import com.epi.jhipster.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;

@Service("productService")
public class ProductServiceImp implements ProductService {

    @Autowired
    private ModuleRepository moduleRepository;
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    @Override
    public void createProduct(Product product, Set<Product_Module> productModule) {
        for (Product_Module pm : productModule) {
            moduleRepository.save(pm.getModule());
        }

        product.getProductModules().addAll(productModule);

        productRepository.save(product);
    }
    @Transactional
    @Override
    public void createProduct2(Product product, Set<Product_Module> productModule) {

        product.getProductModules().addAll(productModule);

    }
}
