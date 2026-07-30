package com.fitpro.backend.service;

import com.fitpro.backend.model.*;
import com.fitpro.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TrainerProfileRepository trainerProfileRepository;
    private final TrainerBookingRepository bookingRepository;
    private final TrainerReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return; // Only seed if empty
        }

        System.out.println("Seeding Database with Demo Data...");
        
        String encodedPassword = passwordEncoder.encode("password");
        Random random = new Random();

        // Seed Admin
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@fitpro.com");
        admin.setPassword(encodedPassword);
        admin.setFullName("Platform Admin");
        admin.setRole("ADMIN");
        userRepository.save(admin);

        // Seed Trainers
        List<String> specializations = Arrays.asList("Weight Loss", "Muscle Gain", "Bodybuilding", "CrossFit", "Yoga", "Cardio", "HIIT");
        List<String> languages = Arrays.asList("English", "Spanish", "Hindi", "French");
        List<String> certifications = Arrays.asList("ACE Certified", "NASM Certified", "ISSA Certified Personal Trainer");

        User[] trainers = new User[15];
        for (int i = 0; i < 15; i++) {
            User trainer = new User();
            trainer.setUsername("trainer" + i);
            trainer.setEmail("trainer" + i + "@fitpro.com");
            trainer.setPassword(encodedPassword);
            trainer.setFullName("Pro Trainer " + i);
            trainer.setRole("TRAINER");
            trainers[i] = userRepository.save(trainer);

            TrainerProfile profile = new TrainerProfile();
            profile.setUser(trainers[i]);
            profile.setAboutMe("Hi, I am a professional fitness trainer dedicated to helping you achieve your goals.");
            profile.setExperienceYears(2 + random.nextInt(8));
            profile.setHourlyPrice(20.0 + random.nextInt(80));
            profile.setMonthlyPrice(200.0 + random.nextInt(400));
            profile.setActiveClients(random.nextInt(10));
            profile.setIsVerified(random.nextBoolean());
            
            profile.setSpecializations(Arrays.asList(specializations.get(random.nextInt(specializations.size())), specializations.get(random.nextInt(specializations.size()))));
            profile.setLanguagesSpoken(Arrays.asList("English", languages.get(random.nextInt(languages.size()))));
            profile.setCertifications(Arrays.asList(certifications.get(random.nextInt(certifications.size()))));
            profile.setProfilePhotoUrl("https://i.pravatar.cc/300?u=" + trainer.getUsername());

            trainerProfileRepository.save(profile);
        }

        // Seed Trainees
        User[] trainees = new User[40];
        for (int i = 0; i < 40; i++) {
            User trainee = new User();
            trainee.setUsername("trainee" + i);
            trainee.setEmail("trainee" + i + "@fitpro.com");
            trainee.setPassword(encodedPassword);
            trainee.setFullName("Fitness Enthusiast " + i);
            trainee.setRole("TRAINEE");
            
            // Randomly assign active trainer to some trainees
            if (random.nextBoolean()) {
                User activeTrainer = trainers[random.nextInt(trainers.length)];
                trainee.setActiveTrainerId(activeTrainer.getId());
                
                // Add an active booking
                TrainerBooking booking = new TrainerBooking();
                booking.setTrainer(activeTrainer);
                booking.setTrainee(trainee);
                booking.setStatus("ACTIVE");
                booking.setNotes("Looking forward to training!");
                bookingRepository.save(booking);
            }
            
            trainees[i] = userRepository.save(trainee);
        }
        
        // Seed some pending bookings
        for (int i=0; i<10; i++) {
            TrainerBooking booking = new TrainerBooking();
            booking.setTrainer(trainers[random.nextInt(trainers.length)]);
            booking.setTrainee(trainees[random.nextInt(trainees.length)]);
            booking.setStatus("PENDING");
            booking.setNotes("I want to lose weight.");
            bookingRepository.save(booking);
        }

        // Seed Reviews
        for (int i = 0; i < 50; i++) {
            User trainer = trainers[random.nextInt(trainers.length)];
            User trainee = trainees[random.nextInt(trainees.length)];
            
            TrainerReview review = new TrainerReview();
            review.setTrainer(trainer);
            review.setTrainee(trainee);
            review.setRating(3 + random.nextInt(3)); // 3 to 5 stars
            review.setReviewComment("Great trainer, very helpful!");
            reviewRepository.save(review);
            
            // Update Trainer Rating
            TrainerProfile profile = trainerProfileRepository.findByUserId(trainer.getId()).get();
            List<TrainerReview> allReviews = reviewRepository.findByTrainerId(trainer.getId());
            double avg = allReviews.stream().mapToInt(TrainerReview::getRating).average().orElse(0.0);
            profile.setRating(avg);
            profile.setTotalReviews(allReviews.size());
            trainerProfileRepository.save(profile);
        }

        System.out.println("Database seeding completed!");
    }
}
