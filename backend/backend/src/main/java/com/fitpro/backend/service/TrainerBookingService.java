package com.fitpro.backend.service;

import com.fitpro.backend.dto.BookingRequest;
import com.fitpro.backend.dto.TrainerBookingDto;
import com.fitpro.backend.model.TrainerBooking;
import com.fitpro.backend.model.User;
import com.fitpro.backend.repository.TrainerBookingRepository;
import com.fitpro.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainerBookingService {

    private final TrainerBookingRepository bookingRepository;
    private final UserRepository userRepository;

    public TrainerBookingDto requestBooking(String traineeUsername, BookingRequest request) {
        User trainee = userRepository.findByUsername(traineeUsername)
                .orElseThrow(() -> new RuntimeException("Trainee not found"));
        User trainer = userRepository.findById(request.getTrainerId())
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        if (!"TRAINER".equalsIgnoreCase(trainer.getRole())) {
            throw new RuntimeException("Requested user is not a trainer");
        }

        // Check if trainee already has an active booking
        bookingRepository.findByTraineeIdAndStatus(trainee.getId(), "ACTIVE")
                .ifPresent(b -> {
                    throw new RuntimeException("You already have an active trainer");
                });

        TrainerBooking booking = new TrainerBooking();
        booking.setTrainer(trainer);
        booking.setTrainee(trainee);
        booking.setStatus("PENDING");
        booking.setNotes(request.getNotes());

        TrainerBooking saved = bookingRepository.save(booking);
        return mapToDto(saved);
    }

    public List<TrainerBookingDto> getBookingsForTrainer(String trainerUsername) {
        User trainer = userRepository.findByUsername(trainerUsername)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));
        
        return bookingRepository.findByTrainerId(trainer.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    public List<TrainerBookingDto> getBookingsForTrainee(String traineeUsername) {
        User trainee = userRepository.findByUsername(traineeUsername)
                .orElseThrow(() -> new RuntimeException("Trainee not found"));
        
        return bookingRepository.findByTraineeId(trainee.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public TrainerBookingDto updateBookingStatus(String trainerUsername, Long bookingId, String status) {
        User trainer = userRepository.findByUsername(trainerUsername)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        TrainerBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getTrainer().getId().equals(trainer.getId())) {
            throw new RuntimeException("Not authorized to update this booking");
        }
        
        // If accepting, set trainee's active trainer ID
        if ("ACCEPTED".equalsIgnoreCase(status) || "ACTIVE".equalsIgnoreCase(status)) {
            status = "ACTIVE";
            User trainee = booking.getTrainee();
            trainee.setActiveTrainerId(trainer.getId());
            userRepository.save(trainee);
        } else if ("COMPLETED".equalsIgnoreCase(status) || "REJECTED".equalsIgnoreCase(status)) {
            User trainee = booking.getTrainee();
            if (trainer.getId().equals(trainee.getActiveTrainerId())) {
                trainee.setActiveTrainerId(null);
                userRepository.save(trainee);
            }
        }

        booking.setStatus(status.toUpperCase());
        TrainerBooking saved = bookingRepository.save(booking);
        return mapToDto(saved);
    }

    private TrainerBookingDto mapToDto(TrainerBooking booking) {
        TrainerBookingDto dto = new TrainerBookingDto();
        dto.setId(booking.getId());
        dto.setTrainerId(booking.getTrainer().getId());
        dto.setTrainerName(booking.getTrainer().getFullName());
        dto.setTraineeId(booking.getTrainee().getId());
        dto.setTraineeName(booking.getTrainee().getFullName());
        dto.setStatus(booking.getStatus());
        dto.setNotes(booking.getNotes());
        dto.setBookingDate(booking.getBookingDate());
        return dto;
    }
}
