define({ "api": [
  {
    "type": "post",
    "url": "/avatar",
    "title": "Upload avatar",
    "name": "UploadAvatar",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "avatar",
            "description": "<p>File for upload</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"avatar\": \"/path/filename.ext\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Avatar unique ID</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>Avatar filename</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>URL to access file</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 Created\n{\n   \"_id\": \"5e8626c31fe5ea90a105d00d\",\n   \"path\": \"f6421cd186d84127ba8dd71e69961585850050995.png\",\n   \"url\": \"http://localhost:3333/avatar/f6421cd186d84127ba8dd71e69961585850050995.png\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "InvalidFileExtension",
            "description": "<p>Invalid file sent</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "NoFileSent",
            "description": "<p>avatar is a required field and did not was sent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InvalidFileExtension:",
          "content": " HTTP/1.1 400 Bad Request\n{\n   \"error\": \"file extension is not permitted\"\n}",
          "type": "json"
        },
        {
          "title": "NoFileSent:",
          "content": "HTTP/1.1 400 Bar Request\n{\n  \"error\": \"ValidationError\",\n  \"details\": [\n    \"file is a required field\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create user",
    "name": "CreateUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail (example@example.com)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user minimum(6)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"user@mail.com\",\n  \"name\": \"User\",\n  \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>User ID</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail of the user (example@example.com)</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the user</p>"
          },
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"user\": {\n    \"_id\": \"5e8c85cdb62623002770846e\",\n    \"name\": \"User\",\n    \"email\": \"user@mail.com\"\n  },\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "UserExists",
            "description": "<p>The email sent already exists in database</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Invalid params sent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserExists:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"success\": false,\n  \"error\": \"User already exists\"\n}",
          "type": "json"
        },
        {
          "title": "ValidationError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"success\": false,\n   \"error\": \"ValidationError\",\n   \"details\": [\n     \"password must be at least 6 characters\"\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/sessions",
    "title": "Start session",
    "name": "StartSession",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail used on register</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password used on register</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   email: \"user@mail.com\",\n   password: \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>User ID</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User e-mail</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the user</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 Created\n{\n   \"user\": {\n     \"_id\": \"5e8c85cdb62623882770849e\",\n     \"name\": \"User\",\n     \"email\": \"user@mail.com\"\n   },\n   \"token\": \"eyJhbGcTOIJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjVlOGM4NWNkYjYyNjIzMDAyNzcwODQ2ZSIsImlhdCI6MTU4NjM2ODM0MSwiZXhwIjoxNTg2OTczMTQxfQ.hSRy7GFR3e3mFC3FTXom6wNA7ufsCO_KDLRtB29bxzQ\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>not found a user with email sent</p>"
          },
          {
            "group": "Error 401",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>password sent does not match with password in database</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Invalid params sent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotFound:",
          "content": " HTTP/1.1 401 Unauthorized\n{\n   \"success\": false,\n   \"error\": \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidPassword:",
          "content": " HTTP/1.1 401 Unauthorized\n{\n   \"success\": false,\n   \"error\": \"Password does not match\"\n}",
          "type": "json"
        },
        {
          "title": "ValidationError:",
          "content": " HTTP/1.1 401 Unauthorized\n{\n   \"success\": false,\n   \"error\": \"ValidationError\",\n   \"details\": [\n     \"password is a required field\"\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes.js",
    "groupTitle": "Users"
  }
] });
