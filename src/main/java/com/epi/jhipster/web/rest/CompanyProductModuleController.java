package com.epi.jhipster.web.rest;

import com.epi.jhipster.domain.Company_Product_Module;
import com.epi.jhipster.repository.CompanyProductModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CompanyProductModuleController {

    @Autowired
    private CompanyProductModuleRepository companyProductModuleRepository;


    @RequestMapping("/test/saveCompanyProductModule")
    public Company_Product_Module findOne(@RequestBody Company_Product_Module company_product_module){
        return  companyProductModuleRepository.save(company_product_module);
    }

    @RequestMapping("/test/listOfCompanyProductModule")
    public List<Company_Product_Module> findList(){
        return  companyProductModuleRepository.findAll();
    }

    @RequestMapping("/test/getListOfCompanyProductsModulesByProductModuleId/{id}")
    public List<Company_Product_Module> findOne(@PathVariable("id") Long id){
        return  companyProductModuleRepository.findByProductModuleId(id);
    }

    @RequestMapping("/test/getListOfCompanyProductModuleByID/{id}")
    public Company_Product_Module findCompanyProductModuleByID(@PathVariable("id") Long id){

        // User user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
        Company_Product_Module c1 = new Company_Product_Module();
        c1 = companyProductModuleRepository.findById(id).get();
        return c1 ;
    }
}
