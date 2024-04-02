from flask import Flask, request, jsonify
from time import sleep
from gpiozero import Robot
#from robotdummy import Robot

app = Flask(__name__)
robot = Robot(left = (7,8), right = (10, 9))

@app.route('/execute', methods=['POST'])
def execute():
    main_board_instructions = request.json.get('mainBoardInstructions')
    sub_routine_board_instructions = request.json.get('subRoutineBoardInstructions')
    print('Received main board instructions:', main_board_instructions)
    print('Received sub routine board instructions:', sub_routine_board_instructions)
    execute(main_board_instructions, sub_routine_board_instructions)
    return jsonify({'message': 'Instructions executed successfully'}), 200

def execute(main_board_instructions, sub_routine_board_instructions=[]):
    for instruction in main_board_instructions:
      if instruction == "forward":
        robot.forward()
        sleep(1)
        robot.stop()
      elif instruction == "backward":
        robot.backward()
        sleep(1)
        robot.stop()
      elif instruction == "turn right":
        robot.right()
        sleep(0.5)
        robot.stop()
      elif instruction == "turn left":
        robot.left()
        sleep(0.5)
        robot.stop()
      elif instruction == "cat":
        execute(sub_routine_board_instructions, sub_routine_board_instructions)

if __name__ == '__main__':
    app.run(debug=False, port=3000, host="0.0.0.0")
