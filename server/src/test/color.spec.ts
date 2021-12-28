import app from '../app';
import request from 'supertest';
import { ERROR_CODES } from '@const';
import prisma from '../../prisma/client';

const MOCK_COLORS = [
  {
    name: 'red',
    hex: '#FF0000',
  },
  {
    name: 'green',
    hex: '#00FF00',
  },
  {
    name: 'blue',
    hex: '#0000FF',
  },
  {
    name: 'white',
    hex: '#FFFFFF',
  },
  {
    name: 'black',
    hex: '#000000',
  },
  {
    name: 'gray',
    hex: '#cccccc',
  },
];

afterAll(async () => {
  await prisma.$disconnect();
});

describe('PUT /api/color/:name', () => {
  describe('adding a new color to the database', () => {
    it('should return with the inserted color', (done) => {
      request(app)
        .put(`/api/color/${MOCK_COLORS[0].name}`)
        .send({ hex: MOCK_COLORS[0].hex })
        .expect((res) => expect(res.body).toMatchObject(MOCK_COLORS[0]))
        .expect(200, done);
    });
  });
  describe('adding a duplicate color to the database', () => {
    it('should return with a proper error code', (done) => {
      request(app)
        .put(`/api/color/${MOCK_COLORS[0].name}`)
        .send({ hex: MOCK_COLORS[0].hex })
        .expect((res) =>
          expect(res.body).toMatchObject({ code: ERROR_CODES.NAME_TAKEN })
        )
        .expect(400, done);
    });
  });
  describe('adding another new color to the database', () => {
    it('should return with the inserted color', (done) => {
      request(app)
        .put(`/api/color/${MOCK_COLORS[1].name}`)
        .send({ hex: MOCK_COLORS[1].hex })
        .expect((res) => expect(res.body).toMatchObject(MOCK_COLORS[1]))
        .expect(200, done);
    });
  });
  describe('adding a color to the database with invalid hex', () => {
    it('should return with a proper error code', (done) => {
      request(app)
        .put(`/api/color/${MOCK_COLORS[2].name}`)
        .send({ hex: '#1122334455' })
        .expect((res) =>
          expect(res.body).toMatchObject({ code: ERROR_CODES.INVALID_REQUEST })
        )
        .expect(400, done);
    });
  });
});

describe('GET /api/color', () => {
  describe('requesting all colors', () => {
    it('should return all the colors from the database', (done) => {
      request(app)
        .get(`/api/color`)
        .expect((res) => expect(res.body).toHaveLength(2))
        .expect((res) => {
          expect(res.body[0]).toMatchObject(MOCK_COLORS[0]);
          expect(res.body[1]).toMatchObject(MOCK_COLORS[1]);
        })
        .expect(200, done);
    });
  });
});

describe('GET /api/color/:name', () => {
  describe('requesting a color that exists', () => {
    it('should return the color', (done) => {
      request(app)
        .get(`/api/color/${MOCK_COLORS[0].name}`)
        .expect((res) => expect(res.body).toMatchObject(MOCK_COLORS[0]))
        .expect(200, done);
    });
  });
  describe('requesting a color that does not exist', () => {
    it('should return with the proper error code', (done) => {
      request(app)
        .get(`/api/color/invalid_name`)
        .expect((res) =>
          expect(res.body).toMatchObject({ code: ERROR_CODES.NOT_FOUND })
        )
        .expect(404, done);
    });
  });
});

describe('POST /api/color/:name', () => {
  describe("updating an existing color's name", () => {
    it('should return with the updated color', (done) => {
      request(app)
        .post(`/api/color/${MOCK_COLORS[0].name}`)
        .send({ name: MOCK_COLORS[2].name, hex: MOCK_COLORS[0].hex })
        .expect((res) =>
          expect(res.body).toMatchObject({ name: MOCK_COLORS[2].name })
        )
        .expect(200, done);
    });
  });
  describe("updating an existing color's hex", () => {
    it('should return with the updated color', (done) => {
      request(app)
        .post(`/api/color/${MOCK_COLORS[1].name}`)
        .send({ hex: MOCK_COLORS[2].hex, name: MOCK_COLORS[1].name })
        .expect((res) =>
          expect(res.body).toMatchObject({ hex: MOCK_COLORS[2].hex })
        )
        .expect(200, done);
    });
  });
  describe("updating an existing color's hex and name", () => {
    it('should return with the updated color', (done) => {
      request(app)
        .post(`/api/color/${MOCK_COLORS[2].name}`)
        .send(MOCK_COLORS[3])
        .expect((res) => expect(res.body).toMatchObject(MOCK_COLORS[3]))
        .expect(200, done);
    });
  });
  describe("updating an existing color's hex to an invalid value", () => {
    it('should return with the proper error code', (done) => {
      request(app)
        .post(`/api/color/${MOCK_COLORS[3].name}`)
        .send({ hex: '#1122334455', name: MOCK_COLORS[3].name })
        .expect((res) =>
          expect(res.body).toMatchObject({ code: ERROR_CODES.INVALID_REQUEST })
        )
        .expect(400, done);
    });
  });
  describe('updating a not existing color', () => {
    it('should return with the proper error code', (done) => {
      request(app)
        .post(`/api/color/not_existing`)
        .send(MOCK_COLORS[2])
        .expect((res) =>
          expect(res.body).toMatchObject({ code: ERROR_CODES.NOT_FOUND })
        )
        .expect(404, done);
    });
  });
  describe('updating a color name to an existing one', () => {
    it('should return with the proper error code', (done) => {
      request(app)
        .post(`/api/color/${MOCK_COLORS[3].name}`)
        .send(MOCK_COLORS[1])
        .expect((res) =>
          expect(res.body).toMatchObject({ code: ERROR_CODES.NAME_TAKEN })
        )
        .expect(400, done);
    });
  });
});

describe('DELETE /api/color/:name', () => {
  describe('deleting a color that exists', () => {
    it('should return the deleted color', (done) => {
      request(app)
        .delete(`/api/color/${MOCK_COLORS[3].name}`)
        .expect((res) =>
          expect(res.body).toMatchObject({ name: MOCK_COLORS[3].name })
        )
        .expect(200, done);
    });
  });
  describe('deleting a color that does not exist', () => {
    it('should return with the proper error code', (done) => {
      request(app)
        .get(`/api/color/invalid_name`)
        .expect((res) =>
          expect(res.body).toMatchObject({ code: ERROR_CODES.NOT_FOUND })
        )
        .expect(404, done);
    });
  });
  describe('requesting a deleted color', () => {
    it('should return with the proper error code', (done) => {
      request(app)
        .get(`/api/color/${MOCK_COLORS[3].name}`)
        .expect((res) =>
          expect(res.body).toMatchObject({ code: ERROR_CODES.NOT_FOUND })
        )
        .expect(404, done);
    });
  });
});
