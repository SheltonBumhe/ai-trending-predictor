import joblib
import numpy as np
import os

model_path = '../models/trend_model.pkl'
if not os.path.exists(model_path):
    print("Model not found. Please train it first.")
    exit()

model = joblib.load(model_path)

X_new = np.array([[6, 0], [7, -1]])

predictions = model.predict(X_new)
print("Predictions:", predictions)

