# Deploying the AI Trend Predictor Inference API

## 1. Build the Docker Image
```bash
cd ml-engine
docker build -t trend-predictor-api .
```

## 2. Run Locally
```bash
docker run -p 8000:8000 trend-predictor-api
```
- The API will be available at http://localhost:8000
- Authenticate with the username and password set in `inference_api.py`

## 3. Deploy to a Cloud Provider
- **Any VPS/Cloud:**
  - Copy your model and code to the server
  - Install Docker
  - Repeat steps 1 and 2
- **AWS ECS / Azure Container Apps / Google Cloud Run:**
  - Push your image to a container registry (e.g., Docker Hub)
  - Deploy using your provider's UI or CLI

## 4. Secure Your API
- Change the default username and password in `inference_api.py`
- Use HTTPS in production (with a reverse proxy like Nginx or a managed service)

## 5. Example Request
```bash
curl -u user:pass -X POST http://localhost:8000/predict -H "Content-Type: application/json" -d '{"features": [1.0, 2.0, 3.0, ...]}'
``` 