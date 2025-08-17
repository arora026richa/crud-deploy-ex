define(['ojs/ojmodel'], function (oj) {
  const UserModel = oj.Model.extend({
    idAttribute: 'id',
    urlRoot: 'http://localhost:3000/users'
  });

  return UserModel;
});
