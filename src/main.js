"use strict";

// css
import "./styles/global.css";
import "./styles/form.css";
import "./styles/schedule.css";

// DOM selectors
const hours = document.querySelectorAll('.hour');
const form = document.querySelector('.form');
const dateInput = document.getElementById('date');
const clientInput = document.getElementById('client');
const periodMorning = document.getElementById('period-morning');
const periodAfternoon = document.getElementById('period-afternoon');
const periodNight = document.getElementById('period-night');

let selectedHourEl = null;

function createScheduleElement(schedule) {
  const li = document.createElement('li');
  li.dataset.id = schedule.id;

  const strong = document.createElement('strong');
  strong.textContent = schedule.hour;
  li.appendChild(strong);

  const span = document.createElement('span');
  span.textContent = schedule.client;
  li.appendChild(span);

  const img = document.createElement('img');
  img.src = './src/assets/cancel.svg';
  img.alt = 'Cancelar';
  img.classList.add('cancel-icon');
  li.appendChild(img);

  img.addEventListener('click', async () => {
    await fetch(`http://localhost:3333/schedules/${schedule.id}`, { method: 'DELETE' });
    li.remove();
  });

  return li;
}

function appendSchedule(schedule) {
  const element = createScheduleElement(schedule);
  if (schedule.period === 'morning') {
    periodMorning.appendChild(element);
  } else if (schedule.period === 'afternoon') {
    periodAfternoon.appendChild(element);
  } else {
    periodNight.appendChild(element);
  }
}

async function loadSchedules() {
  const res = await fetch('http://localhost:3333/schedules');
  const schedules = await res.json();
  periodMorning.innerHTML = '';
  periodAfternoon.innerHTML = '';
  periodNight.innerHTML = '';
  schedules.forEach(appendSchedule);
}

document.addEventListener('DOMContentLoaded', loadSchedules);

hours.forEach((hourEl) => {
  if (!hourEl.classList.contains('hour-unavailable')) {
    hourEl.addEventListener('click', () => {
      if (selectedHourEl) {
        selectedHourEl.classList.remove('hour-selected');
      }
      hourEl.classList.add('hour-selected');
      selectedHourEl = hourEl;
    });
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!selectedHourEl) return;

  const schedule = {
    date: dateInput.value,
    hour: selectedHourEl.getAttribute('value'),
    client: clientInput.value,
    period: selectedHourEl.dataset.period,
  };

  const res = await fetch('http://localhost:3333/schedules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(schedule),
  });

  const saved = await res.json();
  appendSchedule(saved);

  form.reset();
  selectedHourEl.classList.remove('hour-selected');
  selectedHourEl = null;
});

