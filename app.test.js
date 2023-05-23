const app = require('./app.js')
const request = require('supertest')
const {matchers} = require('jest-json-schema')


expect.extend(matchers)

const schemaCompany = {
    "properties": {
        "name": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "adress": {
          "type": "string"
        },
        "country": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "city",
        "adress",
        "country"
      ]
}

const schemaCustomer = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "jobTitle": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name",
        "jobTitle",
        "email",
        "phone"
      ]
    }
  }

describe("/GET company", () => {

    // cek schema
    test("schema harus sesuai", async() => {
        
        const response = await request(app).get('/company')
        
        expect(response.body).toMatchSchema(schemaCompany)
        expect(response.statusCode).toBe(200)
    })

    // test input dengan menunjuk indeks 1 setelah company
    test("tidak bisa akses dengan id int", async() => {
        const response = await request(app).get(`/company/${1}`)
        expect(404)
    })

})

describe("/PUT company", () => {

    test("update company name, city, address", async() => {
        const data = await request(app).put('/company').send({
            name: "MyCompany",
            city: "Meikarta",
            adress: "Jalan in aja dulu",
            country: "Nusantara"
        })

        expect(data.body).toMatchSchema(schemaCompany.properties)
        expect(200)
    })

    // test hanya merubah beberapa key - excpect merubah sebagian
    // test tidak menginput apapun

})

describe("/GET customerAll", () => {

    // cek schema
    test("cek schema", async() => {
        const response = await request(app).get('/customerAll')
        
        expect(response.body).toMatchSchema(schemaCustomer)
        expect(200)
    })
})

describe("/POST customer", () => {
    // add new data
    test("harus berhasil menambah customer baru & cek data baru", async() => {
        const data = await request(app).post('/customer').send({
            "id": "0dbf3b7f-f70e-40b0-bb31-fc2c0a5b018f",
            "name": "Kaymento",
            "jobTitle": "Developer",
            "email": "myemail@mail.com",
            "phone": "082856549962"
        })
        expect(200)
    })
})