package com.epi.jhipster.repository;



import com.epi.jhipster.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductName(String name);
    Product findByProductNameAndType(String name , String type);
    Optional<Product> findById(Long id);
}
