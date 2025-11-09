# Process of water filtering

  💻 : Angular(JavaScript)
  ☁️ : AWS(API Gatway / Step Functions / Lambda / DynamoDB)

  https://github.com/user-attachments/assets/9ffd3f1e-5085-4da7-9068-e8862dee4b3e

  ![alt text](https://github.com/fabiose81/water-filter/blob/master/water-filter.jpg?raw=true)


### AWS Step Functions Workflow

![alt text](https://github.com/fabiose81/water-filter/blob/master/step_functions_workflow_01.png?raw=true)
![alt text](https://github.com/fabiose81/water-filter/blob/master/step_functions_workflow_02.png?raw=true)
![alt text](https://github.com/fabiose81/water-filter/blob/master/step_functions_workflow_03.png?raw=true)
![alt text](https://github.com/fabiose81/water-filter/blob/master/step_functions_workflow_04.png?raw=true)

    {
        "Comment": "Check Lambda result using JSONPath",
        "StartAt": "coagulation",
        "States": {
            "coagulation": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-coagulation-step:$LATEST",
                "Payload.$": "$"
            },
            "ResultSelector": {
                "data.$": "$.Payload"
            },
            "ResultPath": "$",
            "Next": "logCoagulationResult"
            },
            "logCoagulationResult": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-log-step:$LATEST",
                "Payload": {
                "data.$": "$.data"
                }
            },
            "ResultPath": "$",
            "Next": "was the water filtered successfully on the coagulation process?"
            },
            "was the water filtered successfully on the coagulation process?": {
            "Type": "Choice",
            "Choices": [
                {
                "Variable": "$.Payload.percent_dirt",
                "NumericGreaterThan": 90,
                "Next": "restartCoagulationFilterProcess"
                }
            ],
            "Default": "step one - step two"
            },
            "restartCoagulationFilterProcess": {
            "Type": "Pass",
            "Parameters": {
                "data.$": "$.Payload"
            },
            "ResultPath": "$",
            "Next": "coagulation"
            },
            "step one - step two": {
            "Type": "Wait",
            "Seconds": 20,
            "Next": "flocculation"
            },
            "flocculation": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-flocculation-step:$LATEST",
                "Payload.$": "$"
            },
            "ResultSelector": {
                "data.$": "$.Payload"
            },
            "ResultPath": "$",
            "Next": "logFlocculationResult"
            },
            "logFlocculationResult": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-log-step:$LATEST",
                "Payload": {
                "data.$": "$.data"
                }
            },
            "ResultPath": "$",
            "Next": "was the water filtered successfully on the flocculation process?"
            },
            "was the water filtered successfully on the flocculation process?": {
            "Type": "Choice",
            "Choices": [
                {
                "Variable": "$.Payload.percent_dirt",
                "NumericGreaterThan": 85,
                "Next": "restartFlocculationFilterProcess"
                }
            ],
            "Default": "step two - step three"
            },
            "restartFlocculationFilterProcess": {
            "Type": "Pass",
            "Parameters": {
                "data.$": "$"
            },
            "ResultPath": "$",
            "Next": "flocculation"
            },
            "step two - step three": {
            "Type": "Wait",
            "Seconds": 20,
            "Next": "sedimentation"
            },
            "sedimentation": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-sedimentation-step:$LATEST",
                "Payload.$": "$"
            },
            "ResultSelector": {
                "data.$": "$.Payload"
            },
            "ResultPath": "$",
            "Next": "logSedimentationResult"
            },
            "logSedimentationResult": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-log-step:$LATEST",
                "Payload": {
                "data.$": "$.data"
                }
            },
            "ResultPath": "$",
            "Next": "was the water filtered successfully on the sedimentation process?"
            },
            "was the water filtered successfully on the sedimentation process?": {
            "Type": "Choice",
            "Choices": [
                {
                "Variable": "$.Payload.percent_dirt",
                "NumericGreaterThan": 50,
                "Next": "restartSedimentationFilterProcess"
                }
            ],
            "Default": "step three - step four"
            },
            "restartSedimentationFilterProcess": {
            "Type": "Pass",
            "Parameters": {
                "data.$": "$"
            },
            "ResultPath": "$",
            "Next": "sedimentation"
            },
            "step three - step four": {
            "Type": "Wait",
            "Seconds": 20,
            "Next": "filtration"
            },
            "filtration": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-filtration-step:$LATEST",
                "Payload.$": "$"
            },
            "ResultSelector": {
                "data.$": "$.Payload"
            },
            "ResultPath": "$",
            "Next": "logFiltrationResult"
            },
            "logFiltrationResult": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-log-step:$LATEST",
                "Payload": {
                "data.$": "$.data"
                }
            },
            "ResultPath": "$",
            "Next": "was the water filtered successfully on the filtration process?"
            },
            "was the water filtered successfully on the filtration process?": {
            "Type": "Choice",
            "Choices": [
                {
                "Variable": "$.Payload.percent_dirt",
                "NumericGreaterThan": 15,
                "Next": "restartFiltrationFilterProcess"
                }
            ],
            "Default": "step four - step five"
            },
            "restartFiltrationFilterProcess": {
            "Type": "Pass",
            "Parameters": {
                "data.$": "$"
            },
            "ResultPath": "$",
            "Next": "filtration"
            },
            "step four - step five": {
            "Type": "Wait",
            "Seconds": 20,
            "Next": "disinfection"
            },
            "disinfection": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-disinfection-step:$LATEST",
                "Payload.$": "$"
            },
            "ResultSelector": {
                "data.$": "$.Payload"
            },
            "ResultPath": "$",
            "Next": "logDisinfectionResult"
            },
            "logDisinfectionResult": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-log-step:$LATEST",
                "Payload": {
                "data.$": "$.data"
                }
            },
            "ResultPath": "$",
            "Next": "was the water filtered successfully on the disinfection process?"
            },
            "was the water filtered successfully on the disinfection process?": {
            "Type": "Choice",
            "Choices": [
                {
                "Variable": "$.Payload.percent_dirt",
                "NumericGreaterThan": 10,
                "Next": "restartDisinfectionFilterProcess"
                }
            ],
            "Default": "step five - step six"
            },
            "restartDisinfectionFilterProcess": {
            "Type": "Pass",
            "Parameters": {
                "data.$": "$"
            },
            "ResultPath": "$",
            "Next": "disinfection"
            },
            "step five - step six": {
            "Type": "Wait",
            "Seconds": 20,
            "Next": "ph-correction"
            },
            "ph-correction": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-ph-correction-step:$LATEST",
                "Payload.$": "$"
            },
            "ResultSelector": {
                "data.$": "$.Payload"
            },
            "ResultPath": "$",
            "Next": "logPhCorrectionResult"
            },
            "logPhCorrectionResult": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-log-step:$LATEST",
                "Payload": {
                "data.$": "$.data"
                }
            },
            "ResultPath": "$",
            "Next": "was the water filtered successfully on the ph correction process?"
            },
            "was the water filtered successfully on the ph correction process?": {
            "Type": "Choice",
            "Choices": [
                {
                "Variable": "$.Payload.percent_dirt",
                "NumericGreaterThan": 5,
                "Next": "restartPhCorrectionFilterProcess"
                }
            ],
            "Default": "step six - step seven"
            },
            "restartPhCorrectionFilterProcess": {
            "Type": "Pass",
            "Parameters": {
                "data.$": "$"
            },
            "ResultPath": "$",
            "Next": "ph-correction"
            },
            "step six - step seven": {
            "Type": "Wait",
            "Seconds": 20,
            "Next": "fluoridation"
            },
            "fluoridation": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-fluoridation-step:$LATEST",
                "Payload.$": "$"
            },
            "ResultSelector": {
                "data.$": "$.Payload"
            },
            "ResultPath": "$",
            "Next": "logFluoridationResult"
            },
            "logFluoridationResult": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "Parameters": {
                "FunctionName": "arn:aws:lambda:us-east-1:{your aws id}:function:water-filtering-log-step:$LATEST",
                "Payload": {
                "data.$": "$.data"
                }
            },
            "ResultPath": "$",
            "Next": "was the water filtered successfully on the fluoridation process?"
            },
            "was the water filtered successfully on the fluoridation process?": {
            "Type": "Choice",
            "Choices": [
                {
                "Variable": "$.Payload.percent_dirt",
                "NumericGreaterThan": 0,
                "Next": "restartFluoridationFilterProcess"
                }
            ],
            "Default": "success"
            },
            "restartFluoridationFilterProcess": {
            "Type": "Pass",
            "Parameters": {
                "data.$": "$"
            },
            "ResultPath": "$",
            "Next": "fluoridation"
            },
            "success": {
            "Type": "Succeed"
            }
        }
    }

### AWS Lambda :: Code in python to represent one of filtering stages

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

### AWS Lambda :: Code in nodejs to represent one of filtering stages

    import crypto from 'crypto';

        export const handler = async (event) => {
            const payload = (event?.data?.Payload || event?.Payload);
            const id = payload?.id;
        
            let percentDirt = parseInt(payload?.percent_dirt) - crypto.randomInt(2, 5)

            return  {
                'id': id,
                'step': 'FLUORIDATION',
                'percent_dirt': percentDirt <= 0 ? 0 : percentDirt
            }
        };

### AWS Lambda :: Code in python to save/update filtering stage into DynamoDB

    import json
    import boto3
    from boto3.dynamodb.conditions import Key

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table('water-filtering-step')

    def put_item(id, step, percent_dirt):
        status = [{
            'step' : step,
            'percent_dirt' : percent_dirt
        }]

        table.put_item(
            Item={
                'id': id,
                'status': json.dumps(status),
                'finished' : False
            })

    def update_item(response, id, step, percent_dirt):
        item = response['Item']
        status_str = item.get('status', [])
        status_list = json.loads(status_str)
        status_list.append({'step' : step, 'percent_dirt' : percent_dirt})
        finished = True if percent_dirt == 0 else False

        table.update_item(
            Key={
                'id': id
            },
            UpdateExpression='SET #status = :status, #finished = :finished',
            ExpressionAttributeNames = {
                '#status': 'status',
                '#finished': 'finished'
            },
            ExpressionAttributeValues={
                ':status': json.dumps(status_list),
                ':finished':finished
            },)
    

    def lambda_handler(event, context):
        id = event['data']['id']
        step = event['data']['step']
        percent_dirt = event['data']['percent_dirt']

        response = table.get_item(Key={'id': id})
    
        if 'Item' not in response:
            put_item(id, step, percent_dirt)
        else:
            update_item(response, id, step, percent_dirt)

        return {
            'id': id,
            'percent_dirt': percent_dirt
        }

### AWS Lambda :: Code in python to list/get filtering stage from DynamoDB

    import json
    import boto3
    from boto3.dynamodb.conditions import Key, Attr

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table('water-filtering-step')

    def lambda_handler(event, context):
        id = event.get('id')
    
        if id:   
            result = table.get_item(Key={
                'id': id
            })

            return parse_status_field(result.get('Item'))
        else: 
            filter_expression = Attr('finished').eq(True)
            result = table.scan(FilterExpression=Attr('finished').eq(True))
            items = result.get('Items', [])
            items = [parse_status_field(item) for item in items]
            return items

    def parse_status_field(item):
        if 'status' in item and isinstance(item['status'], str):
            try:
                item['status'] = json.loads(item['status'])
            except json.JSONDecodeError:
                pass  
        return item

### For AWS API Gateway

    Create a POST method and in Integration request settings add the mapping Mapping templates:

    {
        "input":"{\"data\": {\"percent_dirt\": \"100\", \"id\": \"$context.requestId\"}}",
        "name":"$context.requestId",
        "stateMachineArn":"arn:aws:states:us-east-1:{your aws id}:stateMachine:water-filtering"
    } 

    Create a GET method and in Integration request settings add the mapping Mapping templates:

    {     
      "id": "$input.params('id')",
      "finished": "$input.params('finished')"
    }

### For Angular

In angular folder create a file .env and insert:

    API_URL = {your api gateway url}

### Development server

To start a local development server, run:

    ng serve
