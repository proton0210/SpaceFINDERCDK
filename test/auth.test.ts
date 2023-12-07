import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("vidit0210", "Qwerty123@");

  console.log(loginResult);
}

testAuth();
