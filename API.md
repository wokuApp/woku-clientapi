# **API Documentation**

This documentation serves as a guide to integrating the woku API into your applications.

## **Considerations**

The woku API is documented using **Swagger**. You can access the interactive documentation at: [https://clientapi.woku.app/documentation](https://clientapi.woku.app/documentation)

## **Introduction**

The woku API allows you to efficiently manage **wokus** through three key functions: **create**, **share**, and **rate** wokus. These functionalities enable seamless integration of review collection within your application, enhancing customer interaction and improving user experience.

Here are the main functions available:

1. **Create wokus:** Automate the generation of new wokus from your application, enabling users to leave reviews and feedback without manual intervention.
2. **Share wokus:** Easily share wokus with your customers or teams, providing visibility into reviews directly from your platform.
3. **Rate wokus:** Allow users to score services or products based on their experience, capturing valuable metrics about customer satisfaction.

Each of these functions is designed for easy integration via HTTP requests, ensuring secure and agile management of wokus.

## **Base URL**

- [https://clientapi.woku.app](https://clientapi.woku.app/)

## **Authentication**

Each company registered in woku has access to API services to integrate woku with their own applications.

### **Authentication Type**

To access the API functions, you must authenticate using the **Company Key** in each request.

### **Obtaining and Using the Company Key**

Every woku owner is assigned a Company Key, which must be included in the headers of API requests. The administrative interface of woku is available at: [https://admin.woku.app](https://admin.woku.app)

![View of the company information window in the client's application](https://ik.imagekit.io/dior7woku/develop/clientapi/wokuAdmin.png?updatedAt=1717020279616 "View of the company information window in the client's application")

In each request, include an Authorization header in the following format:

```bash
Authorization: Bearer <Company-Key>
```

## **wokus**

**wokus** are the key units for capturing and managing customer reviews within the woku platform. Through this API, you can automate the creation of **wokus**, rate them, capture reviews, and share them with your customers. Below are the main API requests that facilitate these tasks:

- **Create a woku**: Generate a new woku within your application.
- **Create a woku with form-data**: Send data in form-data format to create wokus.
- **Retrieve woku data**: Get the data of a woku, including ratings and reviews.
- **Rate and capture a text review for a woku**: Capture the rating and written review from a customer for a woku.
- **Rate and capture a voice review for a woku**: Capture the rating and voice review from a customer for a woku.
- **Share a woku by email**: Send wokus directly by email, including bulk email sending.

### **Creating a woku from Your Application**

One key functionality to integrate into your application is the creation of a woku. This allows you to automate the task of creating a review tool without requiring the administrator to manually perform the action in the woku interface.

To create a **woku**, send a **POST** request to the following URL:

- https://clientapi.woku.app/wokus/create-woku

**Required Headers**

- **Content-Type:** application/json
- **Authorization:** Bearer <Company-Key>

**Example Request Body (JSON)**

```json
{
  "description": "Docker Training",
  "fileUrl": "https://wokudevfiles.blob.core.windows.net/wokus/cd7f9cf3-c2e4-4ff0-8a96-19ff813f569e1699220394936-image.webp",
  "folderSecondaryKey": "17614778-3",
  "parentFolderSecondaryKey": "parentFolder17614778-3",
  "clientEmail": "pedro@empresa.com"
}
```

**Request Body Structure**

- **description** (string): Required. Minimum of 3 and maximum of 140 characters.
- **fileUrl** (string): Required. Public access URL for an image or video (preferably .mp4).
- **folderSecondaryKey** (string): Optional. Secondary key for the folder where the woku will be stored.
- **parentFolderSecondaryKey** (string): Optional. Secondary key for the parent folder. Cannot be the same as **folderSecondaryKey**.
- **clientEmail** (string): Must be a valid email address.

**Expected Responses**

- **201 Created woku object**: The woku was successfully created.
- **500 Internal Server Error**: A server error occurred.

### **Creating a woku with Form Data from Your Application**

In some cases, it is useful to allow users to create a **woku** through an interface where they can upload images or videos as files. The API provides a method to create a **woku** using form-data.

To create a **woku** with form-data, send a **POST** request to the following URL:

- https://clientapi.woku.app/wokus/create-woku-form-data

**Required Headers**

- **Content-Type**: multipart/form-data
- **Authorization**: Bearer <Company-Key>

**Request Body Structure (form-data)**

- **description** (string): Required. Minimum of 3 and maximum of 140 characters.
- **file** ($binary): Required. Must be an image or video file. For videos, .mp4 is recommended.
- **folderSecondaryKey** (string): Optional. Secondary key for the folder where the woku will be stored.
- **parentFolderSecondaryKey** (string): Optional. Secondary key for the parent folder. Cannot be the same as folderSecondaryKey.
- **clientEmail** (string): Optional. Must be a valid email address.

**Expected Responses**

- **201 Created woku object**: The woku was successfully created.
- **500 Internal Server Error**: A server error occurred.

### **Retrieve woku Data**

This method allows you to retrieve the data of a **woku**, including its ratings and reviews. You can use this functionality to access detailed information about an existing **woku**.

To retrieve the data of a **woku**, send a **GET** request to the following URL:

- https://clientapi.woku.app/wokus/review/{wokuId}

**Required Headers**

- **Content-Type**: application/json
- **Authorization**: Bearer <Company-Key>

**Parameters**

- **wokuId** (string): Required. The unique identifier of the **woku** you want to retrieve.

**Expected Responses**

- **200 OK**: The woku object was successfully retrieved.
- **500 Internal Server Error**: A server error occurred.

### **Rate and Capture a Text Review for a woku**

This method allows users to add a written review and rating to a **woku**. It is useful for capturing text feedback from customers about their experiences.

To add a text note to a **woku**, send a **POST** request to the following URL:

- https://clientapi.woku.app/wokus/create-textnote

**Required Headers**

- **Content-Type**: application/json
- **Authorization**: Bearer <Company-Key>

**Example Request Body (JSON)**

```json
{
  "wokuId": "65348875f3a876254aa82d5e",
  "qualification": 4,
  "description": "Very good Docker course!",
  "clientEmail": "pedro@empresa.com",
  "anonymous": false
}
```

**Request Body Structure**

- **wokuId** (string): Required. The ID of the **woku** to which the note will be added.
- **qualification** (number): Required. An integer between 1 and 5 representing the rating.
- **description** (string): Required. The text review from the customer, with a maximum of 255 characters.
- **clientEmail** (string): Optional. The email address of the customer leaving the review. If not provided, the **anonymous** field must be set to true.
- **anonymous** (boolean): Optional. Indicates whether the feedback is anonymous.

**Expected Responses**

- **201 Created textnote object**: The rating and review were successfully created.
- **500 Internal Server Error**: A server error occurred.

### **Rate and Capture a Voice Review for a woku**

This method allows customers to rate and leave a voice message review for a **woku**.

To create a voicemail, send a **POST** request to the following URL:

- https://clientapi.woku.app/wokus/create-voicemail

**Required Headers**

- **Content-Type**: multipart/form-data
- **Authorization**: Bearer <Company-Key>

**Request Body Structure (form-data)**

- **file** ($binary): Required. Audio or video file. Recommended formats: .mp4, .wav.
- **wokuId** (string): Required. The ID of the **woku** to which the voicemail will be added.
- **qualification** (number): Required. An integer between 1 and 5 representing the rating.
- **clientEmail** (string): Optional. The email address of the customer leaving the review. If not provided, the **anonymous** field must be set to true.
- **anonymous** (boolean): Optional. Indicates whether the feedback is anonymous (true or false).

**Expected Responses**

- **201 Created voicemail object**: The voicemail was successfully created.
- **500 Internal Server Error**: A server error occurred.

### **Share a woku by Email**

This method allows you to share a **woku** by email with one or more recipients. It is ideal for quickly and efficiently sharing reviews.

To share a **woku** by email, send a **POST** request to the following URL:

- https://clientapi.woku.app/wokus/share-woku-to-email

**Required Headers**

- **Content-Type**: application/json
- **Authorization**: Bearer <Company-Key>

**Request Body (JSON)**

To send to a single recipient:

```json
{
  "wokuId": "65348875f3a876254aa82d5e",
  "clientEmail": "pedro@empresa.com"
}
```

To send to multiple recipients:

```json
{
  "wokuId": "65348875f3a876254aa82d5e",
  "clientEmails": ["pedro@empresa.com", "juan@empresa.com"]
}
```

**Request Body Structure**

- **wokuId** (string): Required. The ID of the **woku** to be shared.
- **clientEmail** (string): Optional. The email address of the recipient.
- **clientEmails** (array of strings): Optional. List of email addresses of the recipients.

**Expected Responses**

- **201 Email sent successfully**: The email was sent successfully.
- **500 Internal Server Error**: A server error occurred.

## **Contact and Support**

### **Contact**

- Diego Orrego Brito, CTO of woku.
- Email: diego@woku.app (Please include the company name in the subject and mention the API).

## **Common Errors and Solutions**

### **Inaccessible File URL**

Ensure that the URL of the provided file is publicly accessible. Our service needs to be able to access the file to create the woku.

### **Secondary Key**

The secondary key is for creating a Folder where the woku will be contained. If a secondary key is not provided, the woku will remain at the Company level. Two Folders with the same secondary key cannot exist within a Company.
