
const { openFullscreenWindow, openMessageBox } = require('display');
const { setTimeout, setInterval } = require('datetime');
const console = require('console');
const http = require('http');
const gl = require('opengl');
const fs = require('fs');

let renderData = {};
let rotation = 0.0;

function enableOpenGL({ glEnable, glMatrixMode, glLoadIdentity, gluPerspective }) {
    glEnable(gl.GL_DEPTH_TEST);
    glMatrixMode(gl.GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(45.0, 16.0 / 9.0, 0.1, 100.0);
}

function bootstrap(onRender) {
    setTimeout(() => {
        http.get('www.williamsamtaylor.co.uk', '/shapes', 3010, res => {
            renderData = JSON.parse(res);
        });
    }, 1000);

    openFullscreenWindow(window => {
        window.setTitle('OpenGL Example');
        window.show();
        window.enableOpenGL();

        enableOpenGL(gl);

        window.onFrame(() => {
            if(Object.keys(renderData).length > 0) {
                onRender(gl);
            }

            window.swapBuffers();
        });
    });
}

function renderObject(gl, object, type) {
    const { x, y, z } = object.translate;

    gl.glMatrixMode(gl.GL_MODELVIEW);
    gl.glLoadIdentity();
    gl.glTranslatef(x, y, z);
    gl.glRotatef(rotation, 1.0, 1.0, 0.0);
    gl.glBegin(type);

    object.faces.forEach((face, index) => {
        const { r, g, b } = object.colours[index]; 
        gl.glColor3f(r, g, b);
        face.vertices.forEach(({ x, y, z }) => {
            gl.glVertex3f(x, y, z);
        });
    });

    gl.glEnd();
}

bootstrap(gl => {
    gl.glClear(gl.GL_COLOR_BUFFER_BIT | gl.GL_DEPTH_BUFFER_BIT);
    gl.glClearColor(0.0, 0.0, 0.0, 0.0);

    renderObject(gl, renderData.pyramid, gl.GL_TRIANGLES);
    renderObject(gl, renderData.cube, gl.GL_QUADS);

    rotation += renderData.speed;
});