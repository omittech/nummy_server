var CronJob = require('cron').CronJob;
var user =require('../controllers/user');

// var job = new CronJob('* * * * * *', function(){

// 	console.log('You will see this per sec');
// },null, true, "America/Los_Angeles");

var job = new CronJob({
  cronTime: '* * * * * *',
  onTick: function() {
   user.cleanupToken;
   console.log('You will see this per sec');
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();