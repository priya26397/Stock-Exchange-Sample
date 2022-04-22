package com.stockmarket.stock.controller;

import java.time.LocalDate;
import java.util.Date;
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

import com.stockmarket.stock.domain.Stock;
import com.stockmarket.stock.dto.StockAggregateDTO;
import com.stockmarket.stock.dto.StockDTO;
import com.stockmarket.stock.service.StockService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/${api.version}/market/stock")
@Api
public class StockController {

	@Autowired
	private StockService service;

	@Autowired
	private ModelMapper mapper;

	@PostMapping("/add")
	@ApiOperation(value="Add a new stock for the company")
	public void add(@RequestBody StockDTO stockDTO) {

		Stock stock = (Stock) map(stockDTO, Stock.class);
		stock.setDate(new Date());
		service.add(stock);
	}

	@DeleteMapping("/{companyCode}")
	@ApiOperation(value="Delete stock for the company")
	public void delete(@PathVariable String companyCode) {

		service.deleteByCompanyCode(companyCode);
	}

	@GetMapping("/{companyCode}/{startDate}/{endDate}")
	@ApiOperation(value="Find the stocks for the company within a period")
	public List<StockDTO> viewAll(@PathVariable String companyCode,
			@PathVariable String startDate,
			@PathVariable String endDate) {

		return service.view(companyCode, LocalDate.parse(startDate), LocalDate.parse(endDate)).stream().map(comp -> {
			return (StockDTO) mapper.map(comp, StockDTO.class);
		}).collect(Collectors.toList());
	}
	
	@GetMapping("/aggregate/{companyCode}/{startDate}/{endDate}")
	@ApiOperation(value="Find the aggregation of price stocks for the company within a period")
	public List<StockAggregateDTO> aggregate(@PathVariable String companyCode,
			@PathVariable String startDate,
			@PathVariable String endDate) {

		return service.aggregate(companyCode, LocalDate.parse(startDate), LocalDate.parse(endDate));
	}

	@SuppressWarnings("unchecked")
	private Object map(Object object, @SuppressWarnings("rawtypes") Class clazz) {
		return object != null ? mapper.map(object, clazz) : null;
	}

}
