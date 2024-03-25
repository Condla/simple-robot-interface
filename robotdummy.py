class Robot:

  def __init__(self, left, right):
    self.left = left
    self.right = right

  def forward(self):
    print("going forward")


  def turn_right(self):
    print("turning right")


  def turn_left(self):
    print ("turning left")


  def backward(self):
    print("going backward")


  def stop(self):
    print("stopping")
