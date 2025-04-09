document.addEventListener("DOMContentLoaded", () => {
  // Fechas objetivo para los dos contadores
  const firstTargetDate = new Date("2025-04-28T10:00:00")
  const secondTargetDate = new Date("2025-05-02T10:00:00")

  // Elementos DOM
  const daysEl = document.getElementById("days")
  const hoursEl = document.getElementById("hours")
  const minutesEl = document.getElementById("minutes")
  const secondsEl = document.getElementById("seconds")
  const countdownEl = document.querySelector(".countdown")
  const countdownMessageEl = document.querySelector(".countdown-message")
  const eventStartEl = document.getElementById("event-start")
  const secondCountdownEl = document.getElementById("second-countdown")
  const countdownTitleEl = document.getElementById("countdown-title")
  const finalMessageEl = document.getElementById("final-message")

  // Variable para rastrear qué contador está activo
  let isFirstCountdown = true

  // Función para actualizar el contador
  function updateCountdown() {
    const now = new Date()
    const targetDate = isFirstCountdown ? firstTargetDate : secondTargetDate
    const difference = targetDate - now

    // Verificar si la fecha objetivo ya ha pasado
    if (difference <= 0) {
      if (isFirstCountdown) {
        // Cambiar al segundo contador
        isFirstCountdown = false
        countdownTitleEl.textContent = "Ronda Distrital"
        countdownMessageEl.textContent = "Faltan para la Ronda Regional"
        eventStartEl.style.display = "block"
        secondCountdownEl.style.display = "block"

        // Ocultar temporalmente el mensaje de evento iniciado después de 5 segundos
        setTimeout(() => {
          eventStartEl.style.display = "none"
        }, 5000)

        return updateCountdown() // Actualizar inmediatamente para mostrar el segundo contador
      } else {
        // Ambos contadores han terminado
        countdownEl.style.display = "none"
        countdownMessageEl.style.display = "none"
        eventStartEl.style.display = "none"
        secondCountdownEl.style.display = "none"
        finalMessageEl.style.display = "block"
        return
      }
    }

    // Calcular días, horas, minutos y segundos
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    // Actualizar el DOM con los valores
    daysEl.textContent = days.toString().padStart(2, "0")
    hoursEl.textContent = hours.toString().padStart(2, "0")
    minutesEl.textContent = minutes.toString().padStart(2, "0")
    secondsEl.textContent = seconds.toString().padStart(2, "0")

    // Añadir efectos de animación cuando cambian los valores
    if (seconds === 0) {
      secondsEl.classList.add("pulse-animation")
      setTimeout(() => secondsEl.classList.remove("pulse-animation"), 1000)
    }

    // Cambiar colores basados en el tiempo restante
    updateColors(days, isFirstCountdown)
  }

  // Función para actualizar colores basados en días restantes
  function updateColors(days, isFirst) {
    const countdownValues = document.querySelectorAll(".countdown-value")
    let color

    if (isFirst) {
      // Colores para el primer contador
      if (days > 5) {
        color = "var(--color-science)" // Verde - cuando faltan más de 5 días
      } else if (days > 3) {
        color = "var(--color-technology)" // Azul - cuando faltan entre 3 y 5 días
      } else if (days > 1) {
        color = "var(--color-engineering)" // Rojo - cuando faltan entre 1 y 3 días
      } else {
        color = "var(--color-arts)" // Amarillo - cuando falta 1 día o menos
      }
    } else {
      // Colores para el segundo contador
      if (days > 2) {
        color = "var(--color-math)" // Morado - cuando faltan más de 2 días
      } else if (days > 1) {
        color = "var(--color-technology)" // Azul - cuando faltan entre 1 y 2 días
      } else {
        color = "var(--color-engineering)" // Rojo - cuando falta 1 día o menos
      }
    }

    countdownValues.forEach((value) => {
      value.style.textShadow = `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`
    })
  }

  // Iniciar la actualización del contador cada segundo
  updateCountdown()
  setInterval(updateCountdown, 1000)

  // Crear efecto de partículas en el fondo
  function createParticles() {
    const particles = document.createElement("div")
    particles.className = "particles"
    document.querySelector(".hero-section").appendChild(particles)

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.position = "absolute"
      particle.style.width = `${Math.random() * 5 + 1}px`
      particle.style.height = particle.style.width
      particle.style.background = getRandomColor()
      particle.style.borderRadius = "50%"
      particle.style.opacity = Math.random() * 0.5 + 0.2
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animation = `float ${Math.random() * 5 + 3}s linear infinite`
      particle.style.animationDelay = `${Math.random() * 5}s`
      particles.appendChild(particle)
    }
  }

  function getRandomColor() {
    const colors = [
      "var(--color-science)",
      "var(--color-technology)",
      "var(--color-engineering)",
      "var(--color-arts)",
      "var(--color-math)",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Iniciar partículas
  createParticles()
})
