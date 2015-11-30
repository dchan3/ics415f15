Router.route('/', function() {
  this.render('home');
});

Router.route('/about-us', function() {
  this.render('about');
});

Router.route('/powered-by', function() {
    this.render('powered');
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
  return Subbed.find({userid: id}, {sort: {channelname: 1}});
});

Template.registerHelper("messages", function() {
    if (Session.get('selected') != '' && Session.get('selected') !== undefined) {
      return Session.get('selected').substring(0,1) == "#" ?
          Messages.find({channelname: Session.get('selected')}) :
          Messages.find({$or: [{userid: Meteor.userId(), channelname: Session.get('selected')}, {userid: Meteor.users.findOne({username: Session.get('selected').substring(1)})._id, channelname: "@" + Meteor.user().username}]}, {sort: {timestamp: 1}});
    }
    return undefined;
});

Template.chatroom.events({
  'click #addChannel': function(e) {
    if ($('#channame').css('display') != "none") {
      if ($('#channame').val() != "") {
          var str = $('#channame').val();
          if (str.substring(0, 1) == "#")
          {
            var name = $('#channame').val().substring(1);
            if (Subbed.findOne({userid: Meteor.userId(), channelname: name}) === undefined) {
              Subbed.insert({userid: Meteor.userId(), channelname: name});
            }
          }
          else if ($('#channame').val().substring(0, 1) == "@") {
              var name = $('#channame').val().substring(1);
              if (Meteor.users.findOne({username: name}) === undefined) {
                  $('.actualerror').text("User not found.");
                  $('.error').show();
              }
              else if (name == Meteor.user().username) {
                  $('.actualerror').text("You can't add yourself, you narcissist.");
                  $('.error').show();
              }
              else if (Contacts.findOne({meId: Meteor.userId(), uId: Meteor.users.findOne({username: name})._id}) !== undefined)
              {
                  $('.actualerror').text("You've already added this user. Make some new friends!");
                  $('.error').show();
              }
              else {
                  var daUsr = Meteor.users.findOne({username: name})._id;
                  Contacts.insert({meId: Meteor.userId(), uId: daUsr});
                  Contacts.insert({meId: daUsr, uId: Meteor.userId()});
                  $('.error').hide();
              }
          }
          else {
              $('.actualerror').text("Enter a string beginning with '#' or '@'.");
              $('.error').show();
          }
      }
    }
    $('.channels').toggle(100);
    $('#channame').toggle(100);
    $('#channame').val("");
  },
  'click .channel': function(e) {
    $('.channel').removeClass('selected');
    $('.user').removeClass('selected');
    var name = "";
    if ($(e.target).is('h5')) {
      $(e.target).parent('.channel').addClass('selected');
      name = $(e.target).innerHTML;
    }
    else if ($(e.target).is('.channel')) {
      $(e.target).addClass('selected');
      name = $(e.target).children()[0].innerHTML;
    }
    Session.set('selected', name);
    $('.enter').removeAttr('disabled');
  },
  'click .user': function(e) {
        $('.channel').removeClass('selected');
        $('.user').removeClass('selected');
        var name = "";
        if ($(e.target).is('h5')) {
            $(e.target).parent('.user').addClass('selected');
            name = $(e.target).innerHTML;
        }
        else if ($(e.target).is('.user')) {
            $(e.target).addClass('selected');
            name = $(e.target).children()[0].innerHTML;
        }
        Session.set('selected', name);
        $('.enter').removeAttr('disabled');
    },
  'click .glyphicon-remove': function(e) {
      if ($(e.target).is('.glyphicon-remove')) {
          var tag = $(e.target).parent().children()[0].innerHTML.substring(0, 1);
          console.log(tag);
          var name = $(e.target).parent().children()[0].innerHTML.substring(1);
          console.log(name);
          var id;
          if ($(e.target).parent().hasClass('selected')) {
              Session.set('selected', '');
              $('.enter').attr('disabled', 'disabled');
          }
          if (tag == "#") {
              id = Subbed.findOne({userid: Meteor.userId(), channelname: name})._id;
              Subbed.remove({_id: id});
          }
          else if (tag == "@") {
              var usrId = Meteor.users.findOne({username: name})._id;
              id = Contacts.findOne({meId: Meteor.userId(), uId: usrId});
              var idT = Contacts.findOne({meId: usrId, uId: Meteor.userId()});
              Contacts.remove({_id: id});
              Contacts.remove({_id: idT});
          }
      }
  },
  'keypress .enter': function(e) {
      if (e.which == 13 && !e.shiftKey) {
          Messages.insert({userid: Meteor.userId(), text: $('.enter').val(), timestamp: Date.now(), channelname: Session.get('selected')});
          $('.enter').val("");
      }
      else if (e.which == 13 && e.shiftKey) {
          $('.enter').val($('.enter').val() + '\n');
      }
  }
});

Template.registerHelper("id", function(){
  return Meteor.userId();
});

Template.registerHelper("dateread", function(date){
    return new Date(date).toUTCString();
});

Template.registerHelper("contacts", function() {
    return Contacts.find({meId: Meteor.userId()});
});

Meteor.subscribe("users");
Meteor.subscribe("subbed");
Meteor.subscribe("messages");
Meteor.subscribe("contacts");