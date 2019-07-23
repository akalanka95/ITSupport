package com.epi.jhipster.repository;


import com.epi.jhipster.domain.Company_Product_Module;
import com.epi.jhipster.domain.UserProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserProductDetailsRepository extends JpaRepository<UserProductDetails , Long> {

    List<UserProductDetails> findByCompanyProductModuleId(@Param("id") Long id);
}
