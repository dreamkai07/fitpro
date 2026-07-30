package com.fitpro.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "assigned_workouts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignedWorkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trainer_id", nullable = false)
    private User trainer;

    @ManyToOne
    @JoinColumn(name = "trainee_id", nullable = false)
    private User trainee;

    @Column(nullable = false)
    private String exerciseName;

    private Integer sets;
    private Integer repetitions;
    private Integer restTimeSeconds;
    private String difficulty; // BEGINNER, INTERMEDIATE, ADVANCED
    
    @Column(columnDefinition = "TEXT")
    private String instructions;

    private LocalDateTime assignedDate;

    @PrePersist
    protected void onCreate() {
        assignedDate = LocalDateTime.now();
    }
}
