import { render, screen } from "@testing-library/react";
import App from "../pages/index";
import isPortReachable from 'is-port-reachable'
import fetch from 'node-fetch'

// detect local server started to test api !!!
beforeAll(async done => {
  const open = await isPortReachable(3000, {host: 'localhost'})
  if(!open) done.fail({message : 'Start local dev server by `yarn dev` first!'})
  done()
});

const login = async (email, password) => {
  const url  = `http://localhost:3000/api/users/auth`
  const resp = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: `POST`,
    body: JSON.stringify({email, password}),
  })
  const json = await resp.json()
  return json.user
}

const fetchPostsFor = async (size) => {
  const url  = `http://localhost:3000/api/blog/list?offset=0&limit=${size}&user_id=`
  const res  = await fetch(url)
  const json = await res.json()
  return json.data
}

describe("IvoryApp", () => {
  // dummy test please ignore!
  test('-- Dummy math test --', () => {
    expect(1+2).toBe(3);
  });
  // posts list api test
  test('-- First 10 posts API test --', async () => {
    const posts = await fetchPostsFor(10)
    expect(posts.length).toBe(10)
  });
  // login api test
  test('-- Login api test --', async () => {
    const user = await login('lwz7512@gmail.com', '123456')
    expect(user.id).toBe(181)
  });
  // Last case: App Intro text
  it("-- App render heading test --", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Ivory" })
    ).toBeInTheDocument();
  });
});