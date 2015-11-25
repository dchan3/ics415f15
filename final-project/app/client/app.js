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

Template.registerHelper("subbed", function(id) {
  return Subbed.find({userid: id});
});

Template.chatroom.events({
  'click #addChannel': function(e) {
    if ($('#channame').css('display') != "none") {
      if ($('#channame').val() != "") {
        var name = $('#channame').val();
        console.log(name);
        Subbed.insert({userid: Meteor.userId(), channelname: name});
      }
    }
    $('.channels').toggle(100);
    $('#channame').toggle(100);
  }
});

Template.registerHelper("id", function(){
  return Meteor.userId();
});

Meteor.subscribe("users");
Meteor.subscribe("subbed");
