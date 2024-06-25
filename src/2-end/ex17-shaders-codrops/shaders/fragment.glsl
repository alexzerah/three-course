// Imports
#pragma glslify: snoise3 = require('glsl-noise/simplex/3d')

uniform vec2 u_mouse;
uniform vec2 u_res;
uniform sampler2D u_image;
uniform sampler2D u_imagehover;
uniform float u_time;

varying vec2 v_uv;

float circle(in vec2 _st, in float _radius, in float blurriness){
    vec2 dist = _st;
    return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
}

void main() {
    // We manage the device ratio by passing PR constant
    vec2 res = u_res * PR;
    vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
    // tip: use the following formula to keep the good ratio of your coordinates
    st.y *= u_res.y / u_res.x;

    // We readjust the mouse coordinates
    vec2 mouse = u_mouse * -0.5;

    vec2 circlePos = st + mouse;
    float c = circle(circlePos, 0.06, 2.) * 2.5;
    float offx = v_uv.x + sin(v_uv.y + u_time * .1);
    float offy = v_uv.y - u_time * 0.1 - cos(u_time * .001) * .01;

    float n = snoise3(vec3(offx, offy, u_time * .1) * 8.) - 1.;

    vec4 image = texture2D(u_image, v_uv);
    vec4 hover = texture2D(u_imagehover, v_uv);

    float finalMask = smoothstep(0.4, 0.5, n + pow(c, 2.));
    vec4 finalImage = mix(image, hover, finalMask);

    gl_FragColor = finalImage;
}