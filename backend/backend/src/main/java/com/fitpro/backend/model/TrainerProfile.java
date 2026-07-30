package com.fitpro.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "trainer_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(columnDefinition = "TEXT")
    private String aboutMe;
    
    private Integer experienceYears;
    private Double hourlyPrice;
    private Double monthlyPrice;
    private Integer activeClients;
    private Double rating;
    private Integer totalReviews;
    private Boolean isVerified;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "trainer_specializations", joinColumns = @JoinColumn(name = "trainer_profile_id"))
    @Column(name = "specialization")
    private List<String> specializations;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "trainer_certifications", joinColumns = @JoinColumn(name = "trainer_profile_id"))
    @Column(name = "certification")
    private List<String> certifications;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "trainer_languages", joinColumns = @JoinColumn(name = "trainer_profile_id"))
    @Column(name = "language")
    private List<String> languagesSpoken;

    @Column(columnDefinition = "TEXT")
    private String availabilitySchedule;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "trainer_achievements", joinColumns = @JoinColumn(name = "trainer_profile_id"))
    @Column(name = "achievement")
    private List<String> achievements;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "trainer_galleries", joinColumns = @JoinColumn(name = "trainer_profile_id"))
    @Column(name = "image_url")
    private List<String> transformationGallery;
    
    private String profilePhotoUrl;
}
