package com.stockmarket.company.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Company {
	@Id
	private String id;
	private String code;
	private String name;
	private String ceo;
	private Double turnOver;
	private String website;
	private String stockExchange;
}
