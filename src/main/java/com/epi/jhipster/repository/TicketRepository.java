package com.epi.jhipster.repository;

import com.epi.jhipster.domain.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findOneByUser1Id(Long id);
    Optional<Ticket> findById(Long id);

    List<Ticket> findByBankName(String name);

    Ticket findTopByOrderByIdDesc();
}
