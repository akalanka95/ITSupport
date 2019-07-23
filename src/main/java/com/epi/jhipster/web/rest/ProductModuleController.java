package com.epi.jhipster.web.rest;

import com.epi.jhipster.domain.Module;
import com.epi.jhipster.domain.Product;
import com.epi.jhipster.domain.Product_Module;
import com.epi.jhipster.domain.User;
import com.epi.jhipster.repository.ModuleRepository;
import com.epi.jhipster.repository.ProductModuleRepository;
import com.epi.jhipster.repository.ProductRepository;
import com.epi.jhipster.repository.UserRepository;
import com.epi.jhipster.security.SecurityUtils;
import com.epi.jhipster.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class ProductModuleController {
    @Autowired
    private ProductModuleRepository productModuleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ModuleRepository moduleRepository;

    @RequestMapping("/test/getList")
    public List<Product_Module> findAll(){
        return (List<Product_Module>) productModuleRepository.findAll();
    }


    @RequestMapping("/test/getListOfProductsModulesByProductId/{id}")
    public List<Product_Module> findOne(@PathVariable("id") Long id){
        return  productModuleRepository.findByProductId(id);
    }

    @RequestMapping("/test/saveProductModule")
    public void save(@RequestBody Product_Module[] productModules) {
        System.out.println(productModules.toString());
        System.out.println("12222222222222222222222222222222222");
        Set<Product_Module> productModule12 = new HashSet<>();
        Product p1 = new Product();

        for (Product_Module productModule : productModules) {
            Module m1 = new Module();
            System.out.println("oieo099999999999999999999999999999999999999");
            System.out.println(productModule.getModule().getModuleName());
            p1.setProductName( productModule.getProduct().getProductName());
            p1.setType(productModule.getProduct().getType());
            m1.setModuleName( productModule.getModule().getModuleName());
            m1.setType(productModule.getModule().getType());
            productModule12.add(new Product_Module(p1, m1));
            moduleRepository.save(m1);
            productService.createProduct2(p1, productModule12);
        }

        productRepository.save(p1);
    }
}
