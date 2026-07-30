package com.fitpro.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "assigned_diets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignedDiet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trainer_id", nullable = false)
    private User trainer;

    @ManyToOne
    @JoinColumn(name = "trainee_id", nullable = false)
    private User trainee;

    @Column(columnDefinition = "TEXT")
    private String breakfast;

    @Column(columnDefinition = "TEXT")
    private String lunch;

    @Column(columnDefinition = "TEXT")
    private String snacks;

    @Column(columnDefinition = "TEXT")
    private String dinner;

    private Integer totalCalories;
    private Double totalProtein;
    private Double totalCarbs;
    private Double totalFats;

    private LocalDateTime assignedDate;

    @PrePersist
    protected void onCreate() {
        assignedDate = LocalDateTime.now();
    }
}
