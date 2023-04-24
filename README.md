# Serverless Boilerplate

- [Preamble](#preamble)
- [Stack](#stack)
- [Install](#install)
- [Test](#test)

## Preamble

## Stack

- Serverless
- AWS SDK
- TypeScript
- Jest
- Prettier
- ESLint
- Webpack

## Install

Make sure to add an AWS profile as **serverless-boilerplate** with:

```
serverless config credentials \
--provider aws \
--key AKIAIOSFODNN7EXAMPLE \
--secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

For more datails please take a look on [Serverless Oficial Documentation](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) <br /> <br />

Installing the required Serverless plugins

```
serverless plugin install -n serverless-webpack &&
serverless plugin install -n serverless-offline
```

<br />

Installing the packages dependencies

```
npm i
```

<br />

Setting the local environment

```
cp env.yml.example env.yml && cp .env.example .env
```

Setting a `.env` file:

```
MAIN_TABLE=dev-maintable
AWS_DYNAMO_ACCESS_KEY=AKIAIO6S8E3BA1EXAMPLE
AWS_DYNAMO_SECRET_KEY=xA2GwIdjqfm4Jc97DDbFRa8rOwD2pnfrEXAMPLEKEY
```

_All interactions on dev / test environment reflect changes on database, so be aware when setting the **MAIN_TABLE** value_

<br />

The **env.yml** is responsible for setup your lambda environment variables, make sure to setup properly the env.yml file considering scenarios such as dev, stage and prod like:

```yml
default:
  MAIN_TABLE: dev-maintable
  AWS_DYNAMO_ACCESS_KEY: M15AV78L0FDA6AMYJF6V
  AWS_DYNAMO_SECRET_KEY: 2da64e95-6e78-4776-b2d7-1ff920ba4a3b
  REGION: eu-west-1
dev:
  MAIN_TABLE: dev-maintable
  AWS_DYNAMO_ACCESS_KEY: M15AV78L0FDA6AMYJF6V
  AWS_DYNAMO_SECRET_KEY: 2da64e95-6e78-4776-b2d7-1ff920ba4a3b
  REGION: eu-west-1
stage:
  MAIN_TABLE: stage-triangle
  AWS_DYNAMO_ACCESS_KEY: M15AV78L0FDA6AMYJF6V
  AWS_DYNAMO_SECRET_KEY: 2da64e95-6e78-4776-b2d7-1ff920ba4a3b
  REGION: eu-west-1
prod:
  MAIN_TABLE: prod-triangle
  AWS_DYNAMO_ACCESS_KEY: M15AV78L0FDA6AMYJF6V
  AWS_DYNAMO_SECRET_KEY: 2da64e95-6e78-4776-b2d7-1ff920ba4a3b
  REGION: eu-west-1
```

Finally you need to deploy at least the dev database to be able to run the application locally and test cases

<table class="demo">
 <thead>
 <tr>
  <th>Command</th>
  <th>Stage</th>
 </tr>
 </thead>
 <tbody>
 <tr>
  <td><strong>deploy:database:dev</strong></td>
  <td>dev</td>
 </tr>
 <tr>
  <td><strong>deploy:database:stage</strong></td>
  <td>stage</td>
 </tr>
 <tr>
  <td><strong>deploy:database:prod</strong></td>
  <td>production</td>
 </tr>
 </tbody>
</table>

To deploy an initial database for dev environment:

```
npm run deploy:database:dev
```

## Test

You can run test cases easily using Jest

<br />

To test with coverage results (you can see the results on `test/coverage`):

```
npm run test:coverage
```

<br />

To test without coverage:

```
npm run test
```
