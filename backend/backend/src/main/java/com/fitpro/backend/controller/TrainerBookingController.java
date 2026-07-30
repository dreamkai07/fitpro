package com.fitpro.backend.controller;

import com.fitpro.backend.dto.BookingRequest;
import com.fitpro.backend.dto.TrainerBookingDto;
import com.fitpro.backend.service.TrainerBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class TrainerBookingController {

    private final TrainerBookingService bookingService;

    @PostMapping("/request")
    public ResponseEntity<TrainerBookingDto> requestBooking(Principal principal, @RequestBody BookingRequest request) {
        return ResponseEntity.ok(bookingService.requestBooking(principal.getName(), request));
    }

    @GetMapping("/trainer")
    public ResponseEntity<List<TrainerBookingDto>> getTrainerBookings(Principal principal) {
        return ResponseEntity.ok(bookingService.getBookingsForTrainer(principal.getName()));
    }

    @GetMapping("/trainee")
    public ResponseEntity<List<TrainerBookingDto>> getTraineeBookings(Principal principal) {
        return ResponseEntity.ok(bookingService.getBookingsForTrainee(principal.getName()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<TrainerBookingDto> updateStatus(Principal principal, @PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(principal.getName(), id, status));
    }
}
