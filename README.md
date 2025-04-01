<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node HTTP API on AWS

This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.

This template does not include any kind of persistence (database). For more advanced examples, check out the [serverless/examples repository](https://github.com/serverless/examples/) which includes Typescript, Mongo, DynamoDB and other examples.

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
serverless deploy
```

After running deploy, you should see output similar to:

```
Deploying "serverless-http-api" to stage "dev" (us-east-1)

✔ Service deployed to stack serverless-http-api-dev (91s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: serverless-http-api-dev-hello (1.6 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [HTTP API (API Gateway V2) event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api).

### Invocation

After successful deployment, you can call the created application via HTTP:

```
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to:

```json
{ "message": "Go Serverless v4! Your function executed successfully!" }
```

### Local development

The easiest way to develop and test your function is to use the `dev` command:

```
serverless dev
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

When you are done developing, don't forget to run `serverless deploy` to deploy the function to the cloud.

# Until GitHub README

GitHub README에 Until 블로그의 최신 글을 표시하는 서비스입니다.

## 소개

이 프로젝트는 GitHub README에 Until 블로그의 최신 글들을 SVG 이미지 형태로 표시해주는 서비스입니다.
AWS Lambda에 배포되어 실시간으로 블로그 글 정보를 가져와 SVG 이미지를 생성합니다.

![Until 블로그 최신 글](https://your-deployed-url.amazonaws.com/blog-posts-svg)

## 기능

- Until 블로그에서 최신 글 정보를 가져옵니다.
- 글 정보를 예쁜 SVG 이미지로 변환합니다.
- GitHub README에 삽입하기 쉽도록 이미지 URL을 제공합니다.
- 다양한 커스터마이징 옵션을 지원합니다.

## 사용 방법

GitHub README.md 파일에 다음과 같이 이미지를 삽입합니다:

```markdown
![Until 블로그 최신 글](https://your-deployed-url.amazonaws.com/blog-posts-svg)
```

### 커스터마이징 옵션

다양한 쿼리 파라미터를 사용하여 SVG 이미지를 커스터마이징할 수 있습니다:

| 파라미터 | 설명              | 기본값                 | 예시                      |
| -------- | ----------------- | ---------------------- | ------------------------- |
| `title`  | SVG 이미지의 제목 | "Until 블로그 최신 글" | `?title=내%20블로그%20글` |
| `max`    | 표시할 최대 글 수 | 5                      | `?max=3`                  |
| `theme`  | 테마 (light/dark) | "light"                | `?theme=dark`             |
| `css`    | 사용자 정의 CSS   | -                      | `?css=.header{fill:red;}` |

예시:

```markdown
![Until 블로그 최신 글](https://your-deployed-url.amazonaws.com/blog-posts-svg?max=3&theme=dark&title=My%20Latest%20Posts)
```

## 개발 환경 설정

### 요구 사항

- Node.js 20.x 이상
- Serverless Framework
- AWS 계정

### 설치

1. 저장소 클론

   ```bash
   git clone https://github.com/yourusername/until-github-readme.git
   cd until-github-readme
   ```

2. 의존성 설치

   ```bash
   npm install
   ```

3. 환경 변수 설정
   ```bash
   # .env 파일 생성
   echo "UNTIL_API_URL=your-until-api-url" > .env
   ```

### 로컬 실행

```bash
npm run dev
```

### 배포

```bash
# 개발 환경 배포
npm run deploy

# 프로덕션 환경 배포
npm run deploy:prod
```

## 프로젝트 구조

```
until-github-readme/
├── src/
│   ├── handlers/
│   │   ├── blog-posts-handler.ts   # 블로그 포스트 API 핸들러
│   │   └── svg-handler.ts          # SVG 생성 핸들러
│   ├── services/
│   │   ├── blog-service.ts         # 블로그 포스트 관련 서비스
│   │   └── svg-service.ts          # SVG 생성 서비스
│   └── types/
│       └── blog.ts                 # 타입 정의
├── serverless.yml                  # Serverless 설정
├── package.json                    # 의존성 및 스크립트
└── tsconfig.json                   # TypeScript 설정
```

## 라이선스

ISC 라이선스
