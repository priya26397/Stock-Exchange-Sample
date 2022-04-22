package com.stockmarket.company.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDTO {
	
	private String code;
	private String name;
	private String ceo;
	private Double turnOver;
	private String website;
	private String stockExchange;

}
