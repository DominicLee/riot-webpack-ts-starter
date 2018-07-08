/// <reference path="../@types/typings.d.ts" />

import * as uuid from 'uuid';
import riot from 'riot';
import {RiotFramework} from 'riot-framework';

import './views/welcome.tag.html';
import './main.less';

let mountedWelcome: any = riot.mount('welcome', {
  title: 'I want to behave!',
  items: ['asdasd']
})[0];

RiotFramework.initialiseFirebase(<IFirebaseConfig>{
  apiKey: 'AIzaSyAqVI5xIo_PzZ6aEhz0AWYSWseKKLWB2cw',
  authDomain: "rad-riotstarter.firebaseapp.com",
  databaseURL: 'https://rad-riotstarter.firebaseio.com/'
});

let welcomeController = RiotFramework.createController(mountedWelcome);
welcomeController.changeProperty({title: 'Hello world'});
welcomeController.changeProperty({items: ['Well', 'here', 'we', 'are']});
welcomeController.registerFunction(<IFunctionConfig>{
  key: 'helloworld',
  callback: (_thing: string) => {
    console.log(_thing);
  }
});

welcomeController['helloworld']('whasssup');

RiotFramework.initialiseComms(<ICommsConfig>{
  apiUrl: 'http://localhost:9000'
});

RiotFramework.postToDatabase(<IUserScore>{
  UserId: uuid.v4(),
  FirstName: 'Dom',
  LastName: 'Lee',
  Score: Math.round(Math.random() * 100),
  TimeStamp: new Date().toUTCString()
});

/*
new Communications().sendToServer(<IUserScore>{
  UserId: uuid.v4(),
  FirstName: 'Dom',
  LastName: 'Lee',
  Score: Math.round(Math.random() * 100),
  TimeStamp: new Date().toUTCString()
});*/
