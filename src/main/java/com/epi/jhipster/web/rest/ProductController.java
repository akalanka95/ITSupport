package com.epi.jhipster.web.rest;


import com.epi.jhipster.domain.Product;
import com.epi.jhipster.domain.Product_Module;
import com.epi.jhipster.repository.ProductModuleRepository;
import com.epi.jhipster.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @RequestMapping("/test/getListOfProducts")
    public List<Product> findAll(){
        return  productRepository.findAll();
    }

    @RequestMapping("/test/saveProduct")
    public Product save(@RequestBody Product product){
        return productRepository.save(product);
    }

    @RequestMapping("/test/getListOfProductsByNameAndType/{name}/{type}")
    public Product findByNameAndType(@PathVariable("name") String name,@PathVariable("type") String type){
        return  productRepository.findByProductNameAndType(name,type);
    }

    @RequestMapping("/test/getProductByProductId/{id}")
    public Product findProductById(@PathVariable("id") Long id){
        return  productRepository.findById(id).get();
    }

}
