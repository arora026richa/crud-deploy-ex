define([
  'knockout',
  'models/userCollection',
  'ojs/ojarraydataprovider',
  'ojs/ojtable', 'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojbutton'
], function (ko, userCollection, ArrayDataProvider) {
  function ViewModel() {
    const self = this;

    self.users = userCollection;

    self.id = ko.observable('');
    self.name = ko.observable('');
    self.email = ko.observable('');

    self.dataProvider = ko.observable();

    self.loadUsers = function () {
      self.users.fetch({
        success: function () {
      self.dataProvider(new ArrayDataProvider(
  self.users.map(function (model) {
    return model.attributes;
  }), { keyAttributes: 'id' }
));
        },
        error: function () {
          alert('Failed to load users.');
        }
      });
    };

    self.addUser = function () {
        const existingUser = self.users.get(self.id());
  
  if (existingUser) {
    alert('User with this ID already exists!');
    return;
  }
     self.users.create({
  id: self.id(),
  name: self.name(),
  email: self.email()
}, {
  wait: true,
  success: function () {
    self.loadUsers();
    alert('User added');
  },
  error: function () {
    alert('Failed to add user');
  }
});
    };

    self.updateUser = function () {
      const user = self.users.get(self.id());
      if (user) {
        user.save({
          name: self.name(),
          email: self.email()
        }, {
          patch: true,
          success: function () {
            self.loadUsers();
            alert('User updated');
          },
          error: function () {
            alert('Update failed');
          }
        });
      }
    };

    self.deleteUser = function () {
      const user = self.users.get(self.id());
      if (user) {
        user.destroy({
          success: function () {
            self.loadUsers();
            alert('User deleted');
          },
          error: function () {
            alert('Delete failed');
          }
        });
      }
    };

    self.loadUsers();
  }

  return new ViewModel();
});
