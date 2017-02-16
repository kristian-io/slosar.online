$( document ).ready(function() {

    sendBatch(0);
    // typing();
});


var step = 0;
var typingSpeed = 2000;


var flow     = [
  {
    msgs: ['Hello.', 'Thanks for visiting me!', 'I am very humbled by your visit!!!'],
    option: 'Who are you???',
  },
  {
    msgs: ['My name is Kristian Slosar, I am 24 years old and live in Bratislava, Slovakia.', 'Europe,', 'Earth,', 'Milky Way' ],
    option: 'What do you do?',
  },
  {
    msgs: ['I like to program, currently learning full stack javascript, appart from that I work in IT.', 'I dream a lot about tech and the future!'],
    option: 'What do you like?',
  },
  {
    msgs: ['I like to read, mostly non fiction, I am a big user of medium.com and Pocket.', 'Books as well!', ' I am interested in everything related to AI. Like, what the future with AI will look like?', ' Will it be good, bad? Who knows...' ],
    option: 'I want to get in touch with the REAL you!'
  },
  {
    msgs: ['All right human, it was fun chatting with you!', 'Here you go' ],
    option: undefined
  }
];



// var options   = [];

function scrollToBottom() {
  var winH = $(window).height();
  var docH = $(document).height();

  if (docH > winH) {
    console.log(' should scroll');
    // chatContainer.scrollTop(scrollHeight);
    $(window).scrollTop($(document).height() + 70);
  }
}


// creazy functions that send sequentialy messages and "waits" typingSpeed seconds between each.
function sendBatch(batch, i = 0) {
  sendMsg(flow[batch].msgs[i]);
  if (flow[batch].msgs[i+1]) {
    setTimeout(function () {
      sendMsg(flow[batch].msgs[i+1]);
      if (flow[batch].msgs[i+2]) {
        setTimeout(function () {
          sendBatch(batch, i+2)  //call itself
        }, typingSpeed)
      } else {
        setTimeout(function () {
          if (flow[batch].option) {
              displayOption(flow[batch].option);
          } else {
            contactOptions();
          }
        }, typingSpeed + 200);
        return 'done';
      }
    }, typingSpeed + 200);
  } else {
    setTimeout(function () {
      if (flow[batch].option) {
          displayOption(flow[batch].option);
      } else {
        contactOptions();
      }
    }, typingSpeed + 200);
    return 'done';
  }
}

function sendMsg(msg) {
    typing();
    setTimeout(messageFromMe, typingSpeed, msg, step);
}


function typing() {
  html1 = $('<div class="row align-items-top chat-line"></div>');
  html2 = $('<div class="col-1 pic-space"><img class="my-pic" src="./img/me.jpg" alt="Profile photo"></div>');
  html3 = $('<div class="col-10"></div>');
  html4 = $('<span class="bubble"></span>')

  htmldot1 = $('<span id="dot1">&nbsp;&nbsp;&nbsp;&#8226</span>');
  htmldot2 = $('<span id="dot2">&nbsp;&#8226&nbsp;</span>');
  htmldot3 = $('<span id="dot3">&#8226&nbsp;&nbsp;&nbsp;</span>');

  html4.hide();

  chatContainer = $(document.getElementsByClassName('chat-container'));
  chatContainer.append(html1);
  html1.append(html2);
  html2.after(html3);
  html3.append(html4)
  html4.append(htmldot1)
  html4.append(htmldot2)
  html4.append(htmldot3)
  html4.fadeIn(1000);
  // $(html4).addClass('zoomIn');


  scrollToBottom()
  // scrollToBottom()
  setTimeout(function() {
    html1.remove();
  }, typingSpeed);

}


// render message from us
function messageFromMe(msg) {
  html1 = $('<div class="row align-items-top chat-line"></div>');
  html2 = $('<div class="col-1 pic-space"><img class="my-pic" src="./img/me.jpg" alt="Profile photo"></div>');
  html3 = $(`<div class="col-10"><span class="bubble">${msg}</span></div>`);
  html3.hide();
  // html2.hide();


  chatContainer = $(document.getElementsByClassName('chat-container'));
  // console.log(chatContainer);
  chatContainer.append(html1);
  html1.append(html2);
  html2.after(html3);
  $(html3).fadeIn(1000);
  // $(html3).addClass('zoomIn');
  scrollToBottom()
  // sleep(1000);

  // another messageFromMe or displayOption


}

// give visitor option to "choose" and proceed
function displayOption(option) {
  html1 = $('<div class="option"></div>');
  html2 = $(`<a class="clickkable" href="#"><span class="bubble bubble-option">${option}</span></a>`)

  chatContainer = $(document.getElementsByClassName('chat-container'));
  chatContainer.after(html1);
  html1.append(html2);
  scrollToBottom()
  $(html2).on('click touchstart',  function(event) {
    event.preventDefault();
    console.log('clicked!!!');
    $(html1).fadeOut(1000)
    setOption(option);
  });

  // on click remove html1 and setOption
}

// set the option; display it as part of the conversation/input
function setOption(option) {
    html1 = $('<div class="row align-items-center chat-line"></div>');
    html2 = $('<div class="col-3"></div>');
    html3 = $(`<div class="col-9"><span class="bubble right-bubble">${option}</span></div>`);

    html3.hide();
    chatContainer = $(document.getElementsByClassName('chat-container'));
    chatContainer.append(html1);
    html1.append(html2);
    html2.after(html3);
    html3.fadeIn(1000);
    // console.log(step);
    setTimeout(function () {
      step++;
      sendBatch(step);
    })
  }

  //continue with messageFromMe based on logic....




function contactOptions() {
  html1 = $('<div class="chat-line d-flex justify-content-center"></div>');
  html2 = $('<div class="col-xs"></div>');
  html3 = $('<div class="col-xs"></div>');
  html4 = $('<div class="bubble d-flex justify-content-around"></div>');
  html5 = $('<div class="col-xs">  <a target="_blank" href="http://linkedin.com/in/kristian-slosar"><img class="social-logo "src="./img/linkedin.png" alt="linkedin"></a>  </div>  <div class="col-xs"><a target="_blank" href="https://twitter.com/kristian_io"><img class="social-logo" src="./img/twitter.png" alt="twitter"></a>  </div>  <div class="col-xs"><a target="_blank" href="https://github.com/kristian-io"><img class="social-logo" src="./img/github.png" alt="github"></a>  </div>');
  html6 = $('<div class="col-xs"></div>');

  chatContainer = $(document.getElementsByClassName('chat-container'));
  chatContainer.append(html1);
  html1.append(html2);
  html2.append(html3);
  html3.append(html4);
  html4.append(html5);
  html3.append(html6);
  scrollToBottom()

}





// $( window ).on( "load", function() {
//     main();
// });
