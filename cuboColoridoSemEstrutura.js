//2) Implementar o exemplo visto em sala do cubo colorido sem a estrutura de dados utilizando a primitiva TRIANGLES.

"use strict";

var gl;
var vertices;
var colors;
var indices;

init();

function init()
{
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) {
        alert("WebGL não está disponível");
        return;
    }

    //Definindo os vértices do cubo
    vertices = [
        vec3(-0.5, -0.5, 0.5), 
        vec3(-0.5, 0.5, 0.5), 
        vec3(0.5, 0.5, 0.5), 
        vec3(0.5, -0.5, 0.5), 
        vec3(-0.5, -0.5,-0.5), 
        vec3(-0.5, 0.5, -0.5), 
        vec3(0.5, 0.5, -0.5), 
        vec3(0.5, -0.5, -0.5)
    ];

    //Definindo as cores do cubo
    colors = [
        vec4(0.0, 1.0, 1.0, 1.0),  // ciano
        vec4(1.0, 1.0, 1.0, 1.0),  // branco
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
        vec4(0.0, 0.0, 0.0, 1.0),  // preto
        vec4(0.0, 1.0, 0.0, 1.0), // verde
        vec4(1.0, 1.0, 0.0, 1.0),  // amarelo
        vec4(1.0, 0.0, 0.0, 1.0), // vermelho
        vec4(0.0, 0.0, 1.0, 1.0) // azul
    ]

    // inicialização
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    
    //buffers dos vertices
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW)
    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    

    //buffers para as cores
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    indices = [
        0,3,2,
        0,2,1,
        4,7,3,
        4,3,0,
        3,7,6,
        3,6,2,
        6,7,4,
        6,4,5,
        1,2,6,
        1,6,5,
        5,4,0,
        5,0,1
    ]

    //buffers que ira guardar os indices dos triangles
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
    

    render();
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE,0);

    
}