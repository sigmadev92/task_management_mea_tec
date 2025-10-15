import { http, HttpResponse } from "msw";
import { type LoginUser } from "../../types/user.types";
import { users } from "../sample_data/users.data";

export const userHandlers = [
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as LoginUser;
    console.log("login handler");
    if (!body || !body.username || !body.password) {
      return HttpResponse.json(
        {
          success: false,
          message: "Email and Password are missing",
        },
        { status: 403 }
      );
    }

    const user = users.find(
      (ele) => ele.username === body.username && ele.password === body.password
    );
    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: "Email or Password is invalid",
        },
        { status: 403 }
      );
    }

    return HttpResponse.json(
      { success: true, user: { ...user, password: "" } },
      {
        headers: {
          "Set-Cookie": `sessionId=${user.sessionId}; Path=/; HttpOnly`,
        },
        status: 200,
      }
    );
  }),

  http.get("/api/logout", async ({ cookies }) => {
    //check if user is logged in
    console.log("Logout Handler", cookies.sessionId);
    if (cookies.sessionId.length > 0) {
      return HttpResponse.json(
        { success: true },
        {
          headers: {
            "Set-Cookie": "sessionId=; Path=/; Max-Age=0; HttpOnly",
          },
          status: 200,
        }
      );
    }
    console.log("logout failed");
    return HttpResponse.json(
      {
        success: false,
        message: "You are not loggedin",
      },
      { status: 403 }
    );
  }),
  http.post("/api/auth", async ({ cookies }) => {
    console.log("Auth handler", cookies.sessionId);
    try {
      const sessionId = cookies.sessionId;
      console.log(sessionId);
      if (!sessionId) {
        return HttpResponse.json({ success: false }, { status: 400 });
      }

      const user = users.find((ele) => ele.sessionId === sessionId);
      if (!user) {
        return HttpResponse.json({ success: false }, { status: 400 });
      }

      return HttpResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
      console.log(error);
      return HttpResponse.json(
        {
          success: false,
          message: (error as Error).message,
        },
        { status: 500 }
      );
    }
  }),
];
