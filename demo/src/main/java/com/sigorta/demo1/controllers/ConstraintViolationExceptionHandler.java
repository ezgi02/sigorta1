package com.sigorta.demo1.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sigorta.demo1.error.ApiError;

import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class ConstraintViolationExceptionHandler {
	  @ExceptionHandler(ConstraintViolationException.class)
	    public ResponseEntity<ApiError> handleConstraintViolationException(ConstraintViolationException ex) {
	        ApiError error = new ApiError(400, "Validation error", "/api/1.0/traffic/saveTraffic");
	        
	        // Doğrulama hatalarını al ve ApiError nesnesine ekleyerek ayarla
	        ex.getConstraintViolations().forEach(violation -> {
	            error.getValidationErrors().put(violation.getPropertyPath().toString(), violation.getMessage());
	        });
	        
	        return ResponseEntity.badRequest().body(error);
	    }
}
