import mlflow
import mlflow.sklearn
import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error

# Load features
data = pd.read_csv('data/features.csv')
X = data.iloc[:, :-1]
y = data.iloc[:, -1]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

with mlflow.start_run():
    params = {'n_estimators': 100, 'max_depth': 5, 'learning_rate': 0.1}
    model = XGBRegressor(**params)
    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    mse = mean_squared_error(y_test, preds)
    mlflow.log_params(params)
    mlflow.log_metric('mse', mse)
    mlflow.sklearn.log_model(model, 'model')
    print(f'Model logged to MLflow with MSE: {mse:.4f}') 