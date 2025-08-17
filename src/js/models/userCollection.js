define(['ojs/ojmodel', 'models/userModel'], function (oj, UserModel) {
  const UserCollection = oj.Collection.extend({
    model: new UserModel,
    url: 'http://localhost:3000/users'
  });

  return new UserCollection();
});
