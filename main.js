'use strict';

const navlink = document.querySelectorAll('.nav > a');

navlink.forEach(link => {
    link.href === location.href ? link.classList.add('active') : link.classList.remove('active');
})

/**
 * CUT TEXT
 */
document.querySelectorAll('.cutText > a > span').forEach(link => {
    link.setAttribute('data-cuttext', link.innerText)
})