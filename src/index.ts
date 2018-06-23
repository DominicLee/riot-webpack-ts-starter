import riot from 'riot';
import './views/welcome.tag.html';
import './main.less';

riot.mount('welcome', {
    title: 'I want to behave!',
    items: [
        { title: 'Avoid excessive caffeine', done: true },
        { title: 'Hidden item',  hidden: true },
        { title: 'Be less provocative'  },
        { title: 'Be nice to people' }
    ]
});
