package com.epi.jhipster.web.rest;

import com.epi.jhipster.domain.Company;
import com.epi.jhipster.domain.Product;
import com.epi.jhipster.domain.Ticket;
import com.epi.jhipster.domain.User;
import com.epi.jhipster.repository.CompanyRepository;
import com.epi.jhipster.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CompanyController {
    @Autowired
    private CompanyRepository companyRepository;

    @RequestMapping("/test/getListOfCompany")
    public List<Company> findAll(){
        return  companyRepository.findAll();
    }
}
