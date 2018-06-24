import riot from 'riot';
import riotFramework from 'riot-framework';
import './views/welcome.tag.html';
import './main.less';
import * as uuid from 'uuid';

let mountedWelcome: any = riot.mount('welcome', {
    title: 'I want to behave!',
    items: ['asdasd']
})[0];

riotFramework.initialise();
let welcomeController = riotFramework.createController(mountedWelcome);
welcomeController.changeProperty({title: 'Hello world'});
welcomeController.changeProperty({items: ['Well', 'here', 'we', 'are']});
welcomeController.registerFunction(<FunctionConfig>{
    key: 'helloworld',
    callback: (_thing:string) => {
        console.log(_thing);
    }
});
welcomeController['helloworld']('whasssup');
riotFramework.initialiseDatabase(<IFirebaseConfig>{
    apiKey: 'AIzaSyAqVI5xIo_PzZ6aEhz0AWYSWseKKLWB2cw',
    authDomain: "rad-riotstarter.firebaseapp.com",
    databaseURL: 'https://rad-riotstarter.firebaseio.com/'
});
riotFramework.postToDatabase(<IUserScore>{
    UserId: uuid.v4(),
    FirstName: 'Dom',
    LastName: 'Lee',
    Score: Math.round(Math.random()*100),
    TimeStamp: new Date().toUTCString()
});

interface FunctionConfig {
    key: string
    callback: Function
}

interface IFirebaseConfig {
    apiKey: string
    authDomain?: string
    databaseURL?: string
}

interface IUserScore {
    UserId: string
    FirstName: string
    LastName: string
    Score: number
    TimeStamp: any
}