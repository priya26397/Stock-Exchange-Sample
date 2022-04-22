package com.stockmarket.stock.service;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.stockmarket.stock.domain.Stock;

public interface IStockService extends MongoRepository<Stock, String> {
	
	public Stock findByCompanyCode(String companyCode);

	public void deleteByCompanyCode(String companyCode);

}
