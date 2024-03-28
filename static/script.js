document.addEventListener('DOMContentLoaded', function() {
  const instructions = document.querySelectorAll('.instruction');
  const placeholders = document.querySelectorAll('.placeholder');
  const mainboard = document.getElementById('mainboard');
  const subroutineboard = document.getElementById('subroutineboard');
  const clearButton = document.getElementById('clear');
  const executeButton = document.getElementById('execute');

  instructions.forEach(instruction => {
    instruction.addEventListener('dragstart', dragStart);
  });
  placeholders.forEach(placeholder => {
    placeholder.addEventListener('dragover', dragOver);
    placeholder.addEventListener('drop', drop);
    placeholder.addEventListener('click', remove);
  });

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
  const instruction = document.createElement('div');
  // Set the innerHTML of the new element to the HTML content retrieved from the dragged element
  instruction.innerHTML = data;
  // Add necessary classes and attributes to the new element
  instruction.classList.add('instruction');
  if (event.currentTarget.id.includes('main-placeholder')) {
    instruction.classList.add('main-board-instruction');
  }
  if (event.currentTarget.id.includes('sub-placeholder')) {
    instruction.classList.add('sub-routine-board-instruction');
  }
  instruction.setAttribute('draggable', 'true');
  instruction.addEventListener('dragstart', dragStart);
  // Append the new element to the board
  if (event.currentTarget.id.includes('placeholder')){
    event.currentTarget.innerHTML = '';
    event.currentTarget.appendChild(instruction);
  }
  
}

function remove(event) {
  event.preventDefault();
  console.log(event.currentTarget);
  event.currentTarget.innerHTML = '';
}

function clearCommands() {
  const placeholders = document.querySelectorAll('.placeholder');
  placeholders.forEach(placeholder => {
    placeholder.innerHTML = ''; // Remove all child elements from the board
  });
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

  fetch('http://192.168.0.32:5000/execute', {
  //fetch('/execute', {
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

