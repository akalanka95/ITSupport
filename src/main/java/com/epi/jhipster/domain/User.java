package com.epi.jhipster.domain;

import com.epi.jhipster.config.Constants;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.BatchSize;
import javax.validation.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.time.Instant;

/**
 * A user.
 */
@Entity
@Table(name = "jhi_user")
public class User extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<PMProduct> pmProduct = new HashSet<>();


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id")
    private Company company;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Company_Product_Module> company_product_modules = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user1", cascade = CascadeType.ALL)
    private Set<Ticket> ticket = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserProductDetails> userProductDetails = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user2", cascade = CascadeType.ALL)
    private Set<UserProduct> userProduct= new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user2", cascade = CascadeType.ALL)
    private Set<UserProductQA> userProductQA = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserProductDev> userProductDev = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<TicketComment> ticketComment = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<TicketLog> ticketLog = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<TicketAssign> ticketAssign = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<TicketUserTracker> ticketUserTracker = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<TicketFiles> ticketFiles = new HashSet<>();

    @NotNull
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    @Column(length = 50, unique = true, nullable = false)
    private String login;

    @JsonIgnore
    @NotNull
    @Size(min = 60, max = 60)
    @Column(name = "password_hash", length = 60, nullable = false)
    private String password;

    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Size(max = 50)
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 254)
    @Column(length = 254, unique = true)
    private String email;

    @NotNull
    @Column(nullable = false)
    private boolean activated = false;

    @Size(min = 2, max = 6)
    @Column(name = "lang_key", length = 6)
    private String langKey;

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    @Size(max = 20)
    @Column(name = "activation_key", length = 20)
    @JsonIgnore
    private String activationKey;

    @Size(max = 20)
    @Column(name = "reset_key", length = 20)
    @JsonIgnore
    private String resetKey;

    @Column(name = "reset_date")
    private Instant resetDate = null;

    @Column(name = "user_role")
    private String userRole;

    @Column(name = "telno")
    private String telno;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "jhi_user_authority",
        joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})



    @BatchSize(size = 20)
    private Set<Authority> authorities = new HashSet<>();


    private Instant createdDate;

    private String lastModifiedBy;

    private Instant lastModifiedDate;


    public Set<TicketComment> getTicketComment() {
        return ticketComment;
    }

    public void setTicketComment(Set<TicketComment> ticketComment) {
        this.ticketComment = ticketComment;
    }

    public Set<UserProduct> getUserProduct() {
        return userProduct;
    }

    public void setUserProduct(Set<UserProduct> userProduct) {
        this.userProduct = userProduct;
    }

    public Set<Company_Product_Module> getCompany_product_modules() {
        return company_product_modules;
    }


    public Set<UserProductDetails> getUserProductDetails() {
        return userProductDetails;
    }

    public void setUserProductDetails(Set<UserProductDetails> userProductDetails) {
        this.userProductDetails = userProductDetails;
    }

    public void setCompany_product_modules(Set<Company_Product_Module> company_product_modules) {
        this.company_product_modules = company_product_modules;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

//    public Set<Ticket> getTicket() {
//        return ticket;
//    }
//
//    public void setTicket(Set<Ticket> ticket) {
//        this.ticket = ticket;
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    // Lowercase the login before saving it in database
    public void setLogin(String login) {
        this.login = StringUtils.lowerCase(login, Locale.ENGLISH);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean getActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getResetKey() {
        return resetKey;
    }

    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    public Instant getResetDate() {
        return resetDate;
    }

    public void setResetDate(Instant resetDate) {
        this.resetDate = resetDate;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        User user = (User) o;
        return !(user.getId() == null || getId() == null) && Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "User{" +
            "login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", activated='" + activated + '\'' +
            ", langKey='" + langKey + '\'' +
            ", activationKey='" + activationKey + '\'' +
            "}";
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Set<TicketAssign> getTicketAssign() {
        return ticketAssign;
    }

    public void setTicketAssign(Set<TicketAssign> ticketAssign) {
        this.ticketAssign = ticketAssign;
    }

    public Set<TicketUserTracker> getTicketUserTracker() {
        return ticketUserTracker;
    }

    public void setTicketUserTracker(Set<TicketUserTracker> ticketUserTracker) {
        this.ticketUserTracker = ticketUserTracker;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public Set<TicketFiles> getTicketFiles() {
        return ticketFiles;
    }

    public void setTicketFiles(Set<TicketFiles> ticketFiles) {
        this.ticketFiles = ticketFiles;
    }

    public String getTelno() {
        return telno;
    }

    public void setTelno(String telno) {
        this.telno = telno;
    }

    public Set<TicketLog> getTicketLog() {
        return ticketLog;
    }

    public void setTicketLog(Set<TicketLog> ticketLog) {
        this.ticketLog = ticketLog;
    }

    public Set<UserProductQA> getUserProductQA() {
        return userProductQA;
    }

    public void setUserProductQA(Set<UserProductQA> userProductQA) {
        this.userProductQA = userProductQA;
    }

    public boolean isActivated() {
        return activated;
    }

    @Override
    public Instant getCreatedDate() {
        return createdDate;
    }

    @Override
    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    @Override
    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    @Override
    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    @Override
    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Set<UserProductDev> getUserProductDev() {
        return userProductDev;
    }

    public void setUserProductDev(Set<UserProductDev> userProductDev) {
        this.userProductDev = userProductDev;
    }

    public Set<PMProduct> getPmProduct() {
        return pmProduct;
    }

    public void setPmProduct(Set<PMProduct> pmProduct) {
        this.pmProduct = pmProduct;
    }
}
