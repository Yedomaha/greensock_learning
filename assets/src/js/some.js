import $ from "jquery";
import some from './part_of_some.js';

$('.welcome-section__title').html('Welcome to my devpack!');

console.log(some.avg(1,4,8));
console.log(some.max(1,4,8));
console.log(some.merge({
    a: 3
}, {
    b: 5
}));