package com.epi.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table( name = "User_Product")
public class UserProduct {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user2;

    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.MERGE)
    private Product product;

    @JsonIgnore
    @OneToMany(mappedBy = "userProduct", cascade = CascadeType.ALL)
    private Set<TicketAssign> ticketAssign = new HashSet<>();

    private String userRole;

    public Set<TicketAssign> getTicketAssign() {
        return ticketAssign;
    }

    public void setTicketAssign(Set<TicketAssign> ticketAssign) {
        this.ticketAssign = ticketAssign;
    }

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user2;
    }

    public void setUser(User user) {
        this.user2 = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
