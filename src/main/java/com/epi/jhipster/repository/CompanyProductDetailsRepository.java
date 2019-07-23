package com.epi.jhipster.repository;

import com.epi.jhipster.domain.CompanyProductDetails;
import com.epi.jhipster.domain.Product_Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompanyProductDetailsRepository extends JpaRepository<CompanyProductDetails , Long> {

    List<CompanyProductDetails> findByCompanyId(@Param("id") Long id);

    }
