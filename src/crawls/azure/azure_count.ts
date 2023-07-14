import { ServiceBusAdministrationClient } from "@azure/service-bus";
import { QueueServiceClient } from "@azure/storage-queue";
import { BlobServiceClient } from "@azure/storage-blob";
import 'dotenv/config'

const getServiceBusQueueCount = async (queueName: string) => {
  const serviceBusAdminClient = new ServiceBusAdministrationClient(process.env.SERVICEBUS_ACCESSKEY);
  serviceBusAdminClient.getQueueRuntimeProperties
  const queue = await serviceBusAdminClient.getQueueRuntimeProperties(queueName);
  return queue.activeMessageCount;
}

const getQueueCount = async (queueName: string) => {
  const queueServiceClient = QueueServiceClient.fromConnectionString(`DefaultEndpointsProtocol=https;AccountName=${process.env.QUEUE_ACCOUNTNAME};AccountKey=${process.env.QUEUE_ACCOUNTKEY};EndpointSuffix=core.windows.net`);
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const properties = await queueClient.getProperties();
  const messageCount = properties.approximateMessagesCount;
  return messageCount;
}

const getBlobCount = async (folderName: string) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(`DefaultEndpointsProtocol = https; AccountName = ${process.env.STORAGE_ACCOUNTNAME}; AccountKey = ${process.env.STORAGE_ACCOUNTKEY}; EndpointSuffix = core.windows.net`);
  const containerClient = blobServiceClient.getContainerClient(process.env.QUEUE_CONTAINERNAME);
  const blobs = await containerClient.listBlobsFlat({ prefix: process.env.QUEUE_FIRSTFOLER + folderName });
  let blob_count = 0
  for await (const blob of blobs) {
    blob_count++;
  }
  return blob_count;
}

export { getServiceBusQueueCount, getQueueCount, getBlobCount }

