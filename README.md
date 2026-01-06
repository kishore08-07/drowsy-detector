# Drowsy Detector

A web-based application to detect drowsiness using real-time video and machine learning models.

## Technologies Used
- **Node.js** (server-side)
- **Express.js** (web server)
- **WebSocket** (real-time communication)
- **HTML/CSS/JavaScript** (frontend)
- **Teachable Machine Image Library** (client-side ML, uses TensorFlow.js internally)

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the server:**
   ```bash
   node server.js
   ```
3. **Open your browser:**
   Go to `http://localhost:3000` (or the port specified in your server.js)

## Project Structure
- `server.js` - Node.js/Express server
- `public/` - Frontend static files
   - `index.html` - Main web page
   - `script.js` - Client-side logic
   - `my_model/` - Teachable Machine model files (metadata.json, model.json, weights.bin)

---
## Drowsy Detection Model
This project uses a custom model trained and tested with [Teachable Machine](https://teachablemachine.withgoogle.com/) for drowsy detection.

---

**This project is under development.**

