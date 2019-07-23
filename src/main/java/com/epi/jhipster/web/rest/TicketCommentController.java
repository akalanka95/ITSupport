package com.epi.jhipster.web.rest;


import com.epi.jhipster.domain.Ticket;
import com.epi.jhipster.domain.TicketComment;
import com.epi.jhipster.domain.User;
import com.epi.jhipster.repository.TicketCommentRepository;
import com.epi.jhipster.repository.UserRepository;
import com.epi.jhipster.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.List;

@RestController
@RequestMapping("/api/ticket/comment")
public class TicketCommentController {
    @Autowired
    private TicketCommentRepository ticketCommentRepository;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/getListOfTicketsComments")
    public List<TicketComment> findAll(){
        return ticketCommentRepository.findAll();
    }

    @RequestMapping("/getListOfTicketsByTicketId/{id}")
    public List<TicketComment> findByTicketId(@PathVariable("id") Long id){
        return ticketCommentRepository.findByTicketId(id);
    }

    @RequestMapping("/save")
    public TicketComment save(@RequestBody TicketComment ticketComment){
        User user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
        ticketComment.setUser(user);
        Instant now = Instant.now();
        ZonedDateTime chicago = now.atZone(ZoneId.of("Asia/Colombo"));
        chicago.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.FULL));
        ticketComment.setTicketTime(chicago.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.FULL)).replace(" o'clock IST",""));
        ticketComment.setTicketDate(LocalDate.now());

        return ticketCommentRepository.save(ticketComment);
    }

//    @RequestMapping("/delete")
//    public List<TicketComment> findByTicketId(@PathVariable("id") Long id){
//        return ticketCommentRepository.findByTicketId(id);
//    }



}
