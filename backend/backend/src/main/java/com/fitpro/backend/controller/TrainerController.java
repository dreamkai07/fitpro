package com.fitpro.backend.controller;

import com.fitpro.backend.dto.TrainerProfileDto;
import com.fitpro.backend.dto.TrainerProfileRequest;
import com.fitpro.backend.service.TrainerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
@RequiredArgsConstructor
public class TrainerController {

    private final TrainerService trainerService;

    @GetMapping
    public ResponseEntity<List<TrainerProfileDto>> getAllTrainers() {
        return ResponseEntity.ok(trainerService.getAllTrainers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainerProfileDto> getTrainerProfile(@PathVariable Long id) {
        return ResponseEntity.ok(trainerService.getTrainerProfile(id));
    }

    @PutMapping("/profile")
    public ResponseEntity<TrainerProfileDto> updateProfile(Principal principal, @RequestBody TrainerProfileRequest request) {
        return ResponseEntity.ok(trainerService.createOrUpdateProfile(principal.getName(), request));
    }
}
