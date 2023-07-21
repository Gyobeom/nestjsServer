import { ServiceBusAdministrationClient } from "@azure/service-bus";
import { QueueServiceClient } from "@azure/storage-queue";
import { BlobServiceClient } from "@azure/storage-blob";
import 'dotenv/config'

const getServiceBusQueueCount = async (queueName: string) => {
  try {
    let queueChangeName = '';
    if (queueName.includes('_')) {
      let temp = queueName.replace('_', '-');
      queueChangeName = `dmap-progress-${temp}`;
    }
    else
      queueChangeName = `dmap-progress-${queueName}`;
    const serviceBusAdminClient = new ServiceBusAdministrationClient(process.env.SERVICEBUS_ACCESSKEY);
    serviceBusAdminClient.getQueueRuntimeProperties
    const queue = await serviceBusAdminClient.getQueueRuntimeProperties(queueChangeName);
    return queue.activeMessageCount;
  } catch (err) {
    if (err.code === "InvalidResourceName" || err.code === "MessageEntityNotFoundError") {
      return 0;
    } else {
      console.log(err);
      throw err
    }
  }
}

const getQueueCount = async (queueName: string) => {
  try {
    let queueChangeName = '';
    if (queueName.includes('_')) {
      let temp = queueName.replace('_', '-');
      queueChangeName = `dmap-request-${temp}`;
    }
    else
      queueChangeName = `dmap-request-${queueName}`;
    const queueServiceClient = QueueServiceClient.fromConnectionString(`DefaultEndpointsProtocol=https;AccountName=${process.env.QUEUE_ACCOUNTNAME};AccountKey=${process.env.QUEUE_ACCOUNTKEY};EndpointSuffix=core.windows.net`);
    const queueClient = queueServiceClient.getQueueClient(queueChangeName);
    const properties = await queueClient.getProperties();
    const messageCount = properties.approximateMessagesCount;

    return messageCount;
  } catch (err) {
    if (err.code === "InvalidResourceName" || err.code === 'QueueNotFound') {
      return 0;
    } else {
      console.log(err);
      throw err
    }
  }
}

const getBlobCount = async (folderName: string) => {
  try {

    const blobServiceClient = BlobServiceClient.fromConnectionString(`DefaultEndpointsProtocol=https;AccountName=${process.env.STORAGE_ACCOUNTNAME};AccountKey=${process.env.STORAGE_ACCOUNTKEY};EndpointSuffix=core.windows.net`);
    const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_CONTAINERNAME);
    const blobs = await containerClient.listBlobsFlat({ prefix: process.env.BLOB_FIRSTFOLDER + folderName });
    let blob_count = 0
    for await (const blob of blobs) {
      blob_count++;
    }
    return blob_count;
  } catch (err) {
    console.log(err);
  }

}

export { getServiceBusQueueCount, getQueueCount, getBlobCount }

