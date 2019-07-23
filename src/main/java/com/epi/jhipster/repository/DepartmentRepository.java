package com.epi.jhipster.repository;

import com.epi.jhipster.domain.Department;
import com.epi.jhipster.domain.Module;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository  extends JpaRepository<Department, Long> {


}
