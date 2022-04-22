package com.stockmarket.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockAggregateDTO {
	
	private String companyCode;
	private Double minPrice;
	private Double maxPrice;
	private Double avgPrice;
	

}
