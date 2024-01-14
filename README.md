# blog-restapi

Running Projetct

```shell
yarn dev
```

## Application Routes

- GET `/api/user/1` list user
    requires parameter `id` of the user
- POST `/api/user` create user
  - requires `name`, `email` and `password` field
- PUT `/api/user` update user
  - requires user `id` parameter and at least one `name`, `email` and `password` field`

- POST `/api/login` login
  - requires `email` and `password` field

- GET `/api/post/1` list post
  - requires parameter `id` of the post
- POST `/api/post` create post
  - requires `title` and `content` field
- PUT `/api/post/1` update post
  - requires post `id` parameter and a `title` or `content` field

- GET `/api/comment/1` list all comment on the post
  - requires post `id` parameter
- POST `/api/commet/1` create comment on the post
  - requires post `id` parameter and `content` field
