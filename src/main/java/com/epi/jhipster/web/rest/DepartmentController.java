package com.epi.jhipster.web.rest;

import com.epi.jhipster.domain.Department;
import com.epi.jhipster.domain.Product;
import com.epi.jhipster.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DepartmentController {
    @Autowired
    private DepartmentRepository departmentRepository;

    @RequestMapping("/test/getListOfDepartments")
    public List<Department> findAll(){
        return  departmentRepository.findAll();
    }
}
