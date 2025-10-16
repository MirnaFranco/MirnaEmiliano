// Coordenadas aproximadas de la ciudad de Formosa
const latitudFormosa = -26.17;
const longitudFormosa = -58.17;
const zoomInicial = 13; // Un buen nivel para una ciudad

// 1. Inicializar el mapa y centrarlo en Formosa
const mapa = L.map('mapa-formosa').setView([latitudFormosa, longitudFormosa], zoomInicial);