package com.stockmarket.stock.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.stockmarket.stock.domain.Stock;
import com.stockmarket.stock.dto.StockAggregateDTO;
import com.stockmarket.stock.dto.StockDTO;

@Component
public class StockService {

	@Autowired
	private IStockService stockService;

	@Autowired
	private MongoOperations mongoOperations;

	@Autowired
	private MongoTemplate mongoTemplate;

	public void add(Stock stock) {
		stockService.save(stock);
	}

	public Stock findByCompanyCode(String companyCode) {
		return stockService.findByCompanyCode(companyCode);
	}

	public void deleteByCompanyCode(String companyCode) {
		stockService.deleteByCompanyCode(companyCode);
	}

	public List<Stock> view(String companyCode, LocalDate startDate, LocalDate endDate) {
		Query query = new Query();
		query.addCriteria(getStockCriteria(companyCode, startDate, endDate));
		return mongoOperations.find(query, Stock.class);
	}

	private Criteria getStockCriteria(String companyCode, LocalDate startDate, LocalDate endDate) {
		Criteria criteria = Criteria.where("companyCode").is(companyCode);
		if (startDate != null && endDate != null) {
			criteria.andOperator(Criteria.where("date").gte(startDate).lte(endDate));
		}
		return criteria;
	}

	public List<StockAggregateDTO> aggregate(String companyCode, LocalDate startDate, LocalDate endDate) {
		MatchOperation matchStage = Aggregation.match(getStockCriteria(companyCode, startDate, endDate));
		GroupOperation group = Aggregation.group("companyCode").first("companyCode").as("companyCode").min("price")
				.as("minPrice").max("price").as("maxPrice").avg("price").as("avgPrice");

		Aggregation aggregation = Aggregation.newAggregation(matchStage, group);

		AggregationResults<StockAggregateDTO> output = mongoTemplate.aggregate(aggregation, Stock.class,
				StockAggregateDTO.class);
		return output != null ? output.getMappedResults() : null;
	}

}
