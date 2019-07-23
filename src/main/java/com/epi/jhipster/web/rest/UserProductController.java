package com.epi.jhipster.web.rest;


import com.epi.jhipster.domain.UserProduct;
import com.epi.jhipster.domain.UserProductDetails;
import com.epi.jhipster.repository.UserProductDetailsRepository;
import com.epi.jhipster.repository.UserProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserProductController {
    @Autowired
    private UserProductRepository userProductRepository;

    @RequestMapping("/test/saveUserAssignProduct")
    public UserProduct save(@RequestBody UserProduct userProduct){
        return userProductRepository.save(userProduct);
    }

    @RequestMapping("/test/getListOfUserProductsById/{id}")
    public List<UserProduct> findByUserId(@PathVariable("id") Long id){
        return userProductRepository.findByUser2Id(id);
    }

    @RequestMapping("/test/getListOfUserProductsByProductId/{id}")
    public List<UserProduct> findByProduct(@PathVariable("id") Long id){
        return userProductRepository.findByProductId(id);
    }

    @RequestMapping("/test/getListOfUserProductsByProductIdAndUserId/{productId}/{userId}")
    public List<UserProduct> findByProductAndUser(@PathVariable("productId") Long productId , @PathVariable("userId") Long userId){
        return userProductRepository.findByProductIdAndUser2Id(productId , userId);
    }

    @RequestMapping("/test/getListOfUserProducts")
    public List<UserProduct> findAll(){
        return userProductRepository.findAll();
    }

}
