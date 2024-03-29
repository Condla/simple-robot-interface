# Simple Robot Interface
A super simple interface to "program" a Raspberry Pi Zero powered stupid instruction following robot. This is a private project with the aim to have a good mix of software and hardware to teach my 3 year old niece about computer science. The idea is that she'll at first use it to give the robot instructions to circumvent obstacles.

## Setup and Components

* For this to work you need a robot powered by a Raspberry Pi (Raspberry Pi Zero W is just fine). The robot interface is currently mocked, but can seemlessly be exchanged by the Raspberry Pi GPIO Robot interface to go forward, turn into a direction (left, right) and go backward.

* If you have older kids, you can use these instructions to build the robot yourself: [Robot Buggy Instructions](https://projects.raspberrypi.org/en/projects/build-a-buggy/0)

* Start serving the interface and the robot instruction follower on ```python app.py```.
* Optional: Add the command above to your Raspberry Pi's rc.local file so the application starts up automatically, once you power up the Raspberry Pi.

## Use
* Open `http://<your-raspberry-pi-ip-address>:3000/static/index.html` in browser
![start interface](/img/start-interface.png)
* Drag and drop instructions into the instructions box.
![interface](/img/interface.png)
* Press the robot button and confirm with `ok` to send commands to robot, which will start executing the programmed driving sequence immediately.
* The cat command will cause the robot to run commands that are in the board below the cat symbol.
  * You can think of the cat board as a kind of subroutine.
  * Note: Putting a cat onto the cat board will cause an infinity loop
