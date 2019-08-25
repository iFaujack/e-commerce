# E-Commerce API Documentation

## User Routes

### /user/login

**URL** : `/user/login`<br>
**Method** : `POST`<br>
**Auth Required** : `none`<br>
**Permision Required** : `none`<br>

**Data**
Name | Type | Require | Description 
-----|------|-------- | -----------
email| `String` | `YES`| Email User
password| `String` | `YES` | Password User

**Success Response**
```json
{
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNThhYzQ3ZjhjNDA3MjFlYTY1ZDliZiIsImVtYWlsIjoiZmF1emlAbWFpbC5jb20iLCJpYXQiOjE1NjYwOTI0NzF9.tH8_kvcwpYbjHC93Uj7KQiaaW430R-HD_5fnwQYTs2U" 
}
```

### /user/register

**URL** : `/user/register`<br>
**Method** : `POST`<br>
**Auth Required** : `none`<br>
**Permision Required** : `none`<br>

**Data**
Name | Type | require | Description
-----|------|--------- | ----------
email | `String` |  `YES` | Email User
password | `String` | `YES` | Password User 
fullname | `String` | `YES` | Fullname User

```json
{
    "fullname" : "Jason Momoa",
    "password" :  "encryptedpassword",
    "email"    : "jasonlucu"
}
```


### /user/loginOauth

**URL** : `/user/loginOauth`<br>
**Method** : `POST`<br>
**Auth Required** : `none`<br>
**Permision Required** : `none`<br>

**Data**
Name | Type | require      | Description
-----|------|------------- | -----------
token| `String` | `YES`    | Token From Google

**Success Response**
```json
{
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNThhYzQ3ZjhjNDA3MjFlYTY1ZDliZiIsImVtYWlsIjoiZmF1emlAbWFpbC5jb20iLCJpYXQiOjE1NjYwOTI0NzF9.tH8_kvcwpYbjHC93Uj7KQiaaW430R-HD_5fnwQYTs2U" 
}
```


## Product route

### Product Create
**URL** : `/product/create`<br>
**Method** : `POST`<br>
**Auth Required** : `YES`<br>
**Permision Required** : `YES`<br>

**FORM**
Name | Type | Require   | Description
-----|------|----------- | -----------
name | `String` | `YES`  | Name Product
stock | `number` | `NO` | Stock Product
Price | `number` | `YES` | Price Product
image | `File` | `YES` | Foto Product
description | `String` | `NO` | Description Product

**Header**
Name | Type | Require | Description
---- | ---- | ------- | -----------
token| `String` | `YES` | Token from login


**Success Response**
```json
{
    "name" : "Sepatu Andalan",
    "stock" : 20,
    "price" : 1000000,
    "imageUrl" : "google.com/inipoto/",
    "description" : "Sepatu andalan michael jordan"
}
```


### Product Delete
**URL** : `/product/delete/:id`<br>
**Method** : `DELETE`<br>
**Auth Required** : `YES`<br>
**Permision Required** : `YES`<br>

**params**
Name | Type | Require | Decription
-----|------|-------- | ----------
id   | `String` | `YES` | ID Product


**Header**
Name | Type | Require | Description
---- | ---- | ------- | -----------
token | `String` | `YES` | Token From Login


**Success Response**
```json
{
    "message" : "Successfully deleted"
}
```


### Product Update
**URL** : `/product/update/:id`<br>
**Method** : `PATCH`<br>
**Auth Required** : `YES`<br>
**Permision Required** : `YES`<br>


**Data**
Name | Type | Require   | Description
-----|------|----------- | -----------
name | `String` | `NO`  | Name Product
stock | `number` | `NO` | Stock Product
Price | `number` | `NO` | Price Product
image | `File` | `NO` | Foto Product
description | `String` | `NO` | Description Product


**params**
Name | Type | Require | Decription
-----|------|-------- | ----------
id   | `String` | `YES` | ID Product


**Header**
Name | Type | Require | Description
---- | ---- | ------- | -----------
token | `String` | `YES` | Token From Login


## Cart Route

### Cart Create

**URL** : `/cart/create`<br>
**Method** : `POST`<br>
**Auth Required** : `YES`<br>
**Permision Required** : `none`<br>

**Data**
Name | Type | require | description
-----|------|--------- | ----------
customer | `String` | `Yes` | user Id
Address | `String`  | `Yes` | Shipping Address
products | `String` | `Yes` | product id

**Header**
Name | Type | require | description
---- | ---- | ------  | -----------
Token | `String` | `Yes` | Token From Login

**Success Response**
```json
{
    "customer" : {
        "_id" : ,
        "fullname" : "Jason Momoa",
        "password" :  "encryptedpassword",
        "email"    : "jasonlucu"
    },
    "products" : [{
                    "_id" : "",
                    "name" : "Sepatu Andalan",
                    "stock" : 20,
                    "price" : 1000000,
                    "imageUrl" : "google.com/inipoto/",
                    "description" : "Sepatu andalan michael jordan"
                },
                {
                    "_id" : "",
                    "name" : "Sepatu Andalan",
                    "stock" : 20,
                    "price" : 1000000,
                    "imageUrl" : "google.com/inipoto/",
                    "description" : "Sepatu andalan michael jordan"
                }],
    "address" : "Jakarta Timur, Ciracas , Dewa 13740",
    "paidStatus" : false
}
```

### Cart Delete 

**URL** : `/cart/delete/:id`<br>
**Method** : `DELETE`<br>
**Auth Required** : `Yes`<br>
**Permision Required** : `Yes`<br>

**Params**
Name | Type | Require | Description  
-----|------|-------- | ----------
id   | `String` | `Yes`| id Cart

**Header**
Name | Type | Require | Description  
-----|------|-------- | ----------
token | `String` | `Yes` | token from login

**Success Response**
```json
{
   "message" : "Succefully deleted cart"
}
```

### Cart Update Payment Status

**URL** : `/cart/payment/:id`<br>
**Method** : `patch`<br>
**Auth Required** : `Yes`<br>
**Permision Required** : `Yes` (Admin Only) <br>

**Params**
Name | Type | Require | Description  
-----|------|-------- | ----------
id   | `String` | `Yes`| id Cart


**Header**
Name | Type | Require | Description  
-----|------|-------- | ----------
token | `String` | `Yes` | token from login




