from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel
import joblib
import numpy as np
import secrets
import os

app = FastAPI()
security = HTTPBasic()

USERNAME = "user"  # Change this
PASSWORD = "pass"  # Change this

class PredictRequest(BaseModel):
    features: list

def authenticate(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, USERNAME)
    correct_password = secrets.compare_digest(credentials.password, PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )

@app.post('/predict')
def predict(
    req: PredictRequest,
    credentials: HTTPBasicCredentials = Depends(authenticate),
    model: str = Query('trend', enum=['trend', 'budget'])
):
    model_path = f'../models/xgboost_model_{model}.pkl'
    if not os.path.exists(model_path):
        raise HTTPException(status_code=404, detail=f"Model for '{model}' not found.")
    loaded_model = joblib.load(model_path)
    X = np.array(req.features).reshape(1, -1)
    pred = loaded_model.predict(X)[0]
    return {'prediction': float(pred), 'model': model} 