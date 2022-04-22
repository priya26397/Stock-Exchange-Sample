package com.stockmarket.company.service;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.stockmarket.company.domain.Company;

public interface ICompanyService extends MongoRepository<Company, String> {
	
	public Company findByCode(String companyCode);

}
