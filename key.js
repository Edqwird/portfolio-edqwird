var soon = document.querySelector('.soon');
var soon_two = document.querySelector('.soon-two');
var text = document.getElementById('soon-text');

text.addEventListener('mouseover', function(event) {
    soon.style.transform = 'translateY(-25px)';
    soon_two.style.transform = 'translateY(-10px)';
})

text.addEventListener('mouseout', function(event) {
    soon.style.transform = 'translateY(0px)';
    soon_two.style.transform = 'translateY(0px)';
})




const sections = document.querySelectorAll('.title, .title_two, .title_three, .title_four, .title_fife');
const navLinks = document.querySelectorAll('#fm a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('start'));

      const activeLink = document.querySelector(`#fm a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('start');
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));
function textType(text, elementId, speed = 100) {
    const element = document.getElementById(elementId);
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    element.textContent = '';
    type();
}
textType('Привет, я Эдгар', 'star_text', 100);


function show(name) {
  const sections = {
    front: document.querySelector('.front'),
    back: document.querySelector('.back'),
    tools: document.querySelector('.tools')
  };

  const buttons = {
    front: document.getElementById('one-bottons'),
    back: document.getElementById('two-bottons'),
    tools: document.getElementById('three-bottons')
  };

  Object.keys(sections).forEach(k => {
    const el = sections[k];
    if (!el) return;
    el.style.display = (k === name) ? 'flex' : 'none';
  });

  Object.keys(buttons).forEach(k => {
    const btn = buttons[k];
    if (!btn) return;
    if (k === name) {
      btn.style.background = '#252525';
      btn.style.color = 'aliceblue';
    } else {
      btn.style.background = '#bdbdbd';
      btn.style.color = '#252525';
    }
  });
}

document.getElementById('one-bottons').addEventListener('click', () => show('front'));
document.getElementById('two-bottons').addEventListener('click', () => show('back'));
document.getElementById('three-bottons').addEventListener('click', () => show('tools'));

// старт
show('front');

var names = document.querySelector('.name');
var email = document.querySelector('.email');
var tg = document.querySelector('.tg');
var messages = document.querySelector('.message');
let isSending = false;

const button = document.getElementById('button-message');
const secty = document.querySelectorAll('.name, .email, .tg, .message');

button.addEventListener('click', () => {
  if (isSending) return;

  if (names.value === '' || email.value === '' || tg.value === '' || messages.value === '') {
    if (names.value.trim() === '') {
      names.classList.add('error');
      document.querySelector('.name-text').classList.add('show-before');
      names.addEventListener('focus', () => {
        names.classList.remove('error');
        document.querySelector('.name-text').classList.remove('show-before');
      });
    }

    if (email.value.trim() === '') {
      email.classList.add('error');
      document.querySelector('.email-text').classList.add('show-before');
      email.addEventListener('focus', () => {
        email.classList.remove('error');
        document.querySelector('.email-text').classList.remove('show-before');
      });
    }

    if (tg.value.trim() === '') {
      tg.classList.add('error');
      document.querySelector('.tg-text').classList.add('show-before');
      tg.addEventListener('focus', () => {
        tg.classList.remove('error');
        document.querySelector('.tg-text').classList.remove('show-before');
      });
    }

    if (messages.value.trim() === '') {
      messages.classList.add('error');
      document.querySelector('.message-text').classList.add('show-before');
      messages.addEventListener('focus', () => {
        messages.classList.remove('error');
        document.querySelector('.message-text').classList.remove('show-before');
      });
    }

    return;
  }
  isSending = true;
  button.disabled = true;
  button.classList.add('clicked');
  secty.forEach(sect => sect.disabled = true);

    
  const token = '8208042909:AAFgDYa-1pOHNWeedNDuuVwD7gEXV33ZXDo';
  const chatId = '943182514';
  
  
  const text =
    'Новое сообщение:\n\n' +
    'Имя: ' + names.value + '\n\n' +
    'Email: ' + email.value + '\n\n' +
    'Telegram/Вк: ' + tg.value + '\n\n' +
    'Сообщение: ' + messages.value;

  button.disabled = true;

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  })
});