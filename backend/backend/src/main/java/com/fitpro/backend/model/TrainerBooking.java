package com.fitpro.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "trainer_bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainerBooking {

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
    private String status; // PENDING, ACCEPTED, REJECTED, COMPLETED

    @Column(columnDefinition = "TEXT")
    private String notes;

    private LocalDateTime bookingDate;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        bookingDate = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
