package com.estockmarket.gateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class ApiGatewayController {

	private Logger LOGGER = LoggerFactory.getLogger(ApiGatewayController.class);

	@GetMapping
	public String validate() {

		LOGGER.debug("Debug ApiGatewayController status ok");
		LOGGER.info("Info ApiGatewayController status ok");
		System.out.println("SOP ApiGatewayController status ok");
		return "Ok...............";
	}

}
