define({ "api": [
  {
    "type": "post",
    "url": "/users",
    "title": "",
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
            "description": "<p>E-mail of the (example@example.com)</p>"
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
            "field": "InvalidParams",
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
          "title": "InvalidParams:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"success\": false,\n   \"error\": \"ValidationError\",\n   \"details\": [\n     \"password must be at least 6 characters\"\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes.js",
    "groupTitle": "Users"
  }
] });
