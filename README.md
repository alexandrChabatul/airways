## Airways server

###  Setup

- Clone this repo: `$ https://github.com/sashkill94/airways`.

- Go to downloaded folder: `$ cd airways`.

###  Running
- Install dependencies: `$ npm install`.
- Start server: `$ npm run start-server`.

#### Url: http://localhost:3000/
- 
##  Usage

 **Auth / Users**

- [Sign Up](#sign-up)

- [Sign In](#sign-in)

- [Update](#update)

----


<a id="sign-up"></a>**Sign Up**


Returns json with token (1 hour) and user.

<details>

* **URL**

/signup

* **Method:**

`POST`

* **Headers:**

`'Content-Type': 'application/json'`

* **URL Params**

None

* **Query Params**

None

* **Data Params**

#####  Email and password are required.
```json
{

"email": "test@test.test",

"password": "password"

}
```


* **Success Response:**

* **Code:** 201 CREATED <br />

**Content:**

```json

{
  "accessToken": "xxx.xxx.xxx",
  "user": {
    "id": 1,
    "email": "olivier@mail.com"
  }
}

```

* **Error Response:**

* **Code:** 400 BAD REQUEST <br />

**Content:**
``` json

{

"Error message"

}

```

None

</details>

----

<a id="sign-in"></a>**Sign In**

Returns json with token (1 hour) and user.

<details>

* **URL**

/signin

* **Method:**

`POST`

* **Headers:**

`'Content-Type': 'application/json'`

* **URL Params**

None

* **Query Params**

None

* **Data Params**

#####  Email and password are required.
```json
{

"email": "test@test.test",

"password": "password"

}
```


* **Success Response:**

* **Code:** 200 OK <br />

**Content:**

```json

{
  "accessToken": "xxx.xxx.xxx",
  "user": {
    "id": 1,
    "email": "olivier@mail.com"
  }
}

```

* **Error Response:**

* **Code:** 400 BAD REQUEST <br />

**Content:**
``` json

{

"Error message"

}

```

None

</details>

----

<a id="update"></a>**Update**

Update user.

<details>

* **URL**

/users/:id

* **Method:**

`PUT`

* **Headers:**

`'Content-Type': 'application/json'`

* **URL Params**

`id : user id`

* **Query Params**

None

* **Data Params**

```json
{

"email": "test@test.test",

"password": "password"

}
```


* **Success Response:**

* **Code:** 200 OK <br />

**Content:**

```json

{
    "email": "s123ad1@asd.sad",
    "password": "$2a$10$Lu.U2/pHGFI86uLgpmk4feGupcImrUnD5SdcI8AeGOVKvUSS4G44K",
    "id": 1
}

```

* **Error Response:**

* **Code:** 400 BAD REQUEST <br />

**Content:**
``` json

{

"Error message"

}

```

None

</details>

----
