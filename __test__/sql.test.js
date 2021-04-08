const request = require('supertest');
const fs = require('fs');
const add = fs.readFileSync('src/sql/create/testData/insert.sql', 'utf-8');
const dele = fs.readFileSync('src/sql/create/testData/delete.sql', 'utf-8');
var linesAdd = add.split('\n');
var linesDe = dele.split('\n');

jest.spyOn(global.console, 'log').mockImplementation(jest.fn());
jest.spyOn(global.console, 'debug').mockImplementation(jest.fn());

const { connection } = require('../src/Sql/create/create');
const { app } = require('../src/Sql/Server/app');

describe("connect sql / read actual data / add data / find user 250 / add user called 'Jhon' / can't repeat jhon", () => {
  

  test("first we need to create / call the app", async () => {
    await request(app)
    .get("/players/")
    .expect(200)
  });

  test("allUsersMedia, should return a true", async () => {
    await request(app)
    .get("/players/")
    .expect(200)
    .then(async response => {
      const haveToBe = await response.body.success;
      expect(haveToBe).toBe(true)
    })
  });

  test("Add data for the first time to the database", async () => {
    for (var line of linesAdd) {
      await connection.query(line, (err, result) => {
        expect(err).toBeNull()
      })
    };
  });

  test("user with id 250 should exists", async () => {
    await request(app)
    .get("/players/250/games/")
    .expect(200)
    .then(async response => {
      const lenghData = await response.body.data.length;
      expect(lenghData).not.toBe(0);
    })
  });

  test("repeat add 'a', the data of the body should be 0,", async () => {
    const data = {
      name : "a"
    }
    await request(app)
    .post("/players/")
    .send(data)
    .expect(200)
    .then(async response => {
      const lengthData = await response.body.data.affectedRows;
      expect(lengthData).toBe(0);
    })
  })
});

describe("for user 250", () => {
  test("change the name", () => {
    return request(app)
    .put("/players/250/Jose Ramon de la Torre")
    .expect(200)
    .then(response => {
      expect(response.body.data.affectedRows).toBe(1)
    })
    
  });
  test("Get all the plays", () => {
    
    return request(app)
    .get("/players/250/games/")
    .send("250")
    .expect(200)
    .then(response => {
      expect(response.body.success).toBe(true)
    })
  });

  test("Make a throw", () => {
    return request(app)
    .post("/players/250/games/")
    .expect(200)
    .then(response => {
      expect(response.body.data.affectedRows).toBe(1)
    })
  });

  test("Delete throws", () => {
    return request(app)
    .delete("/players/250/games/")
    .expect(200)
    .then(response => {
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
})

test("Delete test data", async () => {
  for (var line of linesDe) {
    await connection.query(line, async (err, result) => {
      await expect(result.affectedRows).toBe(1);
    })
  };
});