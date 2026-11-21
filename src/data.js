export const VEHICLES = [
{id:'rusty',name:'Rusty Survivor Sedan',price:0,unlock:0,speed:155,accel:88,weight:1.0,fuel:100,hull:100,grip:1.0,description:'A battered starter car. Cheap to run, but fragile.'},
{id:'desert',name:'Desert Runner',price:650,unlock:450,speed:178,accel:112,weight:.82,fuel:115,hull:115,grip:1.18,description:'Lightweight off-road handling and better traction.'},
{id:'pickup',name:'Armored Pickup',price:1400,unlock:1300,speed:145,accel:95,weight:1.35,fuel:130,hull:175,grip:1.12,description:'Reinforced body built to push through crowds.'},
{id:'interceptor',name:'Street Interceptor',price:2400,unlock:2500,speed:220,accel:145,weight:.92,fuel:105,hull:110,grip:1.04,description:'High speed, low margin for mistakes.'},
{id:'rescue',name:'Heavy Rescue Truck',price:3800,unlock:4200,speed:138,accel:105,weight:1.65,fuel:155,hull:220,grip:1.15,description:'A powerful heavy-duty rescue platform.'},
{id:'cruiser',name:'Tactical Police Cruiser',price:5200,unlock:6000,speed:190,accel:125,weight:1.12,fuel:125,hull:165,grip:1.1,description:'Balanced speed and protection.'},
{id:'bus',name:'School Transport Bus',price:6800,unlock:8200,speed:120,accel:82,weight:1.9,fuel:180,hull:260,grip:.95,description:'Slow, massive and hard to stop.'},
{id:'van',name:'Frozen Treat Van',price:8100,unlock:10500,speed:132,accel:91,weight:1.5,fuel:150,hull:195,grip:1.02,description:'An unlikely survivor with sturdy construction.'},
{id:'monster',name:'Industrial Monster Truck',price:11000,unlock:14500,speed:165,accel:132,weight:1.7,fuel:145,hull:250,grip:1.3,description:'Huge wheels conquer rough ground.'},
{id:'hauler',name:'Apocalypse Hauler',price:16000,unlock:22000,speed:175,accel:150,weight:2.0,fuel:210,hull:320,grip:1.28,description:'The ultimate long-haul escape machine.'}
];
export const UPGRADES = [
{id:'engine',name:'Engine',max:5,base:180,desc:'Acceleration and top speed'},
{id:'fuel',name:'Fuel Tank',max:5,base:150,desc:'More fuel for longer runs'},
{id:'tires',name:'All-terrain Tires',max:5,base:140,desc:'Traction and stability'},
{id:'armor',name:'Body Armor',max:5,base:190,desc:'Reduce collision damage'},
{id:'suspension',name:'Suspension',max:5,base:160,desc:'Smoother landings and hills'},
{id:'boost',name:'Nitro Booster',max:5,base:220,desc:'Unlock and improve boost'}
];
export const STAGES = ['Broken Desert','Wasteland Highway','Abandoned Town','Industrial Zone','Underground Transit','Flooded District','Frozen Outskirts','Military Checkpoint','Last Evacuation Route','Final Escape'];
export const MISSIONS = Array.from({length:50},(_,i)=>({id:i+1,stage:Math.floor(i/5)+1,name:['Long Haul','Clear the Road','Fuel Miser','Hard Landing','Supply Run'][i%5]+' '+(i+1),type:['distance','kills','fuel','jumps','money'][i%5],target:[700+i*90,5+Math.floor(i/4),65,2+Math.floor(i/10),250+i*75][i%5],reward:120+i*35}));
export function upgradeCost(base, level){ return Math.round(base*Math.pow(1.72,level)); }
export function clamp(value,min,max){return Math.max(min,Math.min(max,value));}
