package com.epi.jhipster.web.rest;


import com.epi.jhipster.domain.CompanyProductDetails;
import com.epi.jhipster.domain.UserProductDetails;
import com.epi.jhipster.repository.UserProductDetailsRepository;
import com.epi.jhipster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserProductDetailsController {

    @Autowired
    private UserProductDetailsRepository userProductDetailsRepository;

    @RequestMapping("/test/saveProductToUser")
    public UserProductDetails save(@RequestBody UserProductDetails userProductDetails){
       return userProductDetailsRepository.save(userProductDetails);
    }

    @RequestMapping("/test/getListOfCompanyProductModuleId/{id}")
    public List<UserProductDetails> findByCompanyProductModuleId(@PathVariable("id") Long id){
        return userProductDetailsRepository.findByCompanyProductModuleId(id);
    }

}
