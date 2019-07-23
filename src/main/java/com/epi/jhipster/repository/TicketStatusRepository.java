package com.epi.jhipster.repository;

import com.epi.jhipster.domain.Ticket;
import com.epi.jhipster.domain.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketStatusRepository extends JpaRepository<TicketStatus, Long> {

}
