## APP URL  ports (Can be run as local or docker or kubernetes service) 
ZuulService - 7073, UserService - 7070, StockService - 7072,CompanyService - 7071, UI - 4200,RabbitMQService - 5672, Prometheus - 3001,Grafana - 3000

## APP URL for ECS
http://lb-404463707.ap-southeast-1.elb.amazonaws.com/ (LB with 2 instances), Login - Username - rd, Password - 123

## APP URL for API gateway with dynamo db
With COgnito AUthentication - https://cw2c5xfcn9.execute-api.ap-southeast-1.amazonaws.com/dev-key/userswithkey
Without authentication - https://arrwduw7ql.execute-api.ap-southeast-1.amazonaws.com/dev/users


