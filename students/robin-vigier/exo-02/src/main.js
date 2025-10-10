const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;
canvas.style.width = canvas.width / 2 + 'px';
canvas.style.height = canvas.height / 2 + 'px';

const ctx = canvas.getContext("2d");