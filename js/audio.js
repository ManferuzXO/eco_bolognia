/* ══ AUDIO modelo ══ */
const audioInstances = {};
function toggleAudio(id, btn) {
  const a = window.ANIMALES?.[id];
  if (!a?.audio) return;
  if (audioInstances[id] && !audioInstances[id].paused) { stopAnimalAudio(id); resetAudioBtn(btn); return; }
  Object.keys(audioInstances).forEach(k => { if (k!==id) stopAnimalAudio(k); });
  audioInstances[id] = new Audio(a.audio);
  audioInstances[id].play().catch(()=>{});
  btn.classList.add('playing');
  btn.innerHTML = '<svg viewBox="0 0 10 10" fill="currentColor" style="width:7px;height:7px"><rect x="0" y="0" width="3" height="10"/><rect x="6" y="0" width="3" height="10"/></svg> Pausar';
  audioInstances[id].onended = () => resetAudioBtn(btn);
}
function stopAnimalAudio(id) {
  if (audioInstances[id]) { audioInstances[id].pause(); audioInstances[id].currentTime=0; delete audioInstances[id]; const b=document.getElementById('audio-'+id); if(b) resetAudioBtn(b); }
}
function resetAudioBtn(btn) {
  btn.classList.remove('playing');
  btn.innerHTML = '<svg viewBox="0 0 10 10" fill="currentColor" style="width:7px;height:7px"><polygon points="0,0 10,5 0,10"/></svg> Escuchar';
}

/* ══ AUDIO tarjetas fauna ══ */
const cardAudioInstances = {};
function toggleCardAudio(id, btn) {
  const a = window.ANIMALES?.[id];
  if (!a?.audio) return;
  if (cardAudioInstances[id] && !cardAudioInstances[id].paused) {
    cardAudioInstances[id].pause(); delete cardAudioInstances[id];
    btn.classList.remove('playing');
    btn.innerHTML = '<svg viewBox="0 0 10 10" fill="currentColor" style="width:9px;height:9px"><polygon points="0,0 10,5 0,10"/></svg> Escuchar canto';
    return;
  }
  Object.keys(cardAudioInstances).forEach(k => { cardAudioInstances[k].pause(); delete cardAudioInstances[k]; });
  cardAudioInstances[id] = new Audio(a.audio);
  cardAudioInstances[id].play().catch(()=>{});
  btn.classList.add('playing');
  btn.innerHTML = '<svg viewBox="0 0 10 10" fill="currentColor" style="width:9px;height:9px"><rect x="0" y="0" width="3" height="10"/><rect x="6" y="0" width="3" height="10"/></svg> Pausar';
  cardAudioInstances[id].onended = () => {
    btn.classList.remove('playing');
    btn.innerHTML = '<svg viewBox="0 0 10 10" fill="currentColor" style="width:9px;height:9px"><polygon points="0,0 10,5 0,10"/></svg> Escuchar canto';
  };
}