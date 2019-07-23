package com.epi.jhipster.repository;


import com.epi.jhipster.domain.Module;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleRepository extends JpaRepository<Module, Long> {
    Module findByModuleName(String name);
}
