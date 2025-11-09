# Process of water filtering

  💻 : Angular(JavaScript)
  ☁️ : AWS(API Gatway / Step Functions / Lambda / DynamoDB)

  ![alt text](https://github.com/fabiose81/water-filter/blob/master/water-filter.jpg?raw=true)


### AWS Step Functions Workflow

  ![alt text](https://github.com/fabiose81/water-filter/blob/master/step_functions_workflow_01.png?raw=true)
  ![alt text](https://github.com/fabiose81/water-filter/blob/master/step_functions_workflow_02.png?raw=true)
  ![alt text](https://github.com/fabiose81/water-filter/blob/master/step_functions_workflow_03.png?raw=true)
  ![alt text](https://github.com/fabiose81/water-filter/blob/master/step_functions_workflow_04.png?raw=true)


### AWS Lambda

    import random
    import uuid

    def lambda_handler(event, context): 
        percent_dirt = int(event['data']['percent_dirt']) - random.randint(3, 10) 
        id = event['data']['id']

        result = {
            'id': id,
            'step': 'COAGULATION',
            'percent_dirt': 90 if percent_dirt <= 90 else percent_dirt
        }
        
        return result


### For Angular

In angular folder create a file .env and insert:

    API_URL = {your api gateway url}

### Development server

To start a local development server, run:

    ng serve

