import express, { Express, Request, Response } from 'express';
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';

const app: Express = express();
const port = 3003;

/*
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});
*/

app.listen(port, async () => { 
  const client = new SQSClient({
    region: process.env.REGION,
    endpoint: process.env.SQS_ENDPOINT,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
  });
  const out = await client.send(
    new ReceiveMessageCommand({
      QueueUrl: '/12345/',
      WaitTimeSeconds: 10,
    })
  );

  console.log(`results: ${JSON.stringify(out)}`);

  if (out.Messages === undefined || out.Messages.length === 0) {
    return;
  }

  // Process the message here.

  await client.send(new DeleteMessageCommand({
    QueueUrl: '/12345/',
    ReceiptHandle: out.Messages[0].ReceiptHandle,
  }));
});
