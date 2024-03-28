from flask import Flask, request, jsonify
from flask_cors import CORS
from time import sleep
from robotdummy import Robot

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
robot = Robot(left = (7,8), right = (9,10))

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
        sleep(3)
        robot.stop()
      elif instruction == "backward":
        robot.backward()
        sleep(3)
        robot.stop()
      elif instruction == "turn right":
        robot.turn_right()
        sleep(3)
        robot.stop()
      elif instruction == "turn left":
        robot.turn_left()
        sleep(3)
        robot.stop()
      elif instruction == "cat":
        execute(sub_routine_board_instructions, sub_routine_board_instructions)

if __name__ == '__main__':
    app.run(debug=True, port=3000, host="0.0.0.0")