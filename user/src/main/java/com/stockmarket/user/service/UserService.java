package com.stockmarket.user.service;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.stockmarket.user.dto.UserDTO;


@Component
public class UserService {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Value("${query.save.user}")
	private String querySaveUser;

	@Value("${query.fetch.user}")
	private String queryFetchUser;

	@Value("${awslambda.url}")
	private String messagePublishURL;
	private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

	public int saveUser(UserDTO user) {
		int status = 0;
		try {
			status = jdbcTemplate.update(querySaveUser, new Object[] { user.getUserName(), user.getFirstName(),
					user.getLastName(), user.getEmail(), user.getPassword(), String.valueOf(user.getIsActive()) });
		} catch (DataIntegrityViolationException e) {
			throw new RuntimeException("User already exists");
		}
		publishMessage(user);
		return status;
	}

	public UserDTO validate(String[] credentials) {

		if (credentials == null || credentials.length != 2) {
			throw new RuntimeException("Credentials not available");
		}

		UserDTO dto = jdbcTemplate.queryForObject(queryFetchUser, new RowMapper<UserDTO>() {

			@Override
			public UserDTO mapRow(ResultSet rs, int rowNum) throws SQLException {

				return new UserDTO(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4),
						rs.getString(5).charAt(0),rs.getString(6));
			}
		}, credentials[0]);

		if (dto == null) {
			throw new RuntimeException("User not found");
		}

		if (dto.getPassword().equals(credentials[1])) {
			return dto;
		}

		return null;

	}
	private void publishMessage(Object object) {
		new Thread() {
			public void run() {
				try {
					RestTemplate template = new RestTemplate();
					String response = template.postForObject(messagePublishURL, object, String.class);
					LOGGER.debug("Message sent successfully {}", response);
				} catch (Exception e) {
					e.printStackTrace();
					LOGGER.error("Message sending failed", e.getCause());
				}
			}
		}.start();
	}
}
