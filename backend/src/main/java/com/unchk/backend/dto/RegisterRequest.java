package com.unchk.backend.dto;

import com.unchk.backend.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String nom;
    private String prenom;
    private String email;
    private String password;
    private Role role;
}