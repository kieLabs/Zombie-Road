import {VEHICLES,UPGRADES,STAGES,MISSIONS,upgradeCost} from './data.js';
import {ZombieRoad} from './game.js';
const $=id=>document.getElementById(id);
const fresh=()=>({money:0,vehicle:0,upgrades:{engine:0,fuel:0,tires:0,armor:0,suspension:0,boost:0},unlocked:[0],kits:0,best:0,stats:{distance:0,zombies:0,runs:0}});
let state;try{state={...fresh(),...JSON.parse(localStorage.getItem('zombieRoadSave')||'{}')};state.upgrades={...fresh().upgrades,...state.upgrades};state.stats={...fresh().stats,...state.stats};}catch{state=fresh();}
function save(){localStorage.setItem('zombieRoadSave',JSON.stringify(state));$('money').textContent=state.money.toLocaleString();}
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$(id).classList.add('active');if(id==='garage')renderGarage();}
function renderGarage(){const v=VEHICLES[state.vehicle];$('vehicleInfo').innerHTML=`<div class="car-art"><span>🚙</span></div><div><h3>${v.name}</h3><p>${v.description}</p><div class="specs">TOP SPEED ${v.speed} • POWER ${v.accel} • HULL ${v.hull} • FUEL ${v.fuel}</div><div class="switch-row"><button id="prevCar">‹ PREVIOUS</button><b>${state.vehicle+1} / ${VEHICLES.length}</b><button id="nextCar">NEXT ›</button></div></div>`;
$('prevCar').onclick=()=>selectVehicle((state.vehicle+VEHICLES.length-1)%VEHICLES.length);$('nextCar').onclick=()=>selectVehicle((state.vehicle+1)%VEHICLES.length);
if(state.vehicle&&!state.unlocked.includes(state.vehicle)){$('vehicleInfo').insertAdjacentHTML('beforeend',`<p class="locked">LOCKED • Reach ${v.unlock.toLocaleString()} m best distance and pay ¢${v.price.toLocaleString()}.</p><button id="buyCar" class="primary">UNLOCK VEHICLE</button>`);$('buyCar').onclick=()=>{if(state.best<v.unlock||state.money<v.price)return alert('Requirement not met yet.');state.money-=v.price;state.unlocked.push(state.vehicle);save();renderGarage();};}
$('upgradeList').innerHTML=UPGRADES.map(u=>{let level=state.upgrades[u.id],cost=upgradeCost(u.base,level);return `<div class="upgrade"><div><b>${u.name}</b><small>${u.desc}</small><small>LEVEL ${level}/${u.max}</small></div><button data-up="${u.id}" ${level>=u.max?'disabled':''}>${level>=u.max?'MAX':`UPGRADE ¢${cost}`}</button></div>`}).join('');
$('upgradeList').querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{let u=UPGRADES.find(x=>x.id===b.dataset.up),lv=state.upgrades[u.id],cost=upgradeCost(u.base,lv);if(lv<u.max&&state.money>=cost){state.money-=cost;state.upgrades[u.id]++;save();renderGarage();}else alert('Not enough credits.');});}
function selectVehicle(i){state.vehicle=i;if(!state.unlocked.includes(i)){}renderGarage();}
const game=new ZombieRoad($('game'),state,updateHUD,endRun);
function updateHUD(d){$('distance').textContent=d.distance+' m';$('speed').textContent=d.speed+' km/h';$('fuelText').textContent=Math.ceil(d.fuel)+'%';$('fuelBar').style.width=d.fuel+'%';$('hullText').textContent=Math.ceil(d.hull)+'%';$('hullBar').style.width=d.hull+'%';$('runMoney').textContent=d.cash;}
function start(){if(!state.unlocked.includes(state.vehicle)){alert('Unlock this vehicle in the garage first.');show('garage');return;}show('gameScreen');$('pauseOverlay').classList.remove('show');$('resultOverlay').classList.remove('show');game.start();}
function endRun(r){save();$('resultTitle').textContent=r.fuel<=0?'OUT OF FUEL':'VEHICLE DISABLED';$('resultStats').innerHTML=`<div class="stat-grid"><span>DISTANCE<b>${r.distance} m</b></span><span>BEST<b>${state.best} m</b></span><span>ZOMBIES<b>${r.kills}</b></span><span>COMBAT REWARD<b>¢${r.cash}</b></span><span>DISTANCE BONUS<b>¢${r.distanceReward}</b></span><span>TOTAL EARNED<b>¢${r.total}</b></span></div>`;$('resultOverlay').classList.add('show');}
$('playBtn').onclick=start;$('garageBtn').onclick=()=>show('garage');$('retryBtn').onclick=start;$('pauseBtn').onclick=()=>{game.running=false;$('pauseOverlay').classList.add('show');};$('resumeBtn').onclick=()=>{$('pauseOverlay').classList.remove('show');game.running=true;game.last=0;requestAnimationFrame(t=>game.loop(t));};$('restartBtn').onclick=start;
document.querySelectorAll('[data-screen]').forEach(b=>b.addEventListener('click',()=>{game.stop();$('pauseOverlay').classList.remove('show');$('resultOverlay').classList.remove('show');show(b.dataset.screen);}));
const bind=(id,key)=>{let el=$(id);el.addEventListener('pointerdown',e=>{e.preventDefault();game[key]=true;el.setPointerCapture(e.pointerId);});['pointerup','pointercancel','lostpointercapture'].forEach(ev=>el.addEventListener(ev,()=>game[key]=false));};
bind('accelerateBtn','accelHeld');bind('brakeBtn','brakeHeld');bind('boostBtn','boostHeld');
window.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Space','Escape'].includes(e.code))e.preventDefault();if(e.code==='Escape'&&game.running)$('pauseBtn').click();game.keys[e.code]=true;});
window.addEventListener('keyup',e=>game.keys[e.code]=false);
window.addEventListener('blur',()=>{game.keys={};game.accelHeld=game.brakeHeld=game.boostHeld=false;});
window.addEventListener('resize',()=>{if(game.running)game.resize();});
save();
