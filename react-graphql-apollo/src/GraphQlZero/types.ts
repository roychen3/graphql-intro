export interface User {
  id: string
  name: string
  username: string
  email: string
  phone: string
  website: string
}

export interface Post {
  id: string;
  title: string;
  body: string;
  user: User
}

export interface Posts {
  posts: {
    data: Post[]
  }
}
