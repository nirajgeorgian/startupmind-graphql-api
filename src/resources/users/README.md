## Mutations and Input
```js
/*
mutation signup($input: SignupMutation!) {
  user: signup(input: $input) {
    ... on Error {
      message
    }
    ... on User {
      user
      username
    }
  }
}

{
  "input": {
    "email": "dodo@duck.com",
    "password": "dodo",
    "username": "dododuck",
    "firstname": "dodo",
    "lastname": "duck",
    "gender": "male"
  }
}
*/
```
