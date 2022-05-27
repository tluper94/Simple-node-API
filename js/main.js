document.querySelector('#clickMe').addEventListener('click', makeReq);
const error = document.querySelector('#error');

async function makeReq() {
  const playInput = document.querySelector('#userName');
  const play = playInput.value.toLowerCase();
  console.log(play);
  if (play === 'rock' || play === 'paper' || play === 'scissor') {
    error.textContent = '';
    const res = await fetch(`/api?play=${play}`);
    const data = await res.json();

    console.log(data);
    document.querySelector('#player').textContent =
      'You: ' + play.toUpperCase();
    document.querySelector('#computer').textContent =
      'Computer: ' + data.computer.toUpperCase();
    document.querySelector('#result').textContent =
      'Result: ' + data.result.toUpperCase();
  } else {
    error.textContent = 'Invalid Play';
    playInput.setAttribute('style', 'border: solid 1px red');
  }
}
