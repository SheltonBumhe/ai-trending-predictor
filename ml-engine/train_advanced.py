import pandas as pd
import sys
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error
import joblib

# Usage: python train_advanced.py [target]
target = sys.argv[1] if len(sys.argv) > 1 else 'trend'

# Load features
data = pd.read_csv('data/features.csv')
X = data.drop([target], axis=1)
y = data[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# XGBoost
model = XGBRegressor(n_estimators=100, max_depth=5, learning_rate=0.1)
model.fit(X_train, y_train)

preds = model.predict(X_test)
mse = mean_squared_error(y_test, preds)
print(f'XGBoost Test MSE for {target}: {mse:.4f}')

joblib.dump(model, f'../models/xgboost_model_{target}.pkl')
print(f'Model saved to ../models/xgboost_model_{target}.pkl')

# For LSTM, see a separate script (not all data is time series) 