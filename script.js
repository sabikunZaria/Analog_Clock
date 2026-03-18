const svg = document.getElementById('clock');
 const hourHand = document.getElementById('hour-hand');

for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * 2 * Math.PI - Math.PI / 2;
    const isMajor = i % 5 === 0;
    const r1 = isMajor ? 72 : 80;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 100 + r1 * Math.cos(angle));
    line.setAttribute('y1', 100 + r1 * Math.sin(angle));
    line.setAttribute('x2', 100 + 88 * Math.cos(angle));
    line.setAttribute('y2', 100 + 88 * Math.sin(angle));
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', isMajor ? '2' : '1');
    svg.insertBefore(line, hourHand);
}

const pad = n => n.toString().padStart(2, '0');

function getDateString(now) {               
    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}



function updateClock() {
            const now = new Date();
            const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();   
            const h12 = h% 12 || 12;
            const ampm = h<12 ? 'AM' : 'PM';



            const secAngle = (s/60)*360;
            const minAngle = (m/60)*360 + (s/60)*6;
            const hourAngle = ((h%12)/12)*360 + (m/60)*30;

            document.getElementById('second-hand').setAttribute('transform', `rotate(${secAngle} 100 100)`);
            document.getElementById('minute-hand').setAttribute('transform', `rotate(${minAngle} 100 100)`);
            document.getElementById('hour-hand').setAttribute('transform', `rotate(${hourAngle} 100 100)`); 
            
            const pad = n => n.toString().padStart(2, '0');
            document.getElementById('digital-clock').textContent = `${pad(h12)}:${pad(m)}:${pad(s)} ${ampm}`;
            document.getElementById('date-display').textContent   = getDateString(now);  

        }

        setInterval(updateClock, 1000);
        updateClock(); 