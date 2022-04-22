package com.stockmarket.company.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stockmarket.company.domain.Company;

@Component
public class CompanyService {

	@Autowired
	private ICompanyService companyService;

	public void add(Company company) {
		companyService.save(company);
	}

	public Company findByCompanyCode(String code) {
		return companyService.findByCode(code);
	}

	public void delete(String code) {
		Company company = findByCompanyCode(code);
		if (company == null) {
			throw new RuntimeException("Company " + code + " not found");
		}
		companyService.delete(company);
	}

	public List<Company> viewAll() {
		return companyService.findAll();
	}

}
