//Get params
const params = new URLSearchParams(window.location.search);

//DOM
const userDiv = document.querySelector('#divUsuarios');
const sendForm = document.querySelector('#sendForm');
const txtMessage = document.querySelector('#txtMessage');
const divChatbox = document.querySelector('#divChatbox');
const divChatboxJQ = $('#divChatbox')

//Render users functions
function renderUsers(people) {
  let html = `
  <li>
    <a href="javascript:void(0)" class="active">
      Chat Room: <span> ${params.get('room')}</span></a
    >
  </li>
  `;
  people.forEach((person) => {
    html =
      html +
      `
    <li>
      <a data-id="${person.id}" href="javascript:void(0)"
        ><img
          src="assets/images/users/1.jpg"
          alt="user-img"
          class="img-circle"
        />
        <span
          >${person.name}
          <small class="text-success">online</small></span
        ></a
      >
    </li>
    `;
  });

  userDiv.innerHTML = html;
}

let html = '';
function renderMessage(message, me) {
  const date = new Date(message.date)
  let adminClass = 'info'
  if(message.name === 'Admin') adminClass = 'danger'
  if(me) {
    html =
      html +
      `
    <li class="reverse">
      <div class="chat-content">
        <h5>${message.name}</h5>
        <div class="box bg-light-inverse">
          ${message.message}
        </div>
      </div>
      <div class="chat-img">
        <img src="assets/images/users/5.jpg" alt="user" />
      </div>
      <div class="chat-time">${date.getHours()}:${date.getMinutes()}</div>
    </li>
    `;
  } else {
    html =
      html +
      `
    <li class="animated fadeIn">
      <div class="chat-img">
        ${message.name !== 'Admin' ? '<img src="assets/images/users/1.jpg" alt="user" />' : ''}
      </div>
      <div class="chat-content">
        <h5>${message.name}</h5>
        <div class="box bg-light-${adminClass}"">
          ${message.message}
        </div>
      </div>
      <div class="chat-time">${date.getHours()}:${date.getMinutes()}</div>
    </li>
    `;
  }


  divChatbox.innerHTML = html;
}

function scrollBottom() {

  // selectors
  var newMessage = divChatboxJQ.children('li:last-child');

  // heights
  var clientHeight = divChatboxJQ.prop('clientHeight');
  var scrollTop = divChatboxJQ.prop('scrollTop');
  var scrollHeight = divChatboxJQ.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    divChatboxJQ.scrollTop(scrollHeight);
  }
}

//Listeners

// $('#divUsuarios').on('click', 'a', function() {
//   let id = $(this).data('id')
//   if(id) {
//     console.log(id)
//   }
// })

userDiv.addEventListener('click', function (e) {
  let target;
  if (e.target.matches('img')) {
    target = e.path[1];
  } else if (e.target.matches('span')) {
    target = e.path[1];
  } else if (e.target.matches('small')) {
    target = e.path[2];
  } else {
    target = e.target;
  }

  if (!target.dataset.id) return;
  console.log(target.dataset.id);
});

sendForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!txtMessage.value) return;
  socket.emit(
    'sendMessage',
    {
      name: params.get('name'),
      room: params.get('room'),
      message: txtMessage.value,
    },
    (resp) => {
      if (resp) {
        this.reset();
        renderMessage(resp, true);
        scrollBottom()
      }
    }
  );
});
