package com.estockmarket.user;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

public class UserHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

	private AmazonDynamoDB db = AmazonDynamoDBClientBuilder.defaultClient();
	private String DYNAMODB_TABLE_NAME = "User";
	private static final Logger LOG = Logger.getLogger(UserHandler.class.getName());

	public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent apiGatewayProxyRequestEvent,
			Context context) {
		// @Input API Input - {"userName": "rds","firstName": "mysql","lastName":"aurora"}
		// Lambda Input - {"body": "{\"userName\": \"rds\", \"firstName\":
		// \"mysql\",\"lastName\": \"aurora\"}"}
		APIGatewayProxyResponseEvent apiGatewayProxyResponseEvent = new APIGatewayProxyResponseEvent();
		String requestString = apiGatewayProxyRequestEvent.getBody();
		JSONParser parser = new JSONParser();
		JSONObject requestJsonObject = null;
		try {
			requestJsonObject = (JSONObject) parser.parse(requestString);
			LOG.info("RequestJsonObject" + requestJsonObject);
		} catch (ParseException e) {
			LOG.info("Parse error");
		}
		UserDTO dto = new UserDTO(requestJsonObject.get("userName").toString(),
				requestJsonObject.get("firstName").toString(), requestJsonObject.get("lastName").toString());

		LOG.info("User dto" + dto.toString());

		HashMap<String, AttributeValue> item_values = new HashMap<String, AttributeValue>();

		item_values.put("userName", new AttributeValue(dto.getUserName()));
		item_values.put("firstName", new AttributeValue(dto.getFirstName()));
		item_values.put("lastName", new AttributeValue(dto.getLastName()));

		db.putItem(DYNAMODB_TABLE_NAME, item_values);

		Map<String, String> responseBody = new HashMap<String, String>();
		responseBody.put("responseMessage", requestJsonObject.get("userName").toString());

		apiGatewayProxyResponseEvent
				.setHeaders(Collections.singletonMap("timeStamp", String.valueOf(System.currentTimeMillis())));
		apiGatewayProxyResponseEvent.setStatusCode(200);
		apiGatewayProxyResponseEvent.setBody(new JSONObject(responseBody).toJSONString());

		return apiGatewayProxyResponseEvent;
	}

}
