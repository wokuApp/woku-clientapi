# woku client API Documentation

This documentation explains the logic of the Rest API for creating and rating wokus in your own application.

## Considerations

The `woku-clientapi` is documented using Swagger in NestJS. The documentation can be found at [https://clientapi.woku.app/documentation](https://clientapi.woku.app/documentation)

## Introduction

### General Description

This is a REST API service that enables company owners within the woku service to create wokus and other functions.

#### Base URL

`https://clientapi.woku.app`

## Authentication

### Type of Authentication

Company Key.

### Obtaining and Using Keys

A Company Key is provided to the company owner in woku. This key must be included in the headers of API requests. The woku client interface can be accessed at `https://fresh.woku.app`

## Endpoint to Create woku

### URL

`https://clientapi.woku.app/wokus/create-woku`

### Method

POST

### Headers

- `Content-Type: application/json`
- `Authorization: Bearer <Company-Key>`

### Body Request

```json
{
  "description": "Docker Training",
  "fileUrl": "https://wokudevfiles.blob.core.windows.net/wokus/cd7f9cf3-c2e4-4ff0-8a96-19ff813f569e1699220394936-image.webp",
  "secondaryKey": "17614778-3",
  "clientEmail": "pedro@empresa.com"
}
```

### Expected Responses

- `201` -> Created woku object
- `500 Internal server error`

### DTO of the Body

#### CreateWokuDTO

- **description\*** (string)
  - Example: Description of the woku
  - The description cannot have fewer than 3 characters and cannot exceed a maximum of 140 characters.
- **fileUrl\*** (string)
  - This field must be a publicly accessible URL to an image or video file. For videos, prefer files with .mp4 extension.
- **secondaryKey** (string)
  - This is an optional field. This key must be provided by the company owner to a company folder manually in the woku client interface.
- **clientEmail** (string)
  - This field must contain a valid email.

## Endpoint to Create woku with Form Data

### URL

`https://clientapi.woku.app/wokus/create-woku-form-data`

### Method

POST

### Headers

- `Content-Type: application/json`
- `Authorization: Bearer <Company-Key>`

### Form Data Request

- **description\*** (text)
  - Example: Description of the woku
  - The description cannot have fewer than 3 characters and cannot exceed a maximum of 140 characters.
- **file\*** ($binary)
  - This field must be an image or video file. For videos, prefer files with .mp4 extension.
- **secondaryKey** (text)
  - This is an optional field. This key must be provided by the company owner to a company folder manually in the woku client interface.
- **clientEmail** (text)
  - This field must contain a valid email. This field is optional.

### Expected Responses

- `201` -> Created woku object
- `500 Internal server error`

## Endpoint to Get Review

### URL

`https://clientapi.woku.app/wokus/review/{wokuId}`

### Method

GET

### Headers

- `Content-Type: application/json`
- `Authorization: Bearer <Company-Key>`

### Params

- **wokuId\*** (text)
  - Example: 65348875f3a876254aa82d5e
  - woku ID

### Expected Responses

- `200` -> Created woku review object
- `500 Internal server error`

## Endpoint to Create Textnote

### URL

`https://clientapi.woku.app/wokus/create-textnote`

### Method

POST

### Headers

- `Content-Type: application/json`
- `Authorization: Bearer <Company-Key>`

### Body Request

```json
{
  "wokuId": "65348875f3a876254aa82d5e",
  "qualification": 4,
  "description": "Very good the Docker course!",
  "clientEmail": "pedro@empresa.com",
  "anonymous": false
}
```

### Expected Responses

- `201` -> Created Textnote object
- `500 Internal server error`

### DTO of the Body

#### CreateTextnoteDTO

- **wokuId\*** (string)
  - Example: 65348875f3a876254aa82d5e
  - The description cannot have fewer than 3 characters and cannot exceed a maximum of 140 characters.
- **qualification\*** (number)
  - Example: 4
  - This field must contain an integer between 1 and 5.
  - **description\*** (string)
  - Example: Very good the Docker course!
  - This field must be a string; it is the written feedback that the client leaves for the woku.
- **clientEmail** (string)
  - Example: pedro@empresa.com
  - This field is the email of the client providing the feedback. This field is optional. If this field is not filled out, the anonymous field must be marked as true.

## Endpoint to Create Voicemail with Form Data

### URL

`https://clientapi.woku.app/wokus/create-voicemail`

### Method

POST

### Headers

- `Content-Type: application/json`
- `Authorization: Bearer <Company-Key>`

### Form Data Request

- **file\*** ($binary)
  - This field must be a publicly accessible URL to an image or video file.
- **wokuId\*** (text)
  - This field is the ID of a woku in text format.
- **qualification\*** (text)
  - This field is a text that represents an integer between 1 and 5.
- **clientEmail** (text)
  - This field is the email of the client providing the feedback. This field is optional. If this field is not filled out, the anonymous field must be marked as true.
- **anonymous** (text)
  - This field is a string that represents a boolean, so the only options are true or false. This field is optional. When this field is a true, sends anonymous feedback. When this field is omitted or marked false, the client email must be provided in the clientEmail field.

### Expected Responses

- `201` -> Created voicemail object
- `500 Internal server error`

## Contact and Support

### Contact

- Diego Orrego Brito, CTO of woku
- Email: diego@woku.app (Please include the company name in the subject and mention the API).

## Common Errors and Solutions

### Inaccessible File URL

Ensure that the URL of the provided file is publicly accessible. Our service needs to be able to access the file to create the woku.

### Secondary Key

The secondary key is for creating a Folder where the woku will be contained. If a secondary key is not provided, the woku will remain at the Company level. Two Folders with the same secondary key cannot exist within a Company.
