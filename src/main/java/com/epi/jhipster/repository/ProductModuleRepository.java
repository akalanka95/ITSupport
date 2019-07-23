package com.epi.jhipster.repository;


import com.epi.jhipster.domain.Product_Module;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductModuleRepository extends CrudRepository<Product_Module, Long> {
    Optional<Product_Module> findById(Long id);
    List<Product_Module> findByProductId(@Param("id") Long id);
}
