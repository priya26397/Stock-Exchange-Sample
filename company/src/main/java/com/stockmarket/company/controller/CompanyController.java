package com.stockmarket.company.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockmarket.company.domain.Company;
import com.stockmarket.company.dto.CompanyDTO;
import com.stockmarket.company.service.CompanyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/${api.version}/market/company")
@Api(value = "Company", tags = {
		"Company" }, consumes = "application/json", produces = "application/json", protocols = "http,https", description = "REST API for Company services")
public class CompanyController {

	@Autowired
	private CompanyService service;

	@Autowired
	private ModelMapper mapper;

	@PostMapping("/register")
	@ApiOperation(value = "Add a new  company for the user.", tags = { "Company" }, nickname = "AddUser", code = 200)
	public void register(@RequestBody CompanyDTO companyDTO) {

		Company company = (Company) map(companyDTO, Company.class);
		service.add(company);
	}

	@GetMapping("/{code}")
	@ApiOperation(value = "Get company details  for the company code.", tags = {
			"Company" }, response = CompanyDTO.class)
	public CompanyDTO view(@PathVariable String code) {

		Company company = service.findByCompanyCode(code);
		return (CompanyDTO) map(company, CompanyDTO.class);
	}

	@DeleteMapping("/{code}")
	@ApiOperation(value = "Delete the existing company for the company code", tags = { "Company" })
	public void delete(@PathVariable String code) {

		service.delete(code);
	}

	@GetMapping
	@ApiOperation(value = "View all companies", tags = { "Company" })
	public List<CompanyDTO> viewAll() {

		return service.viewAll().stream().map(comp -> {
			return (CompanyDTO) mapper.map(comp, CompanyDTO.class);
		}).collect(Collectors.toList());
	}

	@SuppressWarnings("unchecked")
	private Object map(Object object, @SuppressWarnings("rawtypes") Class clazz) {
		return object != null ? mapper.map(object, clazz) : null;
	}

}
