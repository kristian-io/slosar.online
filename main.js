$( document ).ready(function() {

    //we are starting at 0 and then it goes recursivelly till the end.
    sendBatch(0);
    // typing();
});

//initialize vars and flow array
var step = 0;
var typingSpeed = 1500;
var transitionSpeed = 800;

var flow     = [
  {
    msgs: ['Hello.', 'Thanks for visiting me!', 'I am very bumbled by your visit!!!', '*humbled'],
    option: 'Hi. Who are you???',
  },
  {
    msgs: ['My name is Kristian Slosar, I am 24 years old, currently living in Bratislava, Slovakia,', 'Europe,', 'Earth,', ' &#x2661 Milky Way!' ],
    option: 'What do you do? ',
  },
  {
    msgs: ['I enjoy coding/ developing, currently learning full stack javascript, apart from that I work in IT.', 'I think and dream a lot about tech, culture and the future!'],
    option: "That's cool. What do you like to do?",
  },
  {
    msgs: ['I like to read, a lot!',  'Mostly non fiction, blogs, essays, opinions, especially on hacker news, medium.com and Pocket.', 'Anything from personal development, science, software, tech, business... ','Books as well!'],
    option: 'what books?'
  },
  {
    msgs: ['Recently read...', 'Essentialism by Greg McKeown', 'The Power of Habit by Charles Duhigg', 'The Obstacle is the Way from Ryan Holiday'],
    option: 'Ahaa, other interest?'
  },
  {
    msgs: ['I am interested in everything related to Artificial Intelligence.', 'Like, how will technological singularity come about and what exactly will happen after?', ' Are we going to be ready for it, culturally and politically?' ],
    option: 'Hmmmm...'
  },
  {
    msgs: ['Would you like to get in touch?'],
    option: 'Maybe...'
  },
  {
    msgs: ['All right, it was nice chatting with you!', 'Contact me on Linkedin, Twitter, or check out my GitHub profile.', 'Gotta go!' ],
    option: undefined
  }
];





function scrollToBottom() {
  var winH = $(window).height();
  var docH = $(document).height();

  if (docH > winH) {
    // console.log(' should scroll');
    // chatContainer.scrollTop(scrollHeight);

    $(window).scrollTop($(document).height() + 70);


  }
}


// creazy function that sends sequentialy messages and "waits" typingSpeed seconds between each.
function sendBatch(batch, i = 0) {
  //sends the first message from current step
  sendMsg(flow[batch].msgs[i]);
  //if next message from current step exists, send it
  if (flow[batch].msgs[i+1]) {
    //send it after typingSpeed seconds (currently we are rendering typing animation)
    setTimeout(function () {
      sendMsg(flow[batch].msgs[i+1]);
      //if we have more to say, lets say it
      if (flow[batch].msgs[i+2]) {
        setTimeout(function () {
          sendBatch(batch, i+2)  //call itself
        }, typingSpeed)
      }
      //nothing more to say right now
      else {
        //we are still rendering that last message....
        setTimeout(function () {
          //if there is an option available (we are not in the end of conversation) - display it
          if (flow[batch].option) {
              displayOption(flow[batch].option);
          }
          //we have finished, lext show contact options
          else {
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

//&bull

  htmldot1 = $('<span id="dot1">&nbsp;&nbsp;&nbsp;&bull;</span>');
  htmldot2 = $('<span id="dot2">&nbsp;&bull;&nbsp;</span>');
  htmldot3 = $('<span id="dot3">&bull;&nbsp;&nbsp;&nbsp;</span>');


  // htmldot1 = $('<span id="dot1">&nbsp;&nbsp;&nbsp;&#8226</span>');
  // htmldot2 = $('<span id="dot2">&nbsp;&#8226&nbsp;</span>');
  // htmldot3 = $('<span id="dot3">&#8226&nbsp;&nbsp;&nbsp;</span>');

  html2.hide();
  html4.hide();

  chatContainer = $(document.getElementsByClassName('chat-container'));
  chatContainer.append(html1);
  html1.append(html2);
  html2.after(html3);
  html3.append(html4)
  html4.append(htmldot1)
  html4.append(htmldot2)
  html4.append(htmldot3)
  html4.fadeIn(transitionSpeed);
  // $(html4).addClass('zoomIn');

  scrollToBottom()

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
  html2.hide();

  chatContainer = $(document.getElementsByClassName('chat-container'));
  // console.log(chatContainer);
  chatContainer.append(html1);
  html1.append(html2);
  html2.after(html3);
  $(html3).fadeIn(transitionSpeed);
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
    // console.log('clicked!!!');
    $(html1).fadeOut(transitionSpeed)
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
    html3.fadeIn(transitionSpeed);
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
