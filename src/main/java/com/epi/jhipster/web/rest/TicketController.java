package com.epi.jhipster.web.rest;

import com.epi.jhipster.domain.Ticket;
import com.epi.jhipster.domain.User;
import com.epi.jhipster.repository.TicketRepository;
import com.epi.jhipster.repository.UserRepository;
import com.epi.jhipster.security.SecurityUtils;
//import com.sun.xml.internal.bind.v2.runtime.output.SAXOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/test/getListTickets")
    public List<Ticket> findAll(){
        return (List<Ticket>) ticketRepository.findAll();
    }


    @RequestMapping("/test/ticket/getTicketById/{id}")
    public Ticket findById(@PathVariable("id") Long id){
        return ticketRepository.findById(id).get();
    }


    @RequestMapping("/test/ticket/save")
    public Ticket save(@RequestBody Ticket ticket){

        if (ticket.getUser1() == null) {
            User user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
            ticket.setUser1(user);
            ticket.setBankName(ticket.getUser1().getCompany().getCompanyName());
            Instant now = Instant.now();
            ZonedDateTime chicago = now.atZone(ZoneId.of("Asia/Colombo"));
            chicago.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.FULL));
            ticket.setTicketTime(chicago.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.FULL)).replace(" o'clock IST",""));
            ticket.setTicketDate(LocalDate.now());
            ticket.setTicketNo("e"+LocalDate.now().toString().replace("-","")+
                chicago.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.FULL)).replace(":","").replace(" PM IST","").replace(" AM IST","")
                    .replace(" o'clock IST","")
            );
        }

        Instant now = Instant.now();
        ZonedDateTime chicago = now.atZone(ZoneId.of("Asia/Colombo"));
        chicago.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.FULL));
        ticket.setCurrentStatusAgeTime(chicago.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.FULL)));
        ticket.setCurrentStatusAgeDate(LocalDate.now());

        System.out.println(SecurityUtils.getCurrentUserLogin());
        System.out.println("99999999999999999999999999999999999999");
        System.out.println(ticket.getTeamStatus());
        return ticketRepository.save(ticket);
    }

    @RequestMapping("/test/ticket/getListTicketsByUser")
    public List<Ticket> findByUserId(){
        User user1 = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
        return ticketRepository.findOneByUser1Id(user1.getId());
    }

    @RequestMapping("/test/getListTicketsByBankName/{name}")
    public List<Ticket> findByBankName(@PathVariable("name") String name){
        return ticketRepository.findByBankName(name);
    }
}
