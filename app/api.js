/**
 * Created by saionara1 on 6/21/17.
 */
import Base64 from "./utils/Base64";
import consts from "./const";
import queryString from "query-string";

// work with api goes here

export function getRepositories(token, page, limit) {
  const params = queryString.stringify({
    access_token: token,
    page: page,
    per_page: limit
  });
  return fetch(`https://api.github.com/user/repos?${params}`, {
    method: 'GET',
    headers: consts.BASE_HEADER
  }).then((list) => {
    return list.json()
  })
    .catch((error) => {
      console.log(error);
    });
}


export function getReadMe(token, username, repository) {
  const params = queryString.stringify({
    access_token: token,
  });
  return fetch(`https://api.github.com/repos/${username}/${repository}/readme?${params}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.v3.full+json',
      'Content-Type': 'application/json',
    }
  }).then((readMe) => {
    return readMe.json()
  })
    .catch((error) => {
      console.log(error);
    });
}


export function getAccessToken(username, password) {
  const baseString = Base64.btoa(`${username}:${password}`).replace('\n', '\\n');
  return fetch(`https://api.github.com/authorizations/clients/${consts.CLIENT_ID}`, {
    method: 'PUT',
    headers: {
      ...consts.BASE_HEADER,
      "Authorization": `Basic ${baseString}`
    },
    body: JSON.stringify({
      client_secret: consts.CLIENT_SECRET,
    })
  }).then((user) => {
    return user.json()
  })
    .catch((error) => {
      console.log(error);
    });
}