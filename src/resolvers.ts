const me = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "johndoe@example.com",
  firstName: "John",
  lastName: "Doe",
};

export const resolvers = {
  Query: {
    me: () => me,
  },
};
