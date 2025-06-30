import shap
import pandas as pd
import joblib

# Load model and data
model = joblib.load('../models/xgboost_model.pkl')
data = pd.read_csv('data/features.csv')
X = data.iloc[:, :-1]

explainer = shap.Explainer(model)
shap_values = explainer(X)

shap.summary_plot(shap_values, X) 