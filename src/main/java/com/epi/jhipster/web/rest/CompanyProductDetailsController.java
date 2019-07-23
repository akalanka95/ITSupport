package com.epi.jhipster.web.rest;

import com.epi.jhipster.domain.CompanyProductDetails;
import com.epi.jhipster.domain.Product_Module;
import com.epi.jhipster.domain.User;
import com.epi.jhipster.repository.CompanyProductDetailsRepository;
import com.epi.jhipster.repository.UserRepository;
import com.epi.jhipster.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CompanyProductDetailsController {

    @Autowired
    private CompanyProductDetailsRepository companyProductDetailsRepository;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/test/saveProductsAssignToCompany")
    public CompanyProductDetails save(@RequestBody CompanyProductDetails companyProductDetails){
        return companyProductDetailsRepository.save(companyProductDetails);
    }

    @RequestMapping("/test/getListOfCompanyProductDetailForCompany")
    public List<CompanyProductDetails> findCompanyProductDetailsForCompany(){

        User user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get();

        return  companyProductDetailsRepository.findByCompanyId(user.getCompany().getId());
    }

    @RequestMapping("/test/getListOfCompanyProductDetailByCompanyId/{id}")
    public List<CompanyProductDetails> findCompanyProductDetailsByCompanyId(@PathVariable("id") Long id){
        return  companyProductDetailsRepository.findByCompanyId(id);
    }


}
