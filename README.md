## .env 파일 생성
```bash
DB_HOST= ADDRESS ex('localhost') </br>
DB_USER= USER ex('root') </br>
DB_PASS= PASSWORD ex('root') </br>
DB_PORT= PORT ex('3306')</br>
DB_DATABASE= DATABASENAME ex('test')
SERVICEBUS_ACCESSKEY = 'Azure serviceBus key'

STORAGE_ACCOUNTKEY = "Azure Storage Account Key"
STORAGE_ACCOUNTNAME = "Azure Storage Account Name"

QUEUE_ACCOUNTNAME = "Azure Queue Storage Name"
QUEUE_ACCOUNTKEY = 'Azure Queue Account Key'

BLOB_FIRSTFOLDER = 'collect_data/'
BLOB_CONTAINERNAME = 'collector-data'
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# build make dist Folder
$ npm run build

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
