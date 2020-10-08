exports.swaggerDocument =
    {
        openapi: '3.0.1',
        info: {
            version: '1.0.0',
            title: 'Assignment - Kongcepts',
            description: 'Assignment - Kongcepts',
            contact: {
                name: 'Asiri h',
                email: 'asiriofficial@gmail.com',
                url: 'https://github.com/asirihewage/Assignment-Kongcepts'
            }
        },

        servers: [
            {
                "url": "https://localhost:{port}/{basePath}",
                "description": "The production API server",
                "variables": {
                    "port": {
                        "enum": [
                            "3000"
                        ],
                        "default": "3000"
                    },
                    "basePath": {
                        "default": "api"
                    }
                }
            }
        ],
        "paths": {
            "/employee": {
                "get": {
                    "summary": "List all employees",
                    "tags": [
                        "employee"
                    ],
                    "responses": {
                        "200": {
                            "description": "An array of employees",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "example": {
                                                "status": 1,
                                                "message": "Success.",
                                                "data": []
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "post": {
                    "summary": "Info for a specific employee",
                    "tags": [
                        "employee"
                    ],
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "The id of the employee to retrieve",
                            "schema": {
                                "type": "number"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Expected response to a valid request",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "example": {
                                            "status": 1,
                                            "message": "Success.",
                                            "data": []
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/employee/{id}": {
                "get": {
                    "summary": "Info for a specific employee",
                    "tags": [
                        "employee"
                    ],
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "The id of the employee to retrieve",
                            "schema": {
                                "type": "number"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Expected response to a valid request",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "example": {
                                            "status": 1,
                                            "message": "Success.",
                                            "data": []
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "put": {
                    "summary": "Update a specific employee",
                    "tags": [
                        "employee"
                    ],
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "The id of the employee to update",
                            "schema": {
                                "type": "number"
                            }
                        }
                    ],
                    "requestBody": {
                        "description": "Updated fields for employee",
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "example": {
                                        "status": 1,
                                        "message": "Success.",
                                        "data": []
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Expected response to a valid request",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "example": {
                                            "status": 1,
                                            "message": "Success.",
                                            "data": []
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/auth/register": {
                "post": {
                    "summary": "Register an employee",
                    "tags": [
                        "auth"
                    ],
                    "parameters": [
                        {
                            "name": "emp_id",
                            "in": "path",
                            "required": true,
                            "description": "The id of the employee to retrieve",
                            "schema": {
                                "type": "number"
                            }
                        },
                        {
                            "name": "emp_name",
                            "in": "path",
                            "required": true,
                            "description": "The id of the employee to retrieve",
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "emp_email",
                            "in": "path",
                            "required": true,
                            "description": "The id of the employee to retrieve",
                            "schema": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "emp_pawwsord",
                            "in": "path",
                            "required": true,
                            "description": "The id of the employee to retrieve",
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Expected response to a valid request",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "example": {
                                            "status": 1,
                                            "message": "Registration Success.",
                                            "data": [{
                                                "emp_id": 3,
                                                "emp_name": "testemp",
                                                "emp_email": "asdg@efe.com",
                                                "emp_password": "$2b$10$Bx4szVEb0sBYMkJmUWDxIuP9aWiVIqe1lf12ZP7E5geZjYZnqfKrW"
                                            }]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };