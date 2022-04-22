package com.stockmarket.user.controller;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockmarket.user.dto.UserDTO;
import com.stockmarket.user.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/${api.version}/market/user")
@Api
public class UserController {

	@Autowired
	private UserService service;

	private Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@PostMapping
	@ApiOperation(value = "Add a new  user.")
	public int register(@RequestBody UserDTO user) {

		LOGGER.info("Save user details {} ", user);

		return service.saveUser(user);
	}

	@PostMapping("/authenticate")
	@ApiOperation(value = "Validate user and send the token")
	public String authenticate(@RequestBody String[] credentials) {

		UserDTO dto = service.validate(credentials);
		return dto != null ? getToken(dto.getUserName(), dto.getPassword()) : null;

	}

	public String getToken(String username, String password) {
		String token = Jwts.builder().setId(password).setIssuedAt(new Date()).setIssuer(username)
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
		LOGGER.info("JWT token for user {} is {}", username, token);
		return token;

	}

}
