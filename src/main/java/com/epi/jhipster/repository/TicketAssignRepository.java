package com.epi.jhipster.repository;

import com.epi.jhipster.domain.TicketAssign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketAssignRepository extends JpaRepository<TicketAssign, Long> {

        List<TicketAssign> findByUserProduct_User2Id(Long id);
        List<TicketAssign> findByUserId(Long id);
        List<TicketAssign> findByUserIdAndTicketId(Long userId , Long ticketId);
        Optional<TicketAssign> findById(Long id);
        List<TicketAssign> findByTicketId(Long id);


        void deleteById(TicketAssign ticketAssign);
}
