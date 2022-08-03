import AWS from 'aws-sdk';

describe("", () => {
  it("", () => {
    const config = {
      endpoint: new AWS.Endpoint('http://localhost:9324'),
      accessKeyId: 'na',
      secretAccessKey: 'na',
      region: 'REGION'
    }
    const sqs = new AWS.SQS(config);
    
    var params = {
      // Remove DelaySeconds parameter and value for FIFO queues
      DelaySeconds: 10,
      MessageAttributes: {
        "Title": {
          DataType: "String",
          StringValue: "The Whistler"
        },
        "Author": {
          DataType: "String",
          StringValue: "John Grisham"
        },
        "WeeksOn": {
          DataType: "Number",
          StringValue: "6"
        }
      },
      MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
      // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
      // MessageGroupId: "Group1",  // Required for FIFO queues
      QueueUrl: "SQS_QUEUE_URL"
    };
    console.log('here');
    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error---------", err);
      } else {
        console.log("Success------------", data.MessageId);
      }
    });
  });
});