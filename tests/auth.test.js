import { test, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";


const email = `teste_${Date.now()}@gmail.com`;
const password = "123456";


let id;
let token;

// ---------- Create User ----------

test("criar utilizador", async () => {
  const res = await request(app).post("/api/users").send({
    name: "Teste",
    email: email,
    password: password,
  });

  expect(res.status).toBe(201);
  id = res.body.data.id; 
});

test("criar utilizador sem email dá 400", async () => {
  const res = await request(app).post("/api/users").send({
    name: "Sem email",
    password: password,
  });

  expect(res.status).toBe(400);
});

test("criar utilizador com email repetido dá 409", async () => {
  const res = await request(app).post("/api/users").send({
    name: "Teste",
    email: email,
    password: password,
  });

  expect(res.status).toBe(409);
});

// ---------- LOGIN ----------

test("login com sucesso", async () => {
  const res = await request(app).post("/api/login/users").send({
    email: email,
    password: password,
  });

  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
  token = res.body.token; // guardamos o token para as rotas protegidas
});

test("login com password errada dá 401", async () => {
  const res = await request(app).post("/api/login/users").send({
    email: email,
    password: "password-errada",
  });

  expect(res.status).toBe(401);
});

// ---------- LISTAR  ----------

test("listar utilizadores sem token é rejeitado", async () => {
  const res = await request(app).get("/api/users");

  expect([401, 403]).toContain(res.status);
});

test("listar utilizadores com token", async () => {
  const res = await request(app)
    .get("/api/users")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.data)).toBe(true);
});

// ---------- VER UM USER ----------

test("ver um utilizador", async () => {
  const res = await request(app)
    .get(`/api/users/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.data.id).toBe(id);
});

test("ver outro utilizador dá 403", async () => {
  const res = await request(app)
    .get("/api/users/999999")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(403);
}); 

// ---------- EDITAR ----------

test("editar o próprio utilizador", async () => {
  const res = await request(app)
    .put(`/api/users/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Nome novo",
      email: email,
      password: password,
    });

  expect(res.status).toBe(200);
  expect(res.body.data.name).toBe("Nome novo");
});

test("editar outro utilizador dá 403", async () => {

  const res = await request(app)
    .put("/api/users/999999")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Hack",
      email: "hack@gmail.com",
      password: "123456",
    });

  expect(res.status).toBe(403);
});

// ---------- DELETE  ----------

test("apagar outro utilizador dá 403", async () => {
  const res = await request(app)
    .delete("/api/users/999999")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(403);
});

test("apagar o próprio utilizador", async () => {
  const res = await request(app)
    .delete(`/api/users/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
});

//------------- VER USER QUE NAO EXISTE ---------------

test("ver um utilizador que não existe dá 404", async () => {
  const res = await request(app)
    .get(`/api/users/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(404);
});