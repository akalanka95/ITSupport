package com.epi.jhipster.repository;

import com.epi.jhipster.domain.UserProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProductRepository extends JpaRepository<UserProduct, Long> {
    List<UserProduct> findByUser2Id(Long id);
    List<UserProduct> findByProductId(Long id);
    List<UserProduct> findByProductIdAndUser2Id(Long productId , Long userId);
}
