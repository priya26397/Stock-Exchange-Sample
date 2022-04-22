package com.stockmarket.stock.dto;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class StockDTO {
	
	private String companyCode;
	private Double price;
	private Date date;
	public StockDTO(String companyCode, Double price, Date date) {
		super();
		this.companyCode = companyCode;
		this.price = price;
		this.date = date;
	}

	public StockDTO() {
		// TODO Auto-generated constructor stub
	}

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
}


