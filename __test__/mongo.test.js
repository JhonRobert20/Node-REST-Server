const request = require('supertest');

// jest.spyOn(global.console, 'log').mockImplementation(jest.fn());
// jest.spyOn(global.console, 'debug').mockImplementation(jest.fn());

const data = {
  name : "super Name unique not repeated",
  _id : "60709e75437f4955b8e91c58"
};

const { throws } = require('../src/Mongo/models/throws')
const { mongo } = require('../src/Mongo/connection/connect')
const { app } = require('../src/Mongo/Server/app_test');


describe("connect sql / read actual data / add data / find user 250 / add user called 'Jhon' / can't repeat jhon", () => {
  

  test("first we need to create / call the app", async () => {
    await request(app)
    .get("/players/")
    .expect(200)
  });

  test("ranking, should return a true", async () => {
    await request(app)
    .get("/players/")
    .expect(200)
    .then(async response => {
      const haveToBe = await response.body.success;
      expect(haveToBe).toBe(true)
    })
  });

  

  test("Add data for the first time to the database", async () => {
    
    await request(app)
    .post("/players/")
    .send(data)
    .expect(200)

    .then(async response => {
      const lengthData = await response.body.data.affectedRows;
      expect(lengthData).not.toBe(0);
    })
  });

  test(`User with _id ${data._id} should exists`, async () => {
    await request(app)
    .get(`/players/${data._id}/games`)
    .expect(200)
    
    .then(response => {
      expect(response.body.success).toBe(true);
    });
  });

  test(`repeat add '${data.name}', the data of the body should be 0`, async () => {
    
    await request(app)
    .post("/players/")
    .send(data)
    .expect(404)

    .then(async response => {

      expect(response.body.success).toBe(false);
    })
  })
});

describe(`for user with _id: ${data._id} `, () => {
  test("change the name", () => {
    return request(app)
    .put(`/players/${data._id}/JoseRamondelaTorre/`)
    .expect(200)

    .then(response => {
      expect(response.body.data.nModified).toBe(1)
    })
    
  });
  test("Get all the plays", () => {
    
    return request(app)
    .get(`/players/${data._id}/games/`)
    .send("250")
    .expect(200)

    .then(response => {
      expect(response.body.success).toBe(true)
    })
  });

  test("Make a throw", () => {
    return request(app)
    .post(`/players/${data._id}/games/`)
    .expect(200)

    .then(response => {
      expect(response.body.data.nModified).toBe(1)
    })
  });

  test("Delete throws", () => {
    return request(app)
    .delete(`/players/${data._id}/games/`)
    .expect(200)

    .then(response => {
      console.log(response.body)
      expect(response.body.affectedRows).not.toBe(0)
    })
  })
});

describe("ranking", () => {
  test("Global ranking", () => {
    return request(app)
    .get("/players/ranking/")
    .expect(200)
    
    .then(response => {
      const lengthAvg = response.body.data.length;
      expect(lengthAvg).not.toBe(0);
    })
  });

  test("Losers ranking", () => {
    return request(app)
    .get("/players/ranking/losers/")
    .expect(200)
    
    .then(response => {
      const lengthAvg = response.body.data.length;
      expect(lengthAvg).not.toBe(0);
    })
  });
  
  test("Winners ranking", () => {
    return request(app)
    .get("/players/ranking/winners/")
    .expect(200)
    
    .then(response => {
      const lengthAvg = response.body.data.length;
      expect(lengthAvg).not.toBe(0);
    })
  })
});

test(`Delete the user that have id ${data._id}`, async () => {
  throws.deleteOne({ _id : mongo.mongo.Types.ObjectId(data._id)}, (err, data) => {
    expect(data.deletedCount).toBe(1);
  })
});
