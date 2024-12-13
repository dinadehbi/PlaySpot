
document.querySelector('.gradient-border-button').addEventListener('click', () => {
    window.location.href = 'login.html'; // Remplacez 'login.html' par le chemin de votre fichier.
});



// ---- ---- Const ---- ---- //
let inputBox = document.querySelector('.input-box'),
  searchIcon = document.querySelector('.search'),
  closeIcon = document.querySelector('.close-icon');

// ---- ---- Open Input ---- ---- //
searchIcon.addEventListener('click', () => {
  inputBox.classList.add('open');
});
// ---- ---- Close Input ---- ---- //
closeIcon.addEventListener('click', () => {
  inputBox.classList.remove('open');
});








class Firework {
    constructor(ctx, canvasWidth, canvasHeight) {
      this.ctx = ctx;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.reset();
    }
  
    reset() {
      // Launch point
      this.x = Math.random() * this.canvasWidth;
      this.y = this.canvasHeight;
  
      // Vibrant, random color
      this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
  
      // Randomized launch trajectory
      this.dx = (Math.random() - 0.5) * 3;
      this.dy = -(Math.random() * 10 + 10);
  
      this.exploded = false;
      this.particles = [];
      this.age = 0;
    }
  
    launch() {
      this.x += this.dx;
      this.y += this.dy;
  
      // Draw launch trail
      this.ctx.beginPath();
      this.ctx.moveTo(this.x - this.dx, this.y - this.dy);
      this.ctx.lineTo(this.x, this.y);
      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
  
      // Check for explosion
      if (this.y <= this.canvasHeight * Math.random() * 0.5) {
        this.explode();
      }
    }
  
    explode() {
      const particleCount = Math.floor(Math.random() * 50 + 50);
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
  
        this.particles.push({
          x: this.x,
          y: this.y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          alpha: 1,
          color: this.color,
          trail: [{ x: this.x, y: this.y }],
          maxTrailLength: 10
        });
      }
      this.exploded = true;
    }
  
    updateParticles() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const particle = this.particles[i];
  
        // Mouvement de particule
        particle.x += particle.dx;
        particle.y += particle.dy;
  
        // Ajouter le point actuel à la traînée
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > particle.maxTrailLength) {
          particle.trail.shift();
        }
  
        // Gravité et friction
        particle.dy += 0.15;
        particle.dx *= 0.99;
  
        // Dessiner la traînée
        if (particle.trail.length > 1) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          for (let j = 1; j < particle.trail.length; j++) {
            this.ctx.lineTo(particle.trail[j].x, particle.trail[j].y);
          }
          this.ctx.strokeStyle = `rgba(${this.getRGB(particle.color)}, ${
            particle.alpha
          })`;
          this.ctx.lineWidth = particle.size / 2;
          this.ctx.stroke();
        }
  
        // Dessiner la particule
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${this.getRGB(particle.color)}, ${
          particle.alpha
        })`;
        this.ctx.fill();
  
        // Diminution de l'alpha
        particle.alpha -= 0.01;
  
        if (
          particle.alpha <= 0 ||
          particle.x < 0 ||
          particle.x > this.canvasWidth ||
          particle.y > this.canvasHeight
        ) {
          this.particles.splice(i, 1);
        }
      }
    }
  
    update() {
      this.age++;
  
      if (!this.exploded) {
        this.launch();
      } else {
        this.updateParticles();
      }
  
      // Reset if all particles are gone
      if (this.exploded && this.particles.length === 0) {
        this.reset();
      }
    }
  
    // Fonction utilitaire pour convertir HSL en RGB
    getRGB(hslColor) {
      const match = hslColor.match(/hsl\((\d+\.?\d*),\s*(\d+)%,\s*(\d+)%\)/);
      if (match) {
        const [_, h, s, l] = match;
        const rgb = this.hslToRgb(parseFloat(h), parseInt(s), parseInt(l));
        return rgb.join(",");
      }
      return "255,255,255"; // Couleur par défaut si la conversion échoue
    }
  
    hslToRgb(h, s, l) {
      s /= 100;
      l /= 100;
      const k = (n) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [
        Math.round(255 * f(0)),
        Math.round(255 * f(8)),
        Math.round(255 * f(4))
      ];
    }
  }
  



  
  var lname = document.getElementById("l-name");
  var lemail = document.getElementById("l-email");
  var lsub = document.getElementById("l-sub");
  var ltarea = document.getElementById("l-tarea")

  var textname = document.getElementById("name");  // I Really don't why 'name' is not working
  var email = document.getElementById("email");
  var subject = document.getElementById("subject");
  var message = document.getElementById("message");



  function labelmove(inputname)
  {
      if(inputname == "name")
      {
          lname.style.transition = "all 0.2s";
          lname.style.marginTop = "-15px";
          lname.style.marginLeft = "10px";
          lname.style.zIndex = "10";
          lname.style.transform = "scale(0.9)";
          lname.style.padding = "5px 15px 5px 15px";
          lname.style.backgroundColor = "#000000";
      }

      if(inputname == "email")
      {
          lemail.style.transition = "all 0.2s";
          lemail.style.marginTop = "-15px";
          lemail.style.marginLeft = "10px";
          lemail.style.zIndex = "10";
          lemail.style.transform = "scale(0.9)";
          lemail.style.padding = "5px 15px 5px 15px";
          lemail.style.backgroundColor = "#000000";
      }

      if(inputname == "subject")
      {
          lsub.style.transition = "all 0.2s";
          lsub.style.marginTop = "-15px";
          lsub.style.marginLeft = "10px";
          lsub.style.zIndex = "10";
          lsub.style.transform = "scale(0.9)";
          lsub.style.padding = "5px 15px 5px 15px";
          lsub.style.backgroundColor = "#000000";
      }

      if(inputname == "message")
      {
          ltarea.style.transition = "all 0.2s";
          ltarea.style.marginTop = "-15px";
          ltarea.style.marginLeft = "10px";
          ltarea.style.zIndex = "10";
          ltarea.style.transform = "scale(0.9)";
          ltarea.style.padding = "5px 15px 5px 15px";
          ltarea.style.backgroundColor = "#000000";
      }
  }

  window.onclick = function(event)
  {
      if (event.target != textname &&  textname.value.length == 0)
      {
          lname.style.transform = "scale(1)";
          lname.style.transition = "all 0.2s";
          lname.style.marginTop = "17px";
          lname.style.marginLeft = "20px";
          lname.style.zIndex = "0";
          lname.style.padding = "0px";
          lname.style.backgroundColor = "transparent";
      }
      if (event.target != email && email.value.length == 0)
      {
          lemail.style.transform = "scale(1)";
          lemail.style.transition = "all 0.2s";
          lemail.style.marginTop = "17px";
          lemail.style.marginLeft = "20px";
          lemail.style.zIndex = "0";
          lemail.style.padding = "0px";
          lemail.style.backgroundColor = "transparent";
      }
      if(event.target != subject && subject.value.length == 0)
      {
          lsub.style.transform = "scale(1)";
          lsub.style.transition = "all 0.2s";
          lsub.style.marginTop = "17px";
          lsub.style.marginLeft = "20px";
          lsub.style.zIndex = "0";
          lsub.style.padding = "0px";
          lsub.style.backgroundColor = "transparent";
      }
      if(event.target != message && message.value.length == 0)
      {
          ltarea.style.transform = "scale(1)";
          ltarea.style.transition = "all 0.2s";
          ltarea.style.marginTop = "17px";
          ltarea.style.marginLeft = "20px";
          ltarea.style.zIndex = "0";
          ltarea.style.padding = "0px";
          ltarea.style.backgroundColor = "transparent";
      }
  }



