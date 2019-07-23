package com.epi.jhipster;

import com.epi.jhipster.config.ApplicationProperties;
import com.epi.jhipster.config.DefaultProfileUtil;

import com.epi.jhipster.domain.*;
import com.epi.jhipster.repository.*;
import com.epi.jhipster.service.ProductService;
import io.github.jhipster.config.JHipsterConstants;

import org.apache.commons.lang3.StringUtils;
import org.checkerframework.checker.units.qual.A;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@EnableConfigurationProperties({LiquibaseProperties.class, ApplicationProperties.class})
@EnableDiscoveryClient
public class Jhipstersupport3App implements CommandLineRunner {

    @Autowired
    private ProductService productService;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private AuthorityRepository authorityRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TicketStatusRepository ticketStatusRepository;

    private static final Logger log = LoggerFactory.getLogger(Jhipstersupport3App.class);

    private final Environment env;

    private final PasswordEncoder passwordEncoder;

    public Jhipstersupport3App(Environment env, PasswordEncoder passwordEncoder) {
        this.env = env;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Initializes jhipstersupport3.
     * <p>
     * Spring profiles can be configured with a program argument --spring.profiles.active=your-active-profile
     * <p>
     * You can find more information on how profiles work with JHipster on <a href="https://www.jhipster.tech/profiles/">https://www.jhipster.tech/profiles/</a>.
     */
    @PostConstruct
    public void initApplication() {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_PRODUCTION)) {
            log.error("You have misconfigured your application! It should not run " +
                "with both the 'dev' and 'prod' profiles at the same time.");
        }
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_CLOUD)) {
            log.error("You have misconfigured your application! It should not " +
                "run with both the 'dev' and 'cloud' profiles at the same time.");
        }
    }

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Jhipstersupport3App.class);
        DefaultProfileUtil.addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        logApplicationStartup(env);
    }

    private static void logApplicationStartup(Environment env) {
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        String serverPort = env.getProperty("server.port");
        String contextPath = env.getProperty("server.servlet.context-path");
        if (StringUtils.isBlank(contextPath)) {
            contextPath = "/";
        }
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }
        log.info("\n----------------------------------------------------------\n\t" +
                "Application '{}' is running! Access URLs:\n\t" +
                "Local: \t\t{}://localhost:{}{}\n\t" +
                "External: \t{}://{}:{}{}\n\t" +
                "Profile(s): \t{}\n----------------------------------------------------------",
            env.getProperty("spring.application.name"),
            protocol,
            serverPort,
            contextPath,
            protocol,
            hostAddress,
            serverPort,
            contextPath,
            env.getActiveProfiles());
    }

    @Override
    public void run(String... args) throws Exception {


//        Product p1 = new Product();
//        p1.setProductName("Branchless Banking");
//        p1.setType("SOFTWARE");
//
//
//        Product p2 = new Product();
//        p2.setProductName("Mobile Wallet");
//        p2.setType("SOFTWARE");
//
//        Product p3 = new Product();
//        p3.setProductName("SMS Banking");
//        p3.setType("SOFTWARE");
//
//
//        Module m1 = new Module();
//        m1.setModuleName("eSwitch");
//        m1.setType("SOFTWARE");
//
//        Module m2 = new Module();
//        m2.setModuleName("Admin");
//        m2.setType("SOFTWARE");
//
//        Module m3 = new Module();
//        m3.setModuleName("Middleware");
//        m3.setType("SOFTWARE");
//
//        Module m4 = new Module();
//        m4.setModuleName("DB");
//        m4.setType("SOFTWARE");
//
//
//        Module m5 = new Module();
//        m5.setModuleName("M-Server");
//        m5.setType("SOFTWARE");
//
//        Module m6 = new Module();
//        m6.setModuleName("WAM");
//        m6.setType("SOFTWARE");
//
//        Module m7 = new Module();
//        m7.setModuleName("TSP");
//        m7.setType("SOFTWARE");
//
//        Company c1 = new Company();
//        c1.setCompanyName("NSB");
//        companyRepository.save(c1);
//
//        Company c2 = new Company();
//        c2.setCompanyName("NTB");
//        companyRepository.save(c2);
//
//        Company c3 = new Company();
//        c3.setCompanyName("RDB");
//        companyRepository.save(c3);
//
//        Company c4 = new Company();
//        c4.setCompanyName("EPIC_LANKA");
//        companyRepository.save(c4);
//
//        Department d1 = new Department();
//        d1.setDepartmentName("Support");
//        departmentRepository.save(d1);
//
//        Department d2 = new Department();
//        d2.setDepartmentName("QA");
//        departmentRepository.save(d2);
//
//        Department d3 = new Department();
//        d3.setDepartmentName("Dev");
//        departmentRepository.save(d3);
//
//        Department d4 = new Department();
//        d4.setDepartmentName("Compliance");
//        departmentRepository.save(d4);
//
//        Set<Product_Module> productModule = new HashSet<>();
//        productModule.add(new Product_Module(p1,m1));
//        productModule.add(new Product_Module(p1,m2));
//        productModule.add(new Product_Module(p1,m3));
//        productModule.add(new Product_Module(p1,m4));
//        productService.createProduct(p1, productModule);
//
//        Set<Product_Module> productModule1 = new HashSet<>();
//        productModule1.add(new Product_Module(p2,m5));
//        productModule1.add(new Product_Module(p2,m6));
//        productModule1.add(new Product_Module(p2,m2));
//        productModule1.add(new Product_Module(p2,m4));
//        productService.createProduct(p2, productModule1);
//
//
//        User u1 = new User();
//        u1.setLogin("client_dfcc");
//        u1.setFirstName("client_dfcc");
//        u1.setCompany(c1);
//        String encryptedPassword = passwordEncoder.encode("test");
//        u1.setPassword(encryptedPassword);
//        Set<Authority> authorities = new HashSet<>();
//        authorityRepository.findById("ROLE_USER").ifPresent(authorities::add);
//        u1.setAuthorities(authorities);
//        u1.setActivated(true);
//        u1.setUserRole("CLIENT");
//        userRepository.save(u1);
//
//        User u2 = new User();
//        u2.setLogin("sup_cms");
//        u2.setFirstName("sup_cms");
//        u2.setDepartment(d1);
//        u2.setCompany(c4);
//        String encryptedPassword1 = passwordEncoder.encode("test");
//        u2.setPassword(encryptedPassword1);
//        Set<Authority> authorities1 = new HashSet<>();
//        authorityRepository.findById("ROLE_TEAM").ifPresent(authorities1::add);
//        u2.setAuthorities(authorities1);
//        u2.setActivated(true);
//        u2.setUserRole("USER");
//        userRepository.save(u2);
//
//        User u3 = new User();
//        u3.setLogin("sup_h");
//        u3.setDepartment(d1);
//        u3.setFirstName("sup_h");
//        u3.setCompany(c4);
//        String encryptedPassword2 = passwordEncoder.encode("test");
//        u3.setPassword(encryptedPassword2);
//        Set<Authority> authorities2 = new HashSet<>();
//        authorityRepository.findById("ROLE_TEAM_SUPERVISOR").ifPresent(authorities2::add);
//        u3.setAuthorities(authorities2);
//        u3.setActivated(true);
//        u3.setUserRole("SUPERVISOR");
//        userRepository.save(u3);
//
//        User u4 = new User();
//        u4.setLogin("qa_h");
//        u4.setDepartment(d2);
//        u4.setFirstName("qa_h");
//        u4.setCompany(c4);
//        String encryptedPassword3 = passwordEncoder.encode("test");
//        u4.setPassword(encryptedPassword3);
//        Set<Authority> authorities4 = new HashSet<>();
//        authorityRepository.findById("ROLE_TEAM_SUPERVISOR").ifPresent(authorities4::add);
//        u4.setAuthorities(authorities4);
//        u4.setActivated(true);
//        u4.setUserRole("SUPERVISOR");
//        userRepository.save(u4);
//
//        User u5 = new User();
//        u5.setLogin("qa_cms");
//        u5.setFirstName("qa_cms");
//        u5.setDepartment(d2);
//        u5.setCompany(c4);
//        String encryptedPassword5 = passwordEncoder.encode("test");
//        u5.setPassword(encryptedPassword5);
//        Set<Authority> authorities5 = new HashSet<>();
//        authorityRepository.findById("ROLE_TEAM").ifPresent(authorities5::add);
//        u5.setAuthorities(authorities5);
//        u5.setActivated(true);
//        u5.setUserRole("USER");
//        userRepository.save(u5);
//
//
//        User u6 = new User();
//        u6.setLogin("dev_h");
//        u6.setDepartment(d3);
//        u6.setFirstName("dev_h");
//        u6.setCompany(c4);
//        String encryptedPassword6 = passwordEncoder.encode("test");
//        u6.setPassword(encryptedPassword6);
//        Set<Authority> authorities6 = new HashSet<>();
//        authorityRepository.findById("ROLE_TEAM_SUPERVISOR").ifPresent(authorities6::add);
//        u6.setAuthorities(authorities6);
//        u6.setActivated(true);
//        u6.setUserRole("SUPERVISOR");
//        userRepository.save(u6);
//
//        User u7 = new User();
//        u7.setLogin("dev_cms");
//        u7.setFirstName("dev_cms");
//        u7.setDepartment(d3);
//        u7.setCompany(c4);
//        String encryptedPassword7 = passwordEncoder.encode("test");
//        u7.setPassword(encryptedPassword7);
//        Set<Authority> authorities7 = new HashSet<>();
//        authorityRepository.findById("ROLE_TEAM").ifPresent(authorities7::add);
//        u7.setAuthorities(authorities7);
//        u7.setActivated(true);
//        u7.setUserRole("USER");
//        userRepository.save(u7);


        TicketStatus t1 = new TicketStatus();
        t1.setStatus("SUPPORT PENDING");
        ticketStatusRepository.save(t1);

        TicketStatus t2 = new TicketStatus();
        t2.setStatus("SUPPORT ACCEPTED");
        ticketStatusRepository.save(t2);

        TicketStatus t3 = new TicketStatus();
        t3.setStatus("SUPPORT INPROGRESS");
        ticketStatusRepository.save(t3);

        TicketStatus t4 = new TicketStatus();
        t4.setStatus("SUPPORT ASSIGNED TO QA");
        ticketStatusRepository.save(t4);

        TicketStatus t5 = new TicketStatus();
        t5.setStatus("QA ASSIGNED BY MANAGER");
        ticketStatusRepository.save(t5);

        TicketStatus t6 = new TicketStatus();
        t6.setStatus("QA ACCEPTED");
        ticketStatusRepository.save(t6);

        TicketStatus t7 = new TicketStatus();
        t7.setStatus("QA INPROGRESS");
        ticketStatusRepository.save(t7);

        TicketStatus t8 = new TicketStatus();
        t8.setStatus("QA ASSIGNED TO DEVELOPMENT");
        ticketStatusRepository.save(t8);

        TicketStatus t9 = new TicketStatus();
        t9.setStatus("DEV ASSIGNED BY MANAGER");
        ticketStatusRepository.save(t9);

        TicketStatus t10 = new TicketStatus();
        t10.setStatus("DEV ACCEPTED");
        ticketStatusRepository.save(t10);

        TicketStatus t11 = new TicketStatus();
        t11.setStatus("DEV INPROGRESS");
        ticketStatusRepository.save(t11);

        TicketStatus t12 = new TicketStatus();
        t12.setStatus("DEVELOPMENT DONE");
        ticketStatusRepository.save(t12);

        TicketStatus t13 = new TicketStatus();
        t13.setStatus("DEVELOPMENT DONE - QA ACCEPTED");
        ticketStatusRepository.save(t13);

        TicketStatus t14 = new TicketStatus();
        t14.setStatus("DEVELOPMENT DONE - QA INPROGRESS");
        ticketStatusRepository.save(t14);

        TicketStatus t15 = new TicketStatus();
        t15.setStatus("QA DONE");
        ticketStatusRepository.save(t15);

        TicketStatus t16 = new TicketStatus();
        t16.setStatus("QA DONE - SUPPORT ACCEPTED");
        ticketStatusRepository.save(t16);

        TicketStatus t17 = new TicketStatus();
        t17.setStatus("QA DONE - SUPPORT INPROGRESS");
        ticketStatusRepository.save(t17);

        TicketStatus t18 = new TicketStatus();
        t18.setStatus("SUPPORT DONE");
        ticketStatusRepository.save(t18);

        TicketStatus t19 = new TicketStatus();
        t19.setStatus("TICKET CLOSED");
        ticketStatusRepository.save(t19);

        TicketStatus t20 = new TicketStatus();
        t20.setStatus("CLOSE");
        ticketStatusRepository.save(t20);

        TicketStatus t21 = new TicketStatus();
        t21.setStatus("TICKET_CLOSE");
        ticketStatusRepository.save(t21);

        TicketStatus t22 = new TicketStatus();
        t22.setStatus("DEVELOPMENT DONE - QA PENDING");
        ticketStatusRepository.save(t22);

        TicketStatus t23 = new TicketStatus();
        t23.setStatus("QA DONE - SUPPORT PENDING");
        ticketStatusRepository.save(t23);

        TicketStatus t24 = new TicketStatus();
        t24.setStatus("READY FOR TESTING");
        ticketStatusRepository.save(t24);

        TicketStatus t25 = new TicketStatus();
        t25.setStatus("READY_FOR_TESTING");
        ticketStatusRepository.save(t25);

        TicketStatus t26 = new TicketStatus();
        t26.setStatus("SUPPORT WAITING FOR FEEDBACK");
        ticketStatusRepository.save(t26);

        TicketStatus t27 = new TicketStatus();
        t27.setStatus("SUPPORT-DONE");
        ticketStatusRepository.save(t27);

    }
}
