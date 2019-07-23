package com.epi.jhipster.repository;


import com.epi.jhipster.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository< Company, Long> {
    Company findByCompanyName(String name);
}
