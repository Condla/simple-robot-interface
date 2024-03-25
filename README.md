# Simple Robot Interface
A super simple interface to "program" a Raspberry Pi Zero powered stupid instruction following robot. This is a private project with the aim to have a good mix of software and hardware to teach my niece about computer science.

## Setup

For this to work you need a robot powered by a raspberry pi. The robot interface is currently mocked, but can seemlessly be exchanged by the raspberry pi GPIO Robot interface to go forward, turn into a direction and go backward.

* Change IP in `script.js` to local IP of Raspberry Pi
* Start server ```python server.py```
* Open `index.html` in browser and drag and drop instructions into the instructions box.
* Press the robot button to send commands to robot.

## Screenshots

Interface before instructions are being given.
[Duck Duck Go](https://duckduckgo.com)
![start interface](/img/start-interface.png)

Interface with instructions drag'n'dropped to the board of instructions.
![interface](/img/interface.png)
