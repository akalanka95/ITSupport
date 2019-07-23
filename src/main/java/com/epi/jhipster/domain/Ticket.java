package com.epi.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String ticketNo;
    private String ticketTime = null;
    private LocalDate ticketDate = null;
    private String type;
    private String status;
    private String priority;
    private String subject;
    private LocalDate currentStatusAgeDate;
    private String currentStatusAgeTime;
    private String ticketAge;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String teamStatus = "PENDING";
    private String bankName;
    private String productName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user1;

    @JsonIgnore
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private Set<TicketAssign> ticketAssign = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private Set<TicketComment> ticketComment = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private Set<TicketLog> ticketLog = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private Set<TicketUserTracker> ticketUserTracker = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private Set<TicketFiles> ticketFiles = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private Set<TicketProduct> ticketProduct = new HashSet<>();

    public Set<TicketUserTracker> getTicketUserTracker() {
        return ticketUserTracker;
    }

    public void setTicketUserTracker(Set<TicketUserTracker> ticketUserTracker) {
        this.ticketUserTracker = ticketUserTracker;
    }

    public Set<TicketComment> getTicketComment() {
        return ticketComment;
    }

    public void setTicketComment(Set<TicketComment> ticketComment) {
        this.ticketComment = ticketComment;
    }

    public Set<TicketAssign> getTicketAssign() {
        return ticketAssign;
    }

    public void setTicketAssign(Set<TicketAssign> ticketAssign) {
        this.ticketAssign = ticketAssign;
    }

    public String getTeamStatus() {
        return teamStatus;
    }

    public void setTeamStatus(String teamStatus) {
        this.teamStatus = teamStatus;
    }

    //    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_id")
//    private User  user;
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicketNo() {
        return ticketNo;
    }

    public void setTicketNo(String ticketNo) {
        this.ticketNo = ticketNo;
    }

    public String getTicketTime() {
        return ticketTime;
    }

    public void setTicketTime(String ticketTime) {
        this.ticketTime = ticketTime;
    }

    public LocalDate getTicketDate() {
        return ticketDate;
    }

    public void setTicketDate(LocalDate ticketDate) {
        this.ticketDate = ticketDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public LocalDate getCurrentStatusAgeDate() {
        return currentStatusAgeDate;
    }

    public void setCurrentStatusAgeDate(LocalDate currentStatusAgeDate) {
        this.currentStatusAgeDate = currentStatusAgeDate;
    }

    public String getCurrentStatusAgeTime() {
        return currentStatusAgeTime;
    }

    public void setCurrentStatusAgeTime(String currentStatusAgeTime) {
        this.currentStatusAgeTime = currentStatusAgeTime;
    }

    public String getTicketAge() {
        return ticketAge;
    }

    public void setTicketAge(String ticketAge) {
        this.ticketAge = ticketAge;
    }

    public Set<TicketFiles> getTicketFiles() {
        return ticketFiles;
    }

    public void setTicketFiles(Set<TicketFiles> ticketFiles) {
        this.ticketFiles = ticketFiles;
    }

    public Set<TicketProduct> getTicketProduct() {
        return ticketProduct;
    }

    public void setTicketProduct(Set<TicketProduct> ticketProduct) {
        this.ticketProduct = ticketProduct;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Set<TicketLog> getTicketLog() {
        return ticketLog;
    }

    public void setTicketLog(Set<TicketLog> ticketLog) {
        this.ticketLog = ticketLog;
    }
}
