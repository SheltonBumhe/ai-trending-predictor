import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
import os

# Dummy training data
data = pd.DataFrame({
    'feature1': [1, 2, 3, 4, 5],
    'feature2': [5, 4, 3, 2, 1],
    'target': [10, 20, 30, 40, 50]
})

X = data[['feature1', 'feature2']]
y = data['target']

model = LinearRegression()
model.fit(X, y)

os.makedirs('../models', exist_ok=True)
joblib.dump(model, '../models/trend_model.pkl')
print("Model trained and saved to models/trend_model.pkl")

