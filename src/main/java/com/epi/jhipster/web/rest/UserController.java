package com.epi.jhipster.web.rest;

import com.epi.jhipster.domain.Product_Module;
import com.epi.jhipster.domain.Ticket;
import com.epi.jhipster.domain.User;
import com.epi.jhipster.repository.TicketRepository;
import com.epi.jhipster.repository.UserRepository;
import com.epi.jhipster.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/test/getListOfUsers")
    public List<User> findAll(){
        return  userRepository.findAll();
    }

    @RequestMapping("/test/getListOfUsersByDepartmentId/{id}")
    public List<User> findList(@PathVariable("id") Long id){
        return  userRepository.findAllByDepartmentId(id);
    }

    @RequestMapping("/test/getCurrentLoggedUser")
    public User findLoggedUser(){
        User user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
        return user;
    }

    @RequestMapping("/test/getDepartmentSupervisor/{id}")
    public List<User> findUserByDepartmentAndRole(@PathVariable("id") Long id){
        return  userRepository.findByUserRoleAndDepartmentId("SUPERVISOR" , id);
    }

}
