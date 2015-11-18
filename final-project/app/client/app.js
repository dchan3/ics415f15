Router.route('/', function() {
  this.render('home');
});

Router.route('/about-us', function() {
  this.render('about');
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([{
    _id: 'username',
    type: 'text',
    displayName: "Username",
    required: true,
    minLength: 8
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);

Template.registerHelper("user", function(id){
  return Meteor.users.findOne({_id: id}).username;
});

Meteor.subscribe("users");
