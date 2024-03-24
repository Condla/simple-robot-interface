document.addEventListener('DOMContentLoaded', function() {
  const instructions = document.querySelectorAll('.instruction');
  const mainboard = document.getElementById('mainboard');
  const subroutineboard = document.getElementById('subroutineboard');
  const clearButton = document.getElementById('clear');
  const executeButton = document.getElementById('execute');

  instructions.forEach(instruction => {
    instruction.addEventListener('dragstart', dragStart);
  });

  mainboard.addEventListener('dragover', dragOver);
  mainboard.addEventListener('drop', drop);
  //mainboard.addEventListener('dragleave', dragLeave);
  subroutineboard.addEventListener('dragover', dragOver);
  subroutineboard.addEventListener('drop', drop);
  //subroutineboard.addEventListener('dragleave', dragLeave);
  clearButton.addEventListener('click', clearCommands);
  executeButton.addEventListener('click', executeCommands);
});

function dragStart(event) {
  // Set the data to the HTML content of the dragged element
  event.dataTransfer.setData('text/html', event.target.innerHTML);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  // Get the HTML content from the dragged element
  const data = event.dataTransfer.getData('text/html');
  console.log(event);
  console.log(data);
  const instruction = document.createElement('div');
  // Set the innerHTML of the new element to the HTML content retrieved from the dragged element
  instruction.innerHTML = data;
  // Add necessary classes and attributes to the new element
  instruction.classList.add('instruction');
  console.log(event.target.id);
  if (event.target.id === 'mainboard') {
    instruction.classList.add('main-board-instruction');
  }
  if (event.target.id === 'subroutineboard') {
    instruction.classList.add('sub-routine-board-instruction');
  }
  //instruction.setAttribute('draggable', 'true');
  // Append the new element to the board
  if (event.target.id === 'mainboard' || event.target.id === 'subroutineboard'){
    event.target.appendChild(instruction);
  }
}

function dragLeave(event) {
  if (event.target === document.getElementById('mainboard')) {
    console.log(event);
    console.log(event.relatedTarget);
    console.log(document.getElementById('complete-board'));
    console.log("bla");
    console.log(event.dataTransfer);
    const data = event.dataTransfer.getData('text/html');
    console.log(data);
    console.log(event.target.classList);
    if (event.relatedTarget === document.getElementById('complete-board')) {
      const draggedInstruction = document.querySelector('.instruction');
      draggedInstruction.remove();
    }
  }
}

function clearCommands() {
  const mainboard = document.getElementById('mainboard');
  mainboard.innerHTML = ''; // Remove all child elements from the board
  const subroutineboard = document.getElementById('subroutineboard');
  subroutineboard.innerHTML = ''; // Remove all child elements from the board
}

function evaluate_board(instructionsHtml) {
  var instructions = []
  for (instructionHtml of instructionsHtml) {
    if (instructionHtml.includes("up")){
      instructions.push("forward");
    }
    else if (instructionHtml.includes("down")){
      instructions.push("backward");
    }	
    else if (instructionHtml.includes("right")){
      instructions.push("turn right");
    }	
    else if (instructionHtml.includes("left")){
      instructions.push("turn left");
    }	
    else if (instructionHtml.includes("cat")){
      instructions.push("cat");
    }	
  }
  return instructions;
}


function executeCommands() {
  //alert('Executing commands...');
  alert('Starte Roboter?');
  const mainBoardInstructionsHtml = Array.from(document.querySelectorAll('.main-board-instruction')).map(instruction => instruction.innerHTML);
  var mainBoardInstructions = evaluate_board(mainBoardInstructionsHtml);
  const subRoutineBoardInstructionsHtml = Array.from(document.querySelectorAll('.sub-routine-board-instruction')).map(instruction => instruction.innerHTML);
  var subRoutineBoardInstructions = evaluate_board(subRoutineBoardInstructionsHtml);
  const requestBody = JSON.stringify({ mainBoardInstructions, subRoutineBoardInstructions});
  console.log(requestBody);

  //fetch('http://192.168.0.32:5000/execute', {
  fetch('http://127.0.0.1:3000/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: requestBody
  })
  .then(response => {
    if (response.ok) {
      console.log('Instructions executed successfully');
      alert('Roboter ist fertig');
      // Optionally handle success response
    } else {
      console.error('Failed to execute instructions');
      // Optionally handle error response
      alert('Instruktionen konnten nicht durchgefuehrt werden!');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Netzwerk Fehler. Beep. Boop. Beeeeeeep!');
    // Handle network errors
  });

}

