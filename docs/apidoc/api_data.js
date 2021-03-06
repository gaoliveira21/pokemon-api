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
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Avatar unique ID</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>Avatar filename</p>"
          },
          {
            "group": "Success 201",
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
    "groupTitle": "File",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users unique access-token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"Bearer eyJhbGcTOIJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjVlOGM4NWNkYjYyNjIzMDAyNzcwODQ2ZSIsImlhdCI6MTU4NjM2ODM0MSwiZXhwIjoxNTg2OTczMTQxfQ.hSRy7GFR3e3mFC3FTXom6wNA7ufsCO_KDLRtB29bxzQ\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/pokemons",
    "title": "List pokemons",
    "name": "ListPokemons",
    "group": "Pokemons",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>current page (<b>default value: 1</b>) - Query Param</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>limit of pokemons returned - Query Param</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "attributes",
            "description": "<p>an object with pokemon attributes: (atk, def, spd, spAtack, spDef, hp)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID of a pokemon</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Pokemon name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Pokemon description</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "avatar",
            "description": "<p>an object with avatar data: (_id, path, url)</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "skills",
            "description": "<p>an array of objects, each object contain the follow attributes: (_id, name, description, force)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Pokemon type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalDocs",
            "description": "<p>Total of pokemons registered</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Number of pokemons returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalPages",
            "description": "<p>Total of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Current page</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pagingCounter",
            "description": "<p>The starting sl. number of first document</p>"
          },
          {
            "group": "Success 200",
            "type": "Bool",
            "optional": false,
            "field": "hasPrevPage",
            "description": "<p>Availability of prev page</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "prevPage",
            "description": "<p>Previous page number if available or NULL</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "nextPage",
            "description": "<p>Next page number if available or NULL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n   docs: [\n     attributes: {\n       atk: 250,\n       def: 70,\n       spd: 200,\n       spAtack: 150,\n       spDef: 100,\n       hp: 100\n     },\n     _id: \"5e95d44bb3dbf80365e95e6b\",\n     name: \"Pikachu\",\n     description: \"this is my first pokemon\",\n     avatar: {\n       _id: \"5e95e86e808bbe07855738eb\",\n       path: \"ddb2e1b5bbdaef07bf1427eac05f1586882670610.jpg\",\n       url: \"http://localhost:3333/avatar/ddb2e1b5bbdaef07bf1427eac05f1586882670610.jpg\"\n     },\n     \"skills\": [\n       {\n         _id: \"5e95d44bb3dbf80365e95e6c\",\n         name: \"skill 01\",\n         description: \"first skill\",\n         force: 100\n       }\n     ],\n     type: \"eletric\"\n   ],\n   totalDocs: 1,\n   limit: 10,\n   totalPages: 1,\n   page: 1,\n   pagingCounter: 1,\n   hasPrevPage: false,\n   hasNextPage: false,\n   prevPage: null,\n   nextPage: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes.js",
    "groupTitle": "Pokemons",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users unique access-token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"Bearer eyJhbGcTOIJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjVlOGM4NWNkYjYyNjIzMDAyNzcwODQ2ZSIsImlhdCI6MTU4NjM2ODM0MSwiZXhwIjoxNTg2OTczMTQxfQ.hSRy7GFR3e3mFC3FTXom6wNA7ufsCO_KDLRtB29bxzQ\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/pokemons/:id",
    "title": "Show Pokemon details",
    "name": "ShowPokemon",
    "group": "Pokemons",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Pokemon unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "attributes",
            "description": "<p>an object with pokemon attributes: (atk, def, spd, spAtack, spDef, hp)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID of a pokemon</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Pokemon name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Pokemon description</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "avatar",
            "description": "<p>an object with avatar data: (_id, path, url)</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "skills",
            "description": "<p>an array of objects, each object contain the follow attributes: (_id, name, description, force)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Pokemon type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n     attributes: {\n       atk: 250,\n       def: 70,\n       spd: 200,\n       spAtack: 150,\n       spDef: 100,\n       hp: 100\n     },\n     _id: \"5e95d44bb3dbf80365e95e6b\",\n     name: \"Pikachu\",\n     description: \"this is my first pokemon\",\n     avatar: {\n       _id: \"5e95e86e808bbe07855738eb\",\n       path: \"ddb2e1b5bbdaef07bf1427eac05f1586882670610.jpg\",\n       url: \"http://localhost:3333/avatar/ddb2e1b5bbdaef07bf1427eac05f1586882670610.jpg\"\n     },\n     \"skills\": [\n       {\n         _id: \"5e95d44bb3dbf80365e95e6c\",\n         name: \"skill 01\",\n         description: \"first skill\",\n         force: 100\n       }\n     ],\n     type: \"eletric\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "InvalidID",
            "description": "<p>Not found a pokemon with ID sent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InvalidID:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  error: \"Pokemon not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes.js",
    "groupTitle": "Pokemons"
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
  },
  {
    "type": "put",
    "url": "/user",
    "title": "Update user",
    "name": "UserUpdate",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>New fullname of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>New e-mail of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "oldPassword",
            "description": "<p>Old password of the user (<b>required if user have been changing his password<b>)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>New password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "confirmPassword",
            "description": "<p>This field need match with password (<b>required if user have been changing his password<b>)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"email\": \"newemail@mail.com\",\n   \"name\": \"New name\",\n   \"oldPassword\": \"123456\",\n   \"password\": \"mynewpassword\",\n   \"confirmPassword\": \"mynewpassword\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>User ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail of the user (example@example.com)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5e874a2bbedf244cc32b0d3a\",\n  \"name\": \"New name\",\n  \"email\": \"newemail@mail.com\"\n}",
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
            "field": "InvalidPassword",
            "description": "<p>password sent does not match with password in database</p>"
          },
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
          "title": "InvalidPassword:",
          "content": " HTTP/1.1 401 Unauthorized\n{\n   \"success\": false,\n   \"error\": \"Password does not match\"\n}",
          "type": "json"
        },
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
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Users unique access-token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"Authorization\": \"Bearer eyJhbGcTOIJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjVlOGM4NWNkYjYyNjIzMDAyNzcwODQ2ZSIsImlhdCI6MTU4NjM2ODM0MSwiZXhwIjoxNTg2OTczMTQxfQ.hSRy7GFR3e3mFC3FTXom6wNA7ufsCO_KDLRtB29bxzQ\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
