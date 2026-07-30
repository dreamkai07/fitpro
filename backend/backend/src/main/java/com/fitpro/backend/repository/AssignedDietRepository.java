package com.fitpro.backend.repository;

import com.fitpro.backend.model.AssignedDiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssignedDietRepository extends JpaRepository<AssignedDiet, Long> {
    List<AssignedDiet> findByTraineeId(Long traineeId);
    List<AssignedDiet> findByTrainerId(Long trainerId);
}
